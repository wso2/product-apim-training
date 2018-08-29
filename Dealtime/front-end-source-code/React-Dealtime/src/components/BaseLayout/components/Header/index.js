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
import "./index.css";

const classNames = ["first-header", "second-header", "third-header"];
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //this index use for change the header background
      index: 0
    };
  }

  incrementIndex = () => {
    const newIndex = this.state.index + 1;
    this.setState({ index: newIndex });
  };

  componentDidMount = () => {
    setInterval(this.incrementIndex, 3000);
  };

  render() {
    const index = this.state.index % classNames.length;
    const className = "header " + classNames[index];
    return (
      <div className={className}>
        <h1>DealTime</h1>
      </div>
    );
  }
}
