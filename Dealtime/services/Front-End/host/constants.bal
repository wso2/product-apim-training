// Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file exceptse
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

import ballerina/config;
import ballerina/system;

@final string FILE_SEPARATOR = "/";

//// Configuration related properties.
@final int WEBSERVER_SERVICE_PORT =  8080;

//Build file should be in this path
@final string WEBSERVER_APP_FOLDER =  "host" + FILE_SEPARATOR +
        "build" + FILE_SEPARATOR;

// Keystore
@final string KEYSTORE_FILE = config:getAsString("KEYSTORE_FILE", default =
    "${ballerina.home}/bre/security/ballerinaKeystore.p12");
@final string KEYSTORE_PASSWORD = config:getAsString("KEYSTORE_PASSWORD", default = "ballerina");
