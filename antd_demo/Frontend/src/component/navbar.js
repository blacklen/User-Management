import React, { Component } from 'react';
import loveImages from '../Images/love.png';
import '../CSS/navbar.css';
import textImage from '../Images/text.png';
import { Button } from 'antd';

class navbar extends Component {
    state = {
        opacity: 1
    }
    _toggleClass = () => {
        this.setState({opacity: 1})
    }

    render() {
        return (
            <div className="Nav">
                <div className="img">
                    <img className="loveImage" src={loveImages} onClick={this._toggleClass}/>
                    <div className="nav" id="trans" style={{opacity: this.state.opacity}}>
                        <img className="textImage" src={textImage} />
                        <div className="buttonNav">
                            <Button style={{marginBottom : "10px"}} onClick = {e=>this.props.history.push(`/users/${this.props.id}`)}>Home</Button>
                            <Button style={{marginBottom : "40px"}} onClick = {e=>this.props.history.push(`/`)}>Log out</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default navbar;