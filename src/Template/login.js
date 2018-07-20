import React,{Component}from "react";
import axios from "axios"
import cookie from "react-cookies"
import Home from"./Home";
import "../img/fontImage/iconfont.css"

import '../css/login.css'
class app extends Component{
    constructor(props){
        super(props);
        this.state={
            user:"",
            password:"",
            isUser:true,
            il:"确定"
        };

        this.login_text = this.login_text.bind(this);
        this.login_btn= this.login_btn.bind(this);
        this.blur=this.blur.bind(this);
    }
    componentWillUnmount(){
        //组件被移除时执行

    }
    componentDidUpdate(){

        //setState 更新时执行

    }
    componentDidMount(){
        //组件第一次render时执行

    }
    /**获取用户输入的账号密码并保存**/
    login_text(e){
        //输入账号密码
        let type = e.target;
        if(type.name==="user"){
            this.setState({
                isUser:true
            })
        }
        this.setState({
            [type.name]:type.value
        })
    }
    headers={
        "Content-Type": "application/json;",
        "Cache-Control": "no-cache",
        "Postman-Token": "68f807ba-db68-4f29-9091-7cb080b46462"
    };
    islogin = true;
    /**登陆**/
    login_btn( e ){
        if(this.islogin){
            this.islogin=false;
            this.setState({
                il:< LG />
            })
            axios({
                url:this.props.httpUrl+"/charge/web/admin/login",
                method:"post",
                headers:this.headers,
                data:{
                    account:this.state.user,
                    password:this.state.password
                },
            }).then((res)=>{
                if(res.data.code===1000){
                    cookie.save("user",res.data);
                    this.props.rinfUp( );
                }else if(res.data.code===3001||res.data.code===1001||res.data.code===1002){
                    alert(res.data.message)
                }
                this.islogin=true;
                this.setState({
                    il:"确定"
                })
            })
        }
    }
    /**验证账号是否存在**/
    blur(e){
      var _phone =  e.target.value;
      if(_phone.length>0){
          axios({
              url:this.props.httpUrl+"/charge/web/admin/checkAdmin",
              method:"get",
              params:{account:_phone},
          }).then((res)=>{
              if(res.data.code===3001){
                  this.setState({
                      isUser:false
                  })
              }else if(res.data.code===1001){
                  alert("系统异常")
              }
          })
      }
    }
    render(){
        if(!this.props.lslogin){
            return(
                <div className={"login"}>
                    <div className={"userImg"}> </div>
                    <p>管理系统</p>
                    <p>登录</p>
                    <input  type="text" onBlur={this.blur}    name={"user"} onChange={this.login_text} style={this.state.isUser?{"borderColor":""}:{"borderColor":"red"}} placeholder={"账号"}/>
                    <input  type="password" name={"password"} onChange={this.login_text}  placeholder={"密码"}/>
                    <div className={"btn"}  onClick={this.login_btn}>{this.state.il}</div>
                    <span className={"err1"} style={this.state.isUser?{"display":"none"}:{"display":"block"}}>该账号不存在请重新输入</span>
                </div>
            )
        }else{
            return (
                <Home httpUrl={this.props.httpUrl}/>
            )
        }
    }
}

export default app;


function LG (props){
    return (
        <div className={"jiazai"}>
            <i className={"iconfont icon-yinpinjiazai jiazai"}></i>
        </div>
    )
}