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

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import Production_Keys from "config";
//import { Input } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      logged: false
    };
    this.login = this.login.bind(this);
   ;
  }
  handleSubmit = event => {
   event.preventDefault()
   this.login()
 }

  login() {
  
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("passWord").value;

    //store username and password in data variable
    var data =
      "grant_type=password&username=" +
      userName +
      "&" +
      "password=" +
      password +
      "&" +
      "scope=" +
      "buy sell";

    let axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
        "X-Authorization":
          "Basic " +
          new Buffer(
            Production_Keys
            // Encode using base64
          ).toString("base64")
      }
    };

    //this is requesting USER_NAME And PASSWORD from Token API

    axios
      .post(
        "https://localhost:8243/login/1.0.0/oauth2/token",
        data,
        axiosConfig
      ) //FRONTEND_URL
      .then(res => {
        // console.log("RESPONSE RECEIVED: ", res.data);

        var splitSentence = res.data.scope.split(" ");
        var stringArray = [];
        for (var i = 0; i < splitSentence.length; i++) {
          stringArray.push(splitSentence[i]);
        }

        localStorage.setItem("scope", JSON.stringify(stringArray));
        localStorage.setItem("access_token", res.data.access_token);

        //if user_name and passwors are correct go to the product page
        if (res.status === 200) {
          this.props.changeLogged({ logged: true });
          this.setState({ logged: true });
        } else {
          swal("Username or Password Incorrect !");
        }
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);

        swal("Username or Password Incorrect !");
      });
    
  }
  render() {
    if (this.state.logged) {
      return <Redirect to="/products" />;
    }
    return (
      
      <div className="login_place">
        <div className="row" id="Body">
          <div className="medium-5 columns left">
            <h4>Login</h4>

  <form onSubmit={this.handleSubmit}>
            <label> Username</label>

            <input
              type="text"
              id="userName"
              name="username"
              placeholder="Username"
            />

            <label>Password</label>

            <input
              align="center"
              type="password"
              id="passWord"
              name="password"
              placeholder="password"
            />
         
            <Button
              input type="submit"
              className="button success"
              value="Login"
              // onSubmit={this.login}
               //onKeyPress={this.login}
              variant="contained"
              color="primary"
            >
              LOGIN
            </Button>
         </form>   
          </div>
        </div>
      </div>
      
    );
  }
}
export default Login;
