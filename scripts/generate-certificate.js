const pem = require('pem');
const mkdirp = require('mkdirp');
const { writeFile } = require('fs');
const { join } = require('path');
const { log } = require('winston');

const context = join(__dirname, '../src/server/certs');

pem.createCertificate({
    days: 365,
    selfSigned: true,
    altNames: ['localhost', 'express.local']
}, (err, keys) => {
    mkdirp.sync(context);
    writeFile(join(context, 'key.pem'), keys.serviceKey, () =>
        log('info', `Created key.pem in ${context}`)
    );
    writeFile(join(context, 'cert.pem'), keys.certificate, () => {
        log('info', `Created cert.pem in ${context}`)
    });
});
