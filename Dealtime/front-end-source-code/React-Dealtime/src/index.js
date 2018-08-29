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
//HashRouter
//BrowserRouter

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import BaseLayout from "./components/BaseLayout";
import Products from "./components/Products";
import SetupPage from "./components/SetupPage";
import Login from "./components/Login";
import ShowProduct from "./components/ShowProduct";
//import Inventory from "./components/Inventory";
import InventoryItems from "./components/Inventory_Items";
import show_products_Buyer from "./components/ShowProduct_for_buyer/Show_Products";
import registerServiceWorker from "./registerServiceWorker";

class ShoppingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logged: false };
    this.state = { authorized: false };
    this.changeLogged = this.changeLogged.bind(this);
  }

  changeLogged(logged) {
    let access_token_available = localStorage.getItem("access_token");
    var scope = JSON.parse(localStorage.getItem("scope"));

    this.setState(logged);
    if (access_token_available != null && scope != null) {
      this.setState({ logged: true });
      if (scope.indexOf("sell") >= 0) {
        this.setState({ authorized: true });
      }
    }
  }

  componentDidMount() {
    let access_token_available = localStorage.getItem("access_token");
    var scope = JSON.parse(localStorage.getItem("scope"));

    if (access_token_available != null && scope != null) {
      this.setState({ logged: true });
      if (scope.indexOf("sell") >= 0) {
        this.setState({ authorized: true });
      }
    }
  }

  render() {
    const { logged } = this.state;
    const { authorized } = this.state;

    return (
      <BrowserRouter>
        <BaseLayout
          changeLogged={this.changeLogged}
          logged={logged}
          authorized={authorized}
        >
          <Switch>
            <Route path="/show_product/:ID" component={show_products_Buyer} />
            <Route
              path="/login"
              render={() => (
                <Login changeLogged={this.changeLogged} logged={logged} />
              )}
            />

            <Route
              path="/inventory_items"
              render={() => <InventoryItems authorized={authorized} />}
            />

            <Route
              exact
              path="/showproducts_item/:ID"
              component={ShowProduct}
            />
            <Route path="/cart" component={Cart} />
           
            <Route path="/products" component={Products} />

             <Route path="/Setup" component={SetupPage} />

           
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <ShoppingApp />,

  document.getElementById("root")
);
//registerServiceWorker();
