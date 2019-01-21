const _ = require('underscore');
var request;
try{
  request = require('request');
} catch (error){
    if (error.message == "Cannot find module 'request'"){
        console.error('You need to select the node configuration you are planning to use:\nwith Node version 6.10.0 (or compatible) use node configuration 6.10, with Node version or 8.9.4 (or compatible) - 8.9');
        console.error('Make sure that the selected node configuration has been installed:');
        console.error('cd node-configurations/6.10  or  cd node-configurations/8.9');
        console.error('npm install');
        console.error('Set environment variable NODE_PATH to node_modules directory of the selected node configuration:\neither `node-configurations/6.10/node_modules` or `node-configurations/8.9/node_modules`');
        process.exit(1);
    } else {
        throw error;
    }
}
const fs = require('fs');
const path = require('path');
const utils = require('../utils.js');

module.exports = {

    deployImplementation: function(descriptor, callback) {
        var tempDir = utils.makeTempDir(descriptor, descriptor.tools.deployment.tempDirectory);
        var zipDestPath = tempDir + descriptor.apiName + '_' + descriptor.apiVersion + '.zip';
        var sourcePath = descriptor.moduleLocation;
        console.log('Packaging implementation for ' + descriptor.apiName + ' v' + descriptor.apiVersion + ' from ' + sourcePath);

        utils.createArchive(descriptor, sourcePath, zipDestPath, descriptor.apiName, _.bind(function() {
            this.postImplementation(descriptor, zipDestPath, callback);
        }, this));
    },

    postImplementation: function(descriptor, zipPath, callback) {
        console.log('Deploying implementation to OMCe');

        var formContents1 = {
            file: fs.createReadStream(zipPath)
        };

        var formOptions1 = {
            url: descriptor.baseUrl + 'mobile/tools/1.0/apis/' + descriptor.apiId + '/implementations',
            method: 'POST',
            formData: formContents1,
            headers: {
                'Authorization': 'Bearer ' + descriptor.params.accessToken
            }
        };

        request.debug = descriptor.verbose;
        request(formOptions1, function (error, response, body) {
            if (error) {
                callback(error);
            } else {
                if (response.statusCode > 201) {
                    var errMsg = "Deployment failed. HTTP return code: " + response.statusCode +
                                "\nResponse: " + body;
                    callback(errMsg);
                } else {
                    console.log('Deployment completed successfully');
                    // TODO - need to dump any unresolved dependencies from the response.
                }
            }

            // clean up temp files/directories
            if (fs.existsSync(zipPath)) {
                fs.unlinkSync(zipPath);
            }
            var tempDir = zipPath.slice(0, zipPath.lastIndexOf(path.sep));
            if (fs.existsSync(tempDir)) {
                fs.rmdirSync(tempDir);
                utils.verbose(descriptor, 'Deleted temp directory ' + zipPath.slice(0, zipPath.lastIndexOf(path.sep)))
            }
            callback();
        })
    }
};
