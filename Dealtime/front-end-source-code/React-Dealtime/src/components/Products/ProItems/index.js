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
import { Link } from "react-router-dom";
import { getProducts } from "../../Data";
import "typeface-roboto";

export default class ProItems extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false
    };
  }
  //this can be reuse

  componentDidMount() {
    //setState loading
    this.setState({
      loading: true
    });

    getProducts().then((res = []) => {
      this.setState({
        products: res,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        {this.state.products.map(product => {
          return (
            <div key={product.ID} className="items">
              <Link to={`/show_product/${product.ID}`}>
                <div className="product-img">
                  <img alt={product.name} src={product.img} />
                </div>
                <div className="product-details">
                  <h1 id="product-name">{product.name}</h1>
                  <h4 id="product-description">{product.description}</h4>
                </div>
              </Link>

              <div className="price-add">
                <h5 id="product-price">${product.price}</h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
