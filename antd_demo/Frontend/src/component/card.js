import React, { Component } from 'react';
import Cat from './1.png';
import { Modal, Button,Input, Checkbox, Row, Col  } from 'antd';
import axios from "../axios";

class card extends Component {
    state = {
        data:null,
        visible: false,
        name: "",
        listFriend: []
    }

    componentWillMount(){
        this.setState({data: this.props.data})
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
        let data = this.props.data;
        data.listEvent.push({
            name : this.state.name,
            friends: this.state.listFriend.map((doc)=>{
                return {
                    friend: doc,
                    paid: 0,
                    mustPay: 0,
                    debt: [],
                    done : false
                }
            })
        })
        
        axios
        .put(`/api/users`,{...data})
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
      }

      renderFriend2 = (data)=>{
        let render = data && data.length > 0 ? data.map((doc)=>{
            return (
                <Col span={8}><Checkbox value={doc.friend._id}>{doc.friend.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

      renderFriend = (data)=>{
        let render = data && data.listFriend ? data.listFriend.map((doc)=>{
            return (
                <Col span={8}><Checkbox checked = {true} value={doc._id}>{doc.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }
    renderPayments = (data)=>{
        let render = data && data.length != 0 ? data.map((doc)=>{
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

    onChange = (checkedValues)=> {
        console.log('checked = ', checkedValues);
        this.setState({listFriend : checkedValues})
      }
      changeInput=(e)=>{
          this.setState({name: e.target.value})
      }
    render() {
        return (
            <div className="col-md">
                <div className="card" style={{ width: "300px", height: "300px", textAlign: "center", fontSize: "20px" }}>
                    <img style ={{  height : 159, marginLeft:76, width: 143}} className="card-img-top" src={Cat} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.friends.map((doc)=> doc.friend.fullName + " ")}</p>
                        <Button onClick={this.showModal}>Details</Button>
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
                                value = {this.props.name ? this.props.name : this.state.name}    
                            />
                        </div>
                        <div>
                            <h4>Friends</h4>
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                                <Row>
                                    {this.renderFriend(this.props.data)}
                                </Row>  
                            </Checkbox.Group>
                        </div>
                        <div>
                            <h4> Payments </h4>
                            {this.renderPayments(this.props.payments)}
                        </div>
                </Modal>
            </div>
        );
    }
}

export default card;    