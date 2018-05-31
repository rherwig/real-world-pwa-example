import express from 'express';
import spdy from 'spdy';
import { readFileSync } from 'fs';
import { join } from 'path';
import { log } from 'winston';
import helmet from 'helmet';
import shrinkRay from 'shrink-ray';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configures hot reloading and assets paths for local development environment.
 * Use the `npm start` command to start the local development server.
 *
 * @param app Express app
 */
const configureDevelopment = app => {
    const clientConfig = require('../webpack/client');
    const serverConfig = require('../webpack/server');
    const publicPath = clientConfig.output.publicPath;
    const outputPath = clientConfig.output.path;

    const multiCompiler = require('webpack')([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];

    app.use(require('webpack-dev-middleware')(multiCompiler, { publicPath }));
    app.use(require('webpack-hot-middleware')(clientCompiler));

    app.use(publicPath, express.static(outputPath));

    app.use(
        require('webpack-hot-server-middleware')(multiCompiler, {
            serverRendererOptions: { outputPath }
        })
    );
};

/**
 * Configures assets paths for production environment.
 * This environment is used in deployment and inside the docker container.
 * Use the `npm run build` command to create a production build.
 *
 * @param app Express app
 */
const configureProduction = app => {
    const clientStats = require('./assets/stats.json');
    const serverRender = require('./assets/app.server.js').default;
    const publicPath = '/';
    const outputPath = join(__dirname, 'assets');

    app.use(publicPath, express.static(outputPath));
    app.use(
        serverRender({
            clientStats,
            outputPath
        })
    );
};

const getCertificate = isDevelopment => {
    const certFile = isDevelopment
        ? join(__dirname, 'server/certs/cert.pem')
        : require('./server/certs/cert.pem');

    const keyFile = isDevelopment
        ? join(__dirname, 'server/certs/key.pem')
        : require('./server/certs/key.pem');

    return {
        cert: readFileSync(certFile),
        key: readFileSync(keyFile)
    };
};

const createServer = app => {
    const { USE_SSL } = process.env;

    if (USE_SSL === 'true') {
        const { cert, key } = getCertificate(isDevelopment);
        return spdy.createServer({
            key,
            cert
        }, app);
    }

    return app;
};

const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';

app.use(helmet());
app.use(shrinkRay({
    filter: () => !isDevelopment
}));

log('info', `Configuring server for environment: ${process.env.NODE_ENV}...`);
if (isDevelopment) {
    configureDevelopment(app);
} else {
    configureProduction(app);
}

log('info', 'Spawning server...');
app.set('port', process.env.PORT || 3000);

createServer(app).listen(app.get('port'), () =>
    log('info', `Server listening on port ${app.get('port')}...`)
);
