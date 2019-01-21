# README
v. 18.3.1
11 June 2018
 
 
Oracle Mobile Cloud (OMC)
Custom Code Test Tools
 
OMC provides a set of custom code test tools to help you:
 
* Test and debug your custom API implementations on your local machine.
* Package and upload custom API implementations to OMC from the command line.
 
## What Are The Tools?
 
This set of tools consists of:
 
* An npm module (omce-test) that includes the command-line tools for starting a local custom code container, running tests, and deploying an API implementation to OMC.
* An API (OracleMobileAPI) to proxy OMC API calls from the node container running locally on your machine to the container running within OMC. You need to upload this API to OMC and associate it with a mobile backend that's also associated with the custom API you want to work with.
 
## Prerequisites
 
* A local installation of Node.js (either version 6.10.0, version 8.9.4, or a compatible version).
* The Developer role in an OMC instance.
* The omce-tools directory, which must be located on a path that doesn't have any spaces in it.
 
## Setting Up the Tools
 
### Installing / Upgrading omce-tools
 
1. On your machine, open a terminal window (It might be necessary to run this command as an admin user), and then change to the `omce-tools/node-configurations` directory.
2. Determine the Node configuration that you need to use for the custom API that you are testing. Use 6.10 for Node version 6.10.0 or compatible, and use 8.9 for Node version 8.9.4 or compatible. The default Node configuration for OMC is 8.9.
3. Change to the directory for the node configuration that you want to use: either `6.10` or `8.9`
4. Run `npm install`.
5. Change to the `omce-tools` directory.
6. Run `npm install -g`.
7. Set the `NODE_PATH` environment variable to the `node_modules` directory for the node configuration you want use (either `<path>/omce-tools/node-configurations/6.10/node_modules` or `<path>/omce-tools/node-configurations/8.9/node_modules`).
8. To ensure the tools are installed correctly, run `omce-test --version`
    It should return the current version.
 
### Adding OracleMobileAPI to OMC
 
1. From the Development page in the OMC UI, click **APIs**, then click **New API**, and select **API**.
2. Click **Upload a RAML document**, navigate to the `OracleMobileAPI/OracleMobileAPI.raml` file on your system, and click **Open**.
3. Type a short description for the API and click **Create**.
4. Click the **Security** tab and switch **Login Required** to the off position.
5. Click **Save**.
6. Click **Implementations** and upload `OracleMobileAPI/OracleMobileAPIImpl.zip` from your system.
 
## Testing an API Implementation
 
### Setting up Your API for Testing
 
1. If you haven't already done so, create your custom API in OMC and add endpoints and sample request/response data.
2. Download the custom API's JavaScript scaffold. (Open the API, click the **Implementation** tab, and click **JavaScript Scaffold**.)
3. Unzip the scaffold and check its contents.
   This directory should contain:
   * `package.json` - the module manifest
   * `<api name>.js` - your starter implementation
   * `<api name>.raml` - the API definition in RAML format
   * `swagger.json` - the API definition in Swagger format
   * `toolsConfig.json` -  contains metadata needed by the tools, such as mobile backend environment and authorization info, the API, and OMC endpoint and test definitions
   * `samples.txt`
   * `ReadMe.md` - the readme for the implementation.
4. In OMC, associate the APIs with a backend. From the Development page, click **Backends**, select the backend that you want to use, click **Open**, click the **APIs** tab, and click **Select APIs**.
3. Click **+** (Select API) for OracleMobileAPI to associate it with the backend. Then click **+** (Select API) for the custom API that you want to test.
 
### Setting Up the API Implementation for Testing
 
1. In a terminal window, change directories to the directory that contains your implementation (scaffold).
2. Run `npm install`.
3. Update the API implementation's `toolsConfig.json` file to include your OMC instance, backend, and authorization info.
    * `baseUrl` is the base URL of your OMC instance. This value is required and may be found on the Development -> Backends -> <your backend> -> Settings page in OMC.
    * `tokenEndpoint` is your tenant's IDCS OAuth token endpoint. This value is required and may be found on the backend's settings page as well as the Development -> Instance Details page.
    * `backend` properties are required to authorize API calls made by your API implementation to your OMC instance via omce-ccc. You can get the backend info from the backend's Settings page (from the Development tab in OMC, click **Backends**, select the backend that uses the API, click **Open**, and click **Settings**). The following properties are required:
        * `backend.backendId`
        * `backend.authorization.anonymousKey`
        * `backend.authorization.clientId` (optional, required to use oauth security when submitting tests using omce-test)
        * `backend.authorization.clientSecret` (optional, required to use oauth security when submitting tests using omce-test)
    * `tools` properties are required by commands, such as `omce-deploy`, that use the OMC public tooling APIs. The Team Member App `clientId` and `clientSecret` can be found on the Development -> Instance Details page in OMC. The following properties are required:
        * `tools.authorization.clientId`
        * `tools.authorization.clientSecret`
 
By default, the tools assume that `toolsConfig.json` is co-located with or in the same directory as your API implementation. If you choose to move `toolsConfig.json` to a different directory, you must specify the location of the API implementation in `toolsConfig.json` using `moduleLocation`.
 
Other possible `toolsConfig.json` properties, including the format of tests, are documented in the `resource/configMetadata.json` file.
 
### Starting the Local Container
 
1. Make sure that you set the  `NODE_PATH` environment variable to the `node_modules` directory of the node configuration that you want to use (either `<path>/omce-tools/node-configurations/6.10/node_modules` or `<path>/omce-tools/node-configurations/8.9/node_modules`).
2. Run this command to start a node container running your API implementation (as identified by `toolsConfig.json`). You can start the container with or without the `--debug` option. If you start the container with the `--debug` option, you get a URL that you can use to open a debug session in Chrome (you must use Chrome).
 
    `omce-ccc <path to toolsConfig.json> [--debug] [--verbose]`
 
For example:
 
    omce-ccc ../testaccess/apis/pets3/1.0/toolsConfig.json --debug
 
### Making API Calls to the Container
 
Once the local container is running, you may send requests to the container using `omce-test` (see Running Tests on Your Implementation below), cURL, or other REST clients.
 
By default, the container runs on port 4000. (You can change this in the  the `resource/configMetadata.json` file.)
 
With cURL, a simple command might look something like:
 
    $ curl -u <username>:<password> -X GET http://localhost:4000/mobile/custom/<api-name>/<api-version>/<resource-path>
 
## Offline Container Options
 
* --debug - provides a URL you can use to debug a custom API implementation.
* --verbose - if you have errors or warnings, it shows examples of the missing property in addition to a description of the property.
* --version - gets the version number.
 
## Offline Container Notes
 
There are some differences between the custom code container in OMC and the offline container. The offline container:
 
* Has a less granular set of methods for logging. Calls to `console.finest`, `console.finer`, `console.fine`, `console.config`, and `console.info` methods are treated as calls to `console.log`. Calls to `console.warning` are treated as calls to `console.warn`. Calls to `console.severe` are treated as calls to `console.error`.
* Does not do any automatic logging.
* Does not catch unhandled errors. Instead, unhandled errors stop the container.
 
## Running Tests on Your Implementation
 
Once the container is running, you can send requests to the container using the testing tool. The tests are defined in the implementation's `toolsConfig.json` and you can add or remove tests as needed. The initial set of tests is generated from the sample data you entered while defining your resources and methods in OMC. For example:
 
        "postPets":{
            "method":"POST",
            "resource":"/pets",
            "payload":{
                "name":"Oreo",
                "species":"Cat",
                "breed":"Domestic Short Hair",
                "age":"14",
                "vetId":"blueRidge"
            }
        },
        "getPets":{
            "method":"GET",
            "resource":"/pets"
        },
        "getPetsId":{
            "method":"GET",
            "resource":"/pets/:id",
            "uriParameters":{
                "id":"<PARAMETER_VALUE>"
            }
        },
 
1. Make sure that the NODE_PATH environment variable is set to the `node_modules` directory of the node configuration you want to use (either `<path>/omce-tools/node-configurations/6.10/node_modules` or `<path>/omce-tools/node-configurations/8.9/node_modules`).
2. Replace the variable placeholders with the appropriate values.
3. To execute a test, use the `omce-test` command as shown in the following forms:
 
* `omce-test <path to toolsConfig.json> <test name> [--security anonymous] [--verbose]`
* `omce-test <path to toolsConfig.json> <test name> --security basic [--username <username>] [--password <user password>] [--verbose]`
* `omce-test <path to toolsConfig.json> <test name> --security oauth [--username <username>] [--password <user password>] [--verbose]`
 
For example:
 
    omce-test ../testaccess/apis/pets3/1.0/toolsConfig.json postPets --security oauth --username myUsername --password myPassword
 
If the `--security` option is not specified, the test request is submitted using the anonymous user.
 
The command returns the status code and payload contained in the response.
 
You can continue executing tests as long as the container remains running.
 
## Packaging and Uploading Your Implementation
 
Once you have completed your implementation, or reached a stage where you are ready to test it in OMC, you can use the deployment tool (`omce-deploy`) to package the implementation in a zip file and upload it to OMC. You must have the `Developer` role to deploy an implementation.
 
1. Make sure that the NODE_PATH environment variable is set to the `node_modules` directory of the node configuration you want to use (either `<path>/omce-tools/node-configurations/6.10/node_modules` or `<path>/omce-tools/node-configurations/8.9/node_modules`).
2. To deploy the implementation, use the`omce-deploy` command in one of the following forms:
 
* `omce-deploy <toolsConfig.json> -u <OMC developer> -p <pass> [--verbose]`
* `omce-deploy <toolsConfig.json> --username <OMC developer> --password <pass> [--verbose]`
* `omce-deploy <toolsConfig.json> -u <OMC developer> [--verbose]`
* `omce-deploy <toolsConfig.json> [--verbose]`
 
For example:
 
    omce-deploy ../testaccess/apis/pets3/1.0/toolsConfig.json
 
If you don't specify the username and password on the command-line, you are be prompted to enter the values when the command runs.
 
**Note**: The user name and password required for `omce-deploy` are for a user with the `Developer` role. For API tests that you run using `omce-test`, the user name and password correspond to any user who has access to the backend and the API.
 
##  Change log
 
 
* 18.3.1
  * OMC compatible.
 
* 18.2.3
  * Synchronized with core, added node configurations, support for both Node versions: 6.10.0 and 8.9.4 (or compatible).
 
* 17.4.5
  * Fixed an authorization issue seen when using omce-test.
 
* 17.2.5.2
 * Fixed "not a function" error when calling ums.getUserExtended().
 * Fixed "not a function" error when calling location management API.
 
* 17.2.5.1
 * Fixed an issue that affected OAuth authorization using omce-test.
 
* 17.2.5
 * Fixed an issue that affected remote REST APIs calls.
 
* 17.2.1
  * Initial release.