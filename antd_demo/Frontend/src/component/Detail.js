import React, { Component } from 'react';
import Header from './header.js';
import Card from './card.js';
import axios from "../axios";
import Cat from '../Images/plus.png';
import { Modal, Button,Input, Checkbox, Row, Col, Carousel  } from 'antd';
const JSON = require('circular-json');
var util = require('util')
export class Client{
    constructor(paid, toPay, name){
        this.paid = paid;
        this.toPay = toPay;
        this.name = name;
        this.amountLeft = toPay - paid;
    }
}

export class Transaction{
    constructor(payer, payee, amount){
        this.payer = payer;
        this.payee = payee;
        this.amount = amount;
    }
    toString(){
        console.log(`${this.payer} has to pay ${this.payee} ${this.amount}`)
    }   
}

class Detail extends Component {
    state = {
        data:null,
        visible: false,
        name: "",
        listFriend: [],
        payments: [],
        debt: []
    }
    splitClients = (clients) =>{
        let debit = [];
        let credit = [];
        clients.forEach(element => {
            if(element.amountLeft < 0){
                debit.push(element);
            }
            else if(element.amountLeft > 0){
                credit.push(element);
            }
        });
        this.calculateTransaction = ()=>{
            let i = 0; 
            let j = 0;
            let transactions = [];
            while(i < debit.length && j < credit.length){
                if(Math.abs(debit[i].amountLeft) == Math.abs(credit[j].amountLeft)){
                    transactions.push(new Transaction(credit[j].name, debit[i].name,
                         Math.abs(debit[i].amountLeft)));
                    i++; j++;
                }
                else if(Math.abs(debit[i].amountLeft) < Math.abs(credit[j].amountLeft)){
                    let absolute = Math.abs(debit[i].amountLeft);
                    transactions.push(new Transaction(credit[j].name, debit[i].name, absolute));
                    credit[j].amountLeft -= absolute;
                    i++;
                }
                else{
                    let absolute = Math.abs(credit[j].amountLeft);
                    transactions.push(new Transaction(credit[j].name, debit[i].name, absolute));
                    debit[i].amountLeft += absolute;
                    j++;
                }
            }
            return transactions;
        }
        return this.calculateTransaction();
    }
    sum =(data)=>{
        if(data && data.length> 0){
            let clients = [];
            let list = data;
            for(let item of list){
                item.mustPay = 0;
                for(let i of list){
                    for(let a of i.attend){
                        if(a._id.toString() === item.friend._id.toString()){
                            if(i.paid!=0) item.mustPay += (parseInt(i.paid) / parseInt(i.attend.length))
                            else{
                                item.mustPay += 0;
                            }
                            break;
                        }
                    }
                    
                }
            }
            list.map((doc)=>{
                clients.push(new Client(doc.paid, doc.mustPay, doc.friend.fullName));
            })
            let debt = this.state.debt;
            let transactions = this.splitClients(clients);
                transactions.forEach(element => {
                    debt.push({
                        payer: element.payer,
                        payee : element.payee,
                        amount : element.amount
                    })
                })  
            this.setState({data: list,debt})

            }
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
      

    componentWillMount() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const key = urlParams.get("id")
        const eventId = urlParams.get("eventId");
        axios
          .get(`/api/users/${key}`)
          .then(data => {
              for(let doc of data.data.listEvent){
                  if(doc._id.toString()===eventId.toString()){
                    this.sum( doc.friends);
                    this.setState({ data: doc });
                    break;
                  }
              }
            
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
        let render = data && data.friends ? data.friends.map((doc)=>{
            return (
                <Col span={8}><Checkbox value={doc.friend_id}>{doc.friend.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }

    renderFriend2 = (data)=>{
        let render = data.length > 0 ? data.map((doc)=>{
            return (
                <Col span={8}><Checkbox  value={doc.friend._id}>{doc.friend.fullName}</Checkbox></Col>
            )
        }) : [];
        return render;
    }

    renderPayments = (data)=>{
        let render = data &&data.length != 0 ? data.map((doc)=>{
            return (
                <div>
                    <h4>{doc.friend.fullName}</h4>
                    <Input style={{width:"60%", display:"block" , margin:"auto"}}
                        placeholder="How much did you pay?" 
                        value = {doc.paid}
                    />
                    <ul>
                        {doc.attend ? doc.attend.map((doc)=> <li> {doc.fullName}</li>) : ""}
                    </ul>
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
                    <div className="container">
                        <div style = {{width: 500, border: "1px solid gray", margin: "auto", backgroundColor: "rgb(238, 238, 238)"}}>
                            <h1 style={{textAlign: "center"}}> {this.state.data ? this.state.data.name : this.state.name} </h1>
                            <h3 style={{backgroundColor: "rgb(68,68,68)", borderRadius:"5px", textAlign:"center", color: "lightgrey"}}>Friends </h3>
                            <ul>
                                {this.state.data && this.state.data.friends ?
                                    this.state.data.friends.map((doc)=>{
                                        return(<li>{doc.friend.fullName}</li>)
                                    })
                                    : ""}
                            </ul>
                            <h3 style={{backgroundColor: "rgb(68,68,68)", borderRadius:"5px", textAlign:"center", color: "lightgrey"}}> Payments </h3>
                            {this.renderPayments(this.state.data ? this.state.data.friends  : "")}
                            <h3 style={{backgroundColor: "rgb(68,68,68)", borderRadius:"5px", textAlign:"center", color: "lightgrey"}}> Debts </h3>
                            <ul>
                                {this.state.debt ? this.state.debt.map((doc)=>{
                                    return <li> {doc.payer} owe {doc.payee} {doc.amount} </li>
                                }): ""}
                            </ul>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Detail;