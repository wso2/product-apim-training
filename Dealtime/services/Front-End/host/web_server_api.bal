// Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/internal as file;
import ballerina/io;
import ballerina/log;
import ballerina/mime;
import ballerina/http;

endpoint http:Listener webserverEndpoint {
    port: WEBSERVER_SERVICE_PORT,
    secureSocket: {
        keyStore: {
            path: KEYSTORE_FILE,
            password: KEYSTORE_PASSWORD
        }
    }
};

@http:ServiceConfig {
    basePath: "/",
    chunking: http:CHUNKING_NEVER
}
service<http:Service> webServer bind webserverEndpoint {
    @http:ResourceConfig {
        methods: ["GET"],
        path: "/*"
    }
    serveHtmlFiles(endpoint outboundEP, http:Request req) {
        string htmlFileName = untaint req.extraPathInfo;
        // If no path mentioned, then use index.html 
        if ("" == getFileExtension(htmlFileName)) {
            htmlFileName = "index.html";
        }
        string srcFilePath = WEBSERVER_APP_FOLDER + htmlFileName;
        http:Response res = getFileAsResponse(srcFilePath);
       // io:println(srcFilePath);
        _ = outboundEP->respond(res);
    }
}

documentation {
    Serve a file as a http response.
    P{{srcFilePath}} The path of the file to server.
    R - The http response.
}
function getFileAsResponse(string srcFilePath) returns (http:Response) {
         http:Response res = new;
         file:Path file = new(srcFilePath);
         io:println(srcFilePath);
         // Default content type.
         string contentType = mime:APPLICATION_OCTET_STREAM;
         log:printDebug("serving file: " + srcFilePath);

          if (!file.exists()) {
          res.setTextPayload("Oh no, what you are looking for does not exists.");
          res.statusCode = 404;
    } else {
        // Finding mime-type by extension
        string fileExtension = getFileExtension(srcFilePath);
        if (fileExtension != null) {
            contentType = getMimeTypeByExtension(fileExtension);
        }
        res.setFileAsPayload(srcFilePath, contentType = contentType);
    }
    return res;
}