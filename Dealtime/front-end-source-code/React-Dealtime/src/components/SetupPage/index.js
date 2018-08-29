/*
* Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

//Dependencies
import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import "./index.css";
export default class ProItems extends React.Component {
  

  UserSetup(){
    axios
    .get("http://localhost:9090/importService/USERtrigger/true") //calling to USERtrigger ballerina service 
    .then(res => {
      console.log("ImportAPI RECEIVED: ", res);

      if (res.status === 200) {
        swal({
          icon: "success"
        });
      }
    })
    .catch(err => {
      console.log("AXIOS ERROR: ", err);
    });

  }

  RolesSetup() {
    axios
      .get("http://localhost:9090/importService/ROLEStrigger/true") //calling to ROLEStrigger ballerina service 
      .then(res => {
        console.log("ImportAPI RECEIVED: ", res);

        if (res.status === 200) {
          swal({
            icon: "success"
          });
        }
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  }

  
  ApiSetup() {
    axios
      .get("http://localhost:9090/importService/APItrigger/true") //calling to APItrigger ballerina service 
      .then(res => {
        console.log("ImportAPI RECEIVED: ", res);

        if (res.status === 200) {
          swal({
            icon: "success"
          });
        }
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  }

  render() {
    return (
    <div className="wrap">
      <div className="frame">
        <span className="Button">
          <Button
            onClick={e => this.ApiSetup()}
            variant="contained"
            color="secondary"
          >
            Deploy APIs
          </Button>
        </span>

        <span className="Button">
          <Button
            onClick={() => this.RolesSetup()}
            variant="contained"
            color="secondary"
          >
            Create Roles 
          </Button>
        </span>

         <span className="Button">
          <Button
            onClick={() => this.UserSetup()}
            variant="contained"
            color="secondary"
          >
            Create Users
          </Button>
        </span>
      </div>
      </div>
    );
  }
}
