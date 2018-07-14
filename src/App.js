import React, { Component } from 'react';
import Login from "./Template/login"


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            httpUrl:"http://172.16.10.68:8086"
        };
        this.rinfUp=this.rinfUp.bind(this);
    }

    componentDidMount() {
        let user =JSON.parse(sessionStorage.getItem("isLogin"));
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
            sessionStorage.setItem("isLogin",JSON.stringify({
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
            <Login httpUrl={this.state.httpUrl} rinfUp={this.rinfUp}  lslogin={this.state.isLogin}/>
      </div>
    );
  }
}

export default App;
