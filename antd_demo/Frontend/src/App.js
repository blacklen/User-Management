import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Screen from './component/Screen';
import Login from './component/Login';
import Register from './component/Register';
import SplitCost from './component/SplitCost';

  class App extends React.Component {
    state = {
      username: "",
      id: "",
    }
    
    render() {
      return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" render={(props) => <Login />} />
                <Route path="/users/:id" render={(props) => <Screen {...props} username={this.state.username}/>} />
                <Route path="/register" render={(props) => <Register {...props}/>} />
                <Route path="/register" render={(props) => <Register {...props}/>} />
                <Route path="/splitCost" render={(props) => <SplitCost {...props}/>} />
                
            </div>
        </BrowserRouter>
      );
    }
  }

  export default App;