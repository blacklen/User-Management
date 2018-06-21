import React, { Component } from 'react'


class RowPasCal extends Component {


    frac = (e) =>{
        if(e === 0 || e ===1) return 1;
        return e*this.frac(e-1);
    }
    ncr = (value , index) =>{
        let mul;
        if(value ===0 && index === 0 ) return 1;
        else { mul = this.frac(index) / (this.frac(value) * this.frac(index -value))};
        if(mul > 100000) {mul = mul.toString().substring(0,6).concat('....') ; console.log(mul)};
        return mul;
    }
    render() {

        
        const row = Array.apply(null , Array(this.props.index ? (this.props.index + 1) : 0)).map((value , index)=>{
            console.log(this.props.index + " " +index);
            
            return (  <span key ={index} className="span"> { this.ncr(index , this.props.index)  }</span>)
        })
        return (
            <div className="row" >
                
                   {row}
                
            </div>
        );



    }
}

export default RowPasCal;