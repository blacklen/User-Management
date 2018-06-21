// import { Button } from 'antd';
// import React, { Component } from 'react';

// class PascalsTriangle extends Component {
// 	state = {
// 		value : 0,
// 		box : "",
// 		a: [[]],
// 		onShow: false
// 	}
// 	_handleChangeText = async (value)=>{
// 		await this.setState({box :this._draw(this.state.value)});
// 		this.setState({onShow:false});
// 	}
// 	_handleClick = ()=>{
// 		this.setState({onShow:true});
// 	}
// 	componentDidMount(){
// 		let a = this.state.a;
// 		for(let i=0;i<=20;i++){
// 			a[i] = [];
// 			for(let j=0;j<=i;j++){
// 				a[i][j]=0;
// 			}
// 		}
// 		for(let i = 0; i <= 20 ;i++){
// 			for(let j = 0; j <= i; j++){
// 				if(i == j || j == 0){
// 					a[i][j] = 1;
// 				}
// 				else{
// 					a[i][j] = a[i-1][j-1] + a[i-1][j];
// 				}
// 			}
// 		}
// 		this.setState({a});
// 	}
//   	// _solve = (value) => {
// 	// 	let a = [[]];
// 	// 	for(let i=0;i<=value;i++){
// 	// 		a[i] = [];
// 	// 		for(let j=0;j<=i;j++){
// 	// 			a[i][j]=0;
// 	// 		}
// 	// 	}
// 	// 	console.log(a);
// 	// 	for(let i = 0; i <= value ;i++){
// 	// 		for(let j = 0; j <= i; j++){
// 	// 			if(i == j || j == 0){
// 	// 				a[i][j] = 1;
// 	// 			}
// 	// 			else{
// 	// 				a[i][j] = a[i-1][j-1] + a[i-1][j];
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	return a;
// 	// }
// 	_draw = (value)=>{
// 		let box = "";
// 		if(value <0 || value>20)   {
// 			box = "Yêu cầu nhập giá trị dương và bé hơn 20";
// 		}
// 		else{
// 			let a = this.state.a;
// 			for(let i=0;i<=value;i++){
// 				for(let j=0;j<=i;j++){
// 					box+=a[i][j] + " ";
// 				}
// 				box+="<br/>";
// 			}
// 		}
// 		return box;
// 	}

//   render() {
// 	return (
//         <div class="main">
//             <input type="number" name="value" onChange = {e => this._handleChangeText(e.target.value)} />
//             <Button id="button" onClick = {this._handleClick()}>Generate</Button>
//             <Button type="primary" id="rotate">Rotate</Button>
//             <div id="show">
// 			{this.state.onShow ? (
//               <div>{this.state.box}</div>
//             ) : ''}
// 			</div>
//         </div>
// 	);
//   }
// }

// export default PascalsTriangle;