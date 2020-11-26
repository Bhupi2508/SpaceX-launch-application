/**
 * require
 */
const express = require('express');
const path = require('path');
const ngApp = express();

/**
 * connected with the project
 */
ngApp.use(express.static('./dist/spacex'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/spacex/index.html'));
});

/**
 * server will listen on given or default port
 */
ngApp.listen(process.env.PORT || 8080);