import React, { Component } from 'react';
import cookie from "react-cookies"
import Login from "./Template/login"


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            httpUrl:"http://www.cbkj888.com"
        };
        this.rinfUp=this.rinfUp.bind(this);
    }

    componentDidMount() {
      let user = cookie.load("user");
        if(user){
           this.setState({
               isLogin:true
           })
       }else{
           this.setState({
               isLogin:false
           })
       }
    }
    rinfUp( ){
        this.setState({
            isLogin:true
        })
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
