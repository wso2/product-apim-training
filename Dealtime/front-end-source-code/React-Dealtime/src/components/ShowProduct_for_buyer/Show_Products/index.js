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
/*jshint -W065 */

//Dependencies
import React from "react";
import { getProducts } from "../../Data";
import "./index.css";
import swal from "sweetalert";

export default class ShowProduct extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.inputNode.value);
  };

  constructor() {
    super();
    this.state = {
      products: [],
      loading: false
    };
  }

  //this is use for pass product details to cart
  pass_cart(product) {
    var access_token = localStorage.getItem("access_token");

    if (access_token === null) {
      //alert("Please Login !!");
      swal({ title: "Please Login !!" });
      this.props.history.push("/login");
    } else {
      var orderJSON = {
        ID: product.ID,
        name: product.name,
        price: product.price,
        stock: product.stock,
        order: 1
      };

      var cart = localStorage.getItem("item");

      var array_value = JSON.parse(localStorage.getItem("item"));

      if (cart != null) {
        for (var i = 0; i < array_value.length; i++) {
          if (orderJSON.ID === array_value[i].ID) {
            swal({
              text: "Item is allready in the Cart"
            });

            return;
          }
        }
      }

      var cartObj = [];

      if (cart == null) {
        cartObj.push(orderJSON);
      } else {
        cartObj = JSON.parse(cart);
        cartObj.push(orderJSON);
      }
      localStorage.setItem("item", JSON.stringify(cartObj));

      swal({
        icon: "success"
      });
    }
  }

  componentDidMount() {
    //setState loading
    this.setState({ loading: true });
    getProducts().then((res = []) => {
      this.setState({ products: res, loading: false });
    });
  }

  render() {
    //get ID from the url
    var ID_Number = Number(this.props.match.params.ID);
    if (this.state.loading) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        {this.state.products.map(product => {
          if (product.ID === ID_Number) {
            return (
              <div className="show-product">
                <div className="item-wrapper">
                  <div className="item-image">
                    <img
                      className="product-image"
                      src={product.img}
                      alt="product"
                    />
                  </div>

                  <div className="item-name">
                    <div className="product-info">
                      <h3 id="product-name">{product.name}</h3>
                    </div>

                    <div className="product">
                      <p id="product-description1">{product.description}</p>
                      <p id="product-price">${product.price}</p>

                      <div>
                        <button onClick={() => this.pass_cart(product)}>
                          <i className="medium material-icons icon-blue">
                            <p id="product-description">Add To Cart</p>
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
