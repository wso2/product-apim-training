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

documentation {
    Gets the extension of filename or file path. Example: png, js, css
    P{{fileName}} The name of the file.
    R - The extension.
}
function getFileExtension(string fileName) returns (string) {
    int index = fileName.lastIndexOf(".");
    if (-1 != index) {
        return fileName.substring(index + 1, lengthof fileName);
    } else {
        return "";
    }
}