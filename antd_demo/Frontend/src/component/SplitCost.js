import React, { Component } from 'react';
import Header from './header.js';
import Card from './card.js';
import axios from "../axios";
import Cat from '../Images/plus.png';
import { Modal, Button,Input, Checkbox, Row, Col, Carousel  } from 'antd';
const JSON = require('circular-json');
var util = require('util')
class SplitCost extends Component {
    state = {
        data:null,
        visible: false,
        name: "",
        listFriend: [],
        payments: []
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        
        this.setState({
          visible: false,
        });
        let data = this.state.data;
        data.listEvent.push({
            name : this.state.name,
            friends: this.state.payments
        })
        console.log(data);
        // axios
        // .put(`/api/users`,{
        //     _id: data._id,
        //     name: this.state.name,
        //     friends: this.state.payments.map((doc)=>{
        //         return doc;
        //     })
        // })
        // .then(data => {
        // })
        // .catch(err => console.log(err));
        fetch(`http://localhost:6969/api/users`, {
            method: "PUT",
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            body : JSON.stringify({
                ...data
            })
          }).then(res => res.json());
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }
      onChange = (checkedValues)=> {
        let items = [];
        items.push({
            friend: this.state.data,
            paid: 0,
            attend: [],
            mustPay: 0,
            debt: [],
            done : false
        })
        for(let id of checkedValues){
            for(let doc of this.state.data.listFriend){
                if(doc._id.toString() === id.toString()){
                    items.push({
                        friend: doc,
                        paid:0,
                        attend: [],
                        mustPay: 0,
                        debt: [],
                        done : false
                    });
                    break;
                }
            }
        }
        this.setState({listFriend : checkedValues,payments: items})
      }
      changeInput=(e)=>{
          this.setState({name: e.target.value})
      }
      onChangeCarousel(a) {
      
        }
      

    componentWillMount() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const key = urlParams.get("id")
        axios
          .get(`/api/users/${key}`)
          .then(data => {
            console.log(data);
            this.setState({ data: data.data });
          })
          .catch(err => console.log(err));
      }

    renderCard = (data)=>{
        let render = data && data.listEvent ? data.listEvent.map((doc)=>{
            return (
                <Card payments={this.state.payments} name = {doc.name} friends = {doc.friends} data = {this.state.data}/>
            )
        }) : [];
        render.push(
            <div className="col-md" onClick={this.showModal}>
                <div className="card" style={{ width: "300px", height: "300px" }}>
                    <img className="card-img-top" src={Cat} alt="Card image cap" />
                </div>
            </div>)
        return render;
    }
    renderFriend = (data)=>{
        let render = data && data.listFriend ? data.listFriend.map((doc)=>{
            return (
                <Col span={8}><Checkbox value={doc._id}>{doc.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }

    renderFriend2 = (data)=>{
        let render = data.length > 0 ? data.map((doc)=>{
            return (
                <Col span={8}><Checkbox value={doc.friend._id}>{doc.friend.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }

    renderPayments = (data)=>{
        let render = data.length != 0 ? data.map((doc)=>{
            return (
                <div>
                    <h4>{doc.friend.fullName}</h4>
                    <Input 
                        onChange={(e) => this.changePaid(e,doc.friend._id)}  
                        placeholder="How much did you pay?" 
                        value = {doc.paid}
                    />
                    <Checkbox.Group style={{ width: '100%' }} onChange={e => this.onChangeAttend(e,doc.friend._id)}>
                        <Row>
                            {this.renderFriend2(this.state.payments)}
                        </Row>  
                    </Checkbox.Group>
                </div>
            )
        }) : [];
        return render;
    }

    onChangeAttend = (checkedValues,id)=>{
        let payments = this.state.payments;
        for(let payment of payments){
            if(payment.friend._id.toString() === id.toString()){
                payment.attend = checkedValues;
                break;
            }
        }
        this.setState({payments})
    }

    changePaid = (e,id)=>{
        let payments = this.state.payments;
        for(let payment of payments){
            if(payment.friend._id.toString() === id.toString()){
                payment.paid = e.target.value;
                break;
            }
        }
        this.setState({payments})
    }
    render() {
        return (
            <div>
                <Header />
                <div className="MainContent">
                    
                    <div className="row">
                        {this.renderCard(this.state.data)}
                    </div>
                </div>
                <Modal
                    title="New Event"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                        <div>
                            <h4>Name</h4>
                            <Input 
                                onChange={this.changeInput}  
                                placeholder="Name's Event" 
                                value = {this.state.name}    
                            />
                        </div>
                        <div>
                            <h4>Friends</h4>
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                                <Row>
                                    {this.renderFriend(this.state.data)}
                                </Row>  
                            </Checkbox.Group>
                        </div>
                        <div>
                            <h4> Payments </h4>
                            {this.renderPayments(this.state.payments)}
                        </div>
                </Modal>
            </div>
        );
    }
}

export default SplitCost;