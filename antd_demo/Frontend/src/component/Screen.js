import React, { Component } from "react";
import axios from "../axios";
import { Redirect } from "react-router-dom";
import { Table, Button, Input, Icon, Pagination, Dropdown, Menu} from "antd";

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
  
  componentDidMount() {
    axios
      .get(`/api/users/1?limit=5&direction=-createdAt&filter`)
      .then(data => {
        this.setState({ data1: data.data });
      })
      .catch(err => console.log(err));

    axios
      .get("/api/users")
      .then(data => this.setState({ length: data.data.length }))
      .catch(err => console.log(err));
  }
  handleChange = page => {
    this.setState({ page });
    axios
      .get(`/api/users/${page}?limit=${this.state.limit}&direction=${this.state.direction}&filter`)
      .then(data => this.setState({ data: data.data }))
      .catch(err => console.log(err));
  };
  onChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  onInputChange = e => {
    let filter = e.target.value;
    let a = axios
      .get(`/api/users/${this.state.page}?limit=${this.state.limit}&direction=${this.state.direction}&filter=${filter}`)
      .then(data => this.setState({ data: data.data }))
      .catch(err => console.log(err));
  };

	onLogOut = () => {
		axios
		.delete("/api/auth/")
		.then(res => this.setState({ logOut: true }))
		.catch(err => console.log(err));
	};
	onClickItem = (item)=>{
		this.setState({limit:item})
		axios
		.get(`/api/users/1?filter&limit=${item}&direction=${this.state.direction}&filter`)
		.then(data => {
		  this.setState({ data1: data.data });
		})
		.catch(err => console.log(err));
  }
  
  onSort = ()=>{
    axios
    .get(`/api/users/${this.state.page}?limit=${this.state.limit}&direction=${this.state.direction}&filter`)
    .then(data => this.setState({ data: data.data }))
    .catch(err => console.log(err));
  }
  render() {
    if (this.state.logOut) {
      return <Redirect to={"/"} />;
    }
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        sorter: (a, b) => a.username.length - b.username.length,
        sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Username"
              onChange={this.onInputChange}
              onPressEnter={this.onFilter}
              id="input"
            />
          </div>
        )
      },
      {
        title: "Fullname",
        dataIndex: "fullName",
        key: "fullName",
        sorter: (a, b) => a.fullName.length - b.fullName.length,
        sortOrder: sortedInfo.columnKey === "fullName" && sortedInfo.order
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order
      }
	];
	const menu = (
		<Menu>
		  <Menu.Item onClick ={e => {this.onClickItem(e.key)} } key="5">5 Item</Menu.Item>
		  <Menu.Item onClick ={e => {this.onClickItem(e.key)} } key="10">10 Item</Menu.Item>
		  <Menu.Item onClick ={e => {this.onClickItem(e.key)} } key="15">15 item</Menu.Item>
		  <Menu.Item onClick={this.onLogOut} key="0">Log Out</Menu.Item>
		</Menu>
	  );
	
    return (
      <div id="screen">
        <Dropdown overlay={menu} id="manage">
          <Button style={{ marginLeft: 8 }}>
            Manage <Icon type="down" />
          </Button>
        </Dropdown>

        <h1>List Users </h1>
        {this.state.data ? (
          <Table
            pagination={false}
            columns={columns}
            dataSource={this.state.data}
            onChange={this.onChange}
          />
        ) : (
          <Table
            columns={columns}
            pagination={false}
            dataSource={this.state.data1}
            onChange={this.onChange}
          />
        )}
        <Pagination
          style={{ float: "right" }}
          defaultCurrent={1}
          pageSize={this.state.limit}
          total={this.state.length}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Screen;
