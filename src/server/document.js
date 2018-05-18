import AppleTouchIcon from '../assets/pwa/apple-touch-icon.png';
import Favicon16 from '../assets/pwa/favicon-16x16.png';
import Favicon32 from '../assets/pwa/favicon-32x32.png';
import PinnedTab from '../assets/pwa/safari-pinned-tab.svg';

export default ({ title, appString, js, styleTags, initialState }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, maximum-scale=5.0"/>
      <meta name="description" content="The experience of a native app within your browser - with PStore."/>
      <meta name="apple-mobile-web-app-title" content="PStore"/>
      <meta name="application-name" content="PStore"/>
      <meta name="msapplication-TileColor" content="#2b5797"/>
      <meta name="theme-color" content="#2c3e50"/>
      <link rel="apple-touch-icon" sizes="180x180" href="${AppleTouchIcon}"/>
      <link rel="icon" type="image/png" sizes="32x32" href="${Favicon32}"/>
      <link rel="icon" type="image/png" sizes="16x16" href="${Favicon16}"/>
      <link rel="shortcut icon" type="image/png" href="${Favicon16}"/>
      <link rel="mask-icon" href="${PinnedTab}" color="#2c3e50"/>
      <link rel="manifest" href="/app.webmanifest"/>
      
      ${styleTags}
      ${title}
    </head>
    <body>
      <div id="react-root">${appString}</div>
      
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      ${js}
    </body>  
  </html>
`;
