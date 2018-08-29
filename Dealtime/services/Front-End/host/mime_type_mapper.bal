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

import ballerina/mime;

map MIME_MAP = {
    "json": mime:APPLICATION_JSON,
    "xml": mime:TEXT_XML,
    balo: mime:APPLICATION_OCTET_STREAM,
    css: "text/css",
    gif: "image/gif",
    gif: "image/gif",
    html: mime:TEXT_HTML,
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "application/javascript",
    png: "image/png",
    svg: "image/svg+xml",
    txt: mime:TEXT_PLAIN,
    woff2: "font/woff2",
    zip: "application/zip"
};

documentation {
    Get the mime type using a file extension.
    P{{extension}} The file extension.
    R - The mime type if a match is found, else application/octet-stream.
}
function getMimeTypeByExtension(string extension) returns (string) {
    if (MIME_MAP.hasKey(extension)) {
        return <string>MIME_MAP[extension];
    } else {
        return mime:APPLICATION_OCTET_STREAM;
    }
}