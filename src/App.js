import React, { Component } from 'react';
import Login from "./Template/login"


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLogin:false
        };
        this.rinfUp=this.rinfUp.bind(this);
    }

    componentDidMount() {
        let user =JSON.parse(localStorage.getItem("isLogin"));
       if(user){
           this.setState({
               isLogin:user.isLogin
           })
       }else{
           this.setState({
               isLogin:false
           })
       }
    }
    rinfUp(a){
        if(a===1000){
            this.setState({
                isLogin:true
            });
            localStorage.setItem("isLogin",JSON.stringify({
                "isLogin":true
            }))
        }else{
            this.setState({
                isLogin:false
            })
        }
    }


  render() {
    return (
      <div className="App">
            <Login rinfUp={this.rinfUp}  lslogin={this.state.isLogin}/>
      </div>
    );
  }
}

export default App;
