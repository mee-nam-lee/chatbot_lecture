#!/usr/bin/env node

const async = require('async');
const co = require('co');
const fs = require('fs');
const program = require('commander');
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

const server = require('./lib/container/mcs-node-server.js');
const utils = require('./lib/utils.js');

var descriptorPath;
program
    .version(require('./package.json').version)
    .arguments('<configDescriptor>')
    .option('-v --verbose', 'Enable verbose logging')
    .action(function(file) {
        descriptorPath = file;
        var verbose = program.verbose;
        co(function *() {

            var descriptor = utils.loadDescriptor(descriptorPath, verbose);
            startContainer(descriptor);

        });
    })
    .parse(process.argv);

// .action() is not fired if no arguments (.arguments) are passed on cmd-line.
if (typeof descriptorPath === 'undefined') {
    console.error('Error: A deployment descriptor must be specified.');
}


function startContainer(descriptor) {

    if (descriptor.backend && descriptor.backend.authorization) {
        if (!descriptor.backend.authorization.anonymousKey) {
            server.start(descriptor);
        } else if (descriptor.backend.authorization.anonymousKey) {
            descriptor.params.accessToken = 'Basic ' + descriptor.backend.authorization.anonymousKey;
            // series will call a set of events in sequence
            async.series([
                function (callback) {
                    pingOracleMobileAPI(descriptor, callback);
                },
                function (callback) {
                    server.start(descriptor);
                }
            ]);
        } else {

            // TODO - handle username/password. Do this in a generic & re-usable way for all modules.

            // series will call a set of events in sequence
            async.series([
                function (callback) {
                    pingOracleMobileAPI(descriptor, callback);
                },
                function (callback) {
                    server.start(descriptor);
                }
            ]);
        }
    } else {
        console.log("Starting server: " + descriptor);
        server.start(descriptor);
    }
}

function pingOracleMobileAPI(descriptor, callback) {
    var canPing = descriptor.baseUrl && descriptor.container.oracleMobileApiName &&
                  descriptor.backend.backendId && descriptor.backend.authorization.anonymousKey;
    if (canPing) {
        console.log("Ping OracleMobileAPI to verify that OracleMobileAPI-uri and authorization are correct.");
        var pingOptionsList = {
            uri: descriptor['OracleMobileAPI-url'] + '/ping',
            headers: {
                'oracle-mobile-backend-id': descriptor.backend.backendId,
                authorization: descriptor.params.accessToken
            },
            method: 'get'
        };

        request(pingOptionsList, function (error, response, body) {
            if (error) {
                console.error(descriptor.container.oracleMobileApiName + " ping failed with error:", error);
                process.exit(1);
            } else if (response.statusCode != 200) {
                console.error(descriptor.container.oracleMobileApiName + " ping failed with unexpected response:", response.statusCode, body);
                if (descriptor.backend.authorization.anonymousKey) {
                    console.error("Some of toolsConfig.json properties responsible for connecting to MCS: (\"baseUrl\", \"backend.backendId\", \"backend.authorization.anonymousKey\") are incorrect or login is required for the OracleMobileAPI.");
                } else {
                    console.error("Either some of toolsConfig.json properties responsible for connecting to MCS: (\"baseUrl\", \"backend.backendId\") or the entered user / password pair are incorrect.");
                }
                process.exit(1);
            } else {
                console.log(descriptor.container.oracleMobileApiName + " ping succeeded!");
                callback();
            }
        });
    } else {
        if (!descriptor.baseUrl){
            console.error("Error: configuration property baseUrl required to connect to MCS is undefined");
        }
        if (!descriptor.container.oracleMobileApiName){
            console.error("Error: configuration property container.oracleMobileApiName required to connect to MCS is undefined");
        }
        if (!descriptor.authorization.mobileBackendID){
            console.error("Error: configuration property authorization.mobileBackendID required to connect to MCS is undefined");
        }
        if (descriptor.authorization.anonymousKey == false){
            console.error("Error: configuration property authorization.anonymousKey required to connect to MCS is set to false");
        }
        process.exit(1);
    }
}
