'use strict';

var path = require('path');
var webpack = require('webpack');
var MFS = require('memory-fs');

module.exports = function setupDevServer(serverConfig, projectName, onUpdate) {
    var serverCompiler = webpack(serverConfig);
    var mfs = new MFS();
    var outputPath = path.join(serverConfig.output.path, 'server/' + projectName + '.js');

    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, function (err, stats) {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(function (err) {
            return console.error(err);
        });
        stats.warnings.forEach(function (err) {
            return console.warn(err);
        });
        onUpdate(mfs.readFileSync(outputPath, 'utf-8'));
    });
};