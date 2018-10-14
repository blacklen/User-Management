import React from "react";
import axios from "../axios";
import "../App.css";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import { Redirect} from "react-router-dom";
import Header from "./header";
const FormItem = Form.Item;

class LoginForm extends React.Component {
	state = {
		true: 0,
		id:""
	};
	_onLogin = async (username,password)=>{
		this.setState({err: ""})
		await axios
		.post("/api/auth",{
		  username,
		  password
		})
		.then(res => {  
			if(res.data.err){
				this.setState({err: res.data.err});
				console.log(this.state.err);
			}
			else{
				this.setState({true: 1,id:res.data.id});
			}
			console.log(res.data);
			
		})
		.catch(error => 
			console.log(error)
		);
	  }
  	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		if (!err) {
			console.log("Received values of form: ", values);
		}
		this._onLogin(values.username, values.password);
		});
  	};
  	render() {
		if (this.state.true === 1) {
			return <Redirect to= {`/users/${this.state.id}`} />;
		}
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Header/>
      	<Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: 100}} id = "components-form-demo-normal-login">
			<FormItem>
				{getFieldDecorator("username", {
					rules: [{ required: true, message: "Please input your username!" }]
				})(
					<Input
					prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
					placeholder="Username"
					/>
				)}
			</FormItem>
			<FormItem>
				{getFieldDecorator("password", {
					rules: [{ required: true, message: "Please input your Password!" }]
				})(
					<Input
					prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
					type="password"
					placeholder="Password"
					/>
				)}
			</FormItem>
			<FormItem>
				{getFieldDecorator("remember", {
					valuePropName: "checked",
					initialValue: true
				})(<Checkbox>Remember me</Checkbox>)}
				<a className="login-form-forgot" href="" id = "components-form-demo-normal-login">
					Forgot password
				</a>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					id = "components-form-demo-normal-login"
					style={{background: "#007BFF",border: "none"}}
				>
					Log in
				</Button>
				Or <a href="/register">register now!</a>
			</FormItem>
			{this.state.err ? (<div>
        <Alert
          message="Error"
          description={this.state.err}
          type="error"
          showIcon	
        /></div>) : <div></div>}
		</Form>
		</div>
    );
  }
}

let Login = Form.create({})(LoginForm);
export default Login;
