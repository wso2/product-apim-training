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

// Dependencies
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { withRouter } from "react-router";
import "./index.css";
import Production_Keys from "config";
import axios from "axios";

//Navigation bar

class Navi extends React.Component {
  constructor(e) {
    super(e);
    this.logout = this.logout.bind(this);
  }
  
//in here we call logout button functions and revoking token
  logout(event) {
    var access_token = localStorage.getItem("access_token");
    //store username and password in data variable
    var data = "token=" + access_token;

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

    //calling to revoke api
    axios
      .post("https://localhost:8243/revoke/1.0.0/revoke", data, axiosConfig) 

      .then(res => {
        console.log("RESPONSE RECEIVED: ", res);
      });

    localStorage.clear();
    this.props.changeLogged({ logged: false });
    this.props.history.push("/products");
    window.location.reload();
  }

  render() {
    const { authorized, logged } = this.props;

    return (
      <span className="set">
        <AppBar position="static" color="default" display="flex">
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit">
              <span className="Home">
                <Button href="/products">HOME</Button>
              </span>

              {authorized ? (
                <Button href="/inventory_items"> INVENTORY </Button>
              ) : null}

              <span className="Cart">
                <IconButton
                  href="/cart"
                  color="primary"
                  aria-label="Add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </span>

              <span className="Login">
                {logged ? (
                  <Button onClick={this.logout}>LOGOUT</Button>
                ) : (
                  <Button href="/login">LOGIN</Button>
                )}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
      </span>
    );
  }
}

export default withRouter(Navi);
