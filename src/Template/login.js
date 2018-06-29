import React,{Component}from "react";
import Home from"./Home"
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
        this.login_btn= this.login_btn.bind(this)
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
    login_btn( e ){
        if(this.state.user!=="123"){
            this.setState({
                isUser:false
            });
            return ;
        }
        if(this.state.password!=="123"){
            alert("账号或密码错误");
            return;
         }
        this.setState({
            il:<LG />
        });
        setTimeout(()=>{
            this.props.rinfUp(1000)
        },1000)
    }
    render(){
        if(!this.props.lslogin){
            return(
                <div className={"login"}>
                    <div className={"userImg"}> </div>
                    <p>管理系统</p>
                    <p>登录</p>
                    <input  type="text"     name={"user"} onChange={this.login_text} style={this.state.isUser?{"borderColor":""}:{"borderColor":"red"}} placeholder={"账号"}/>
                    <input  type="password" name={"password"} onChange={this.login_text}  placeholder={"密码"}/>
                    <div className={"btn"}  onClick={this.login_btn}>{this.state.il}</div>
                    <span className={"err1"} style={this.state.isUser?{"display":"none"}:{"display":"block"}}>该账号不存在请重新输入</span>
                </div>
            )
        }else{
            return (
                <Home />
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