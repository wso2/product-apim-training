/*
* Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/* eslint no-eval: 0 */

//Dependencies
import React from "react";
import "./index.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { set_headder } from "../Request_Headder";

export default class ProItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "1" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  //iterate the items that are in the local storage and call order api
  //then checkout  items in backend in memory map

  checkout() {
    // Get cart items from localstorage
    var items_array = JSON.parse(localStorage.getItem("item"));

    //iterate items in localstorage
    for (var i = 0; i < items_array.length; i++) {
      // by this we send put request to order API in port 8243 for add Items for the store
      axios
        .put(
          "https://localhost:8243/orderapi/1.0.0/order/" + items_array[i].ID,
          { stock: eval(items_array[i].stock) - eval(items_array[i].order) },
          set_headder()
        )

        .then(function(res) {
          let products = res.data;
          return products;
        })
        .catch(err => {
          console.log("AXIOS ERROR: ", err);
        });
    }

    localStorage.removeItem("item");

    window.location.reload();
  }
  //remove button function
  remove(ID) {
    var cart_items = JSON.parse(localStorage.getItem("item"));

    // by this we remove the item that belong to ID
    var cartObj = [];
    for (var i = 0; i < cart_items.length; i++) {
      if (ID !== cart_items[i].ID) {
        cartObj.push(cart_items[i]);
      }
    }

    localStorage.setItem("item", JSON.stringify(cartObj));
    //if cart items are empty this removes the item array
    //this helps to get empty cart message
    if (cart_items.length === 1) {
      localStorage.removeItem("item");
    }

    window.location.reload();
  }
  //this function use to update orders quntity
  update(ID, stock, value) {
    if (stock < value) {
      swal({
        text: "Please Enter less ammount of items"
      });
    } else {
      swal({
        text: "Items update successfully !"
      });
    }
    //this pass update order qutity to array rewrite it
    var items_array = JSON.parse(localStorage.getItem("item"));

    for (var i = 0; i < items_array.length; i++) {
      if (ID === items_array[i].ID) {
        items_array[i].order = value;
        break;
      }
    }
    localStorage.setItem("item", JSON.stringify(items_array));
  }

  render() {
    var cart_items = JSON.parse(localStorage.getItem("item"));

    if (cart_items == null) {
      return (
        <div className="Empty_headder">
          <h4>Cart is Empty</h4>
        </div>
      );
    }

    return (
      <div>
        {cart_items.map(product => {
          return (
            <div className="product-items">

              <div className="product-set">
              
                <h1 id="product-name">{product.name}</h1>
                <h4 id="product-description">Product ID :{product.ID}</h4>
                <h5 id="product-price">${product.price}</h5>

                <div className="item-form">
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Quentity:
                      <input
                        type="Number"
                        defaultValue="1"
                        ref={this.state.value}
                        onChange={this.handleChange}
                      />
                    </label>
                    <span className="Update">
                      <Button
                        onClick={() =>
                          this.update(
                            product.ID,
                            product.stock,
                            this.state.value
                          )
                        }
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                    </span>

                    <span>
                      <Button
                        onClick={() => this.remove(product.ID)}
                        variant="contained"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
        <span className="checkout">
          <Button
            onClick={() => this.checkout()}
            variant="contained"
            color="secondary"
          >
            CheckOut
          </Button>
        </span>
      </div>
    );
  }
}
