import React, { Component } from "react";
import axios from "../axios";
import { Redirect } from "react-router-dom";
import { Table, Button, Input, Icon, Pagination, Dropdown, Menu} from "antd";
import img1 from "./1.png";
import img2 from "./2.png";

class Screen extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: null,
    data1: null,
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    id: "",
    logOut: false,
    length: null,
    page: null,
	limit: 5,
	direction:null
  };
  
  componentWillMount() {
    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(data => {
        console.log(data);
        this.setState({ data: data.data });
      })
      .catch(err => console.log(err));

  }

	onLogOut = () => {
		axios
		.delete("/api/auth/")
		.then(res => this.setState({ logOut: true }))
		.catch(err => console.log(err));
	};
	
  handleClick = ()=> {
    this.props.history.push(`/splitCost?id=${this.props.match.params.id}`);
  }
  render() {
    if (this.state.logOut) {
      return <Redirect to={"/"} />;
    }
  let name = this.state.data ? this.state.data.fullName : "";
	const menu = (
		<Menu>
		  <Menu.Item onClick={this.onLogOut} key="0">Log Out</Menu.Item>
		</Menu>
	  );
	
    return (
      <div id="screen" className="back-ground-beauty">
        <Dropdown overlay={menu} id="manage">
          <Button style={{ marginLeft: 8 }}>
            Manage <Icon type="down" />
          </Button>
        </Dropdown>

        <div>
            <img src = {img1} style={{marginTop: "30%"}}/>
            <span style ={{position: "relative"}}>
              <img src = {img2} style = {{width : "54%"}}/>
              <p style ={{position : "absolute", bottom: "-80px" , left: "16%", fontSize: 30}}> 
                Hello there,{name}
                <br/>
                  What do you want?
                <br/>
                <Button>Save</Button>
                <Button onClick = {this.handleClick}>Split Cost</Button>
              </p>
            </span>
        </div>
      </div>
    );
  }
}

export default Screen;
