import React, { Component } from 'react';
import '../CSS/savepage.css';   
import Navbar from '../component/navbar.js';
import blinkyImage from '../Images/blinky.png';
import cuteImage from '../Images/cute.png'

class header extends Component {
    render() {
        return (
            <div>
                <div id="header">
                    <Navbar />
                    <div className="logo">
                        <div>
                            <img className="blinkyLogo" src={blinkyImage} />
                        </div>
                        <div>
                            <img className='mascot' src={cuteImage} />
                        </div>
                    </div>
                    <div className="func" style={{ fontFamily: "sans serif", marginTop: "10px" }}>Split it</div>
                </div>
            </div>
        );
    }
}

export default header;