import React, {Component} from "react";
import {Icon} from "antd"

import "antd/dist/antd.min.css"
import "../img/fontImage/iconfont.css"
import "../css/home.css"

/**引入路由**/
import A from "./a"
import B from "./b"
import C from "./c"
import D from "./d"
import E from "./e"
import F from "./f"
import G from "./g"

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audit:"",
            rou:0
        }
    }

    componentWillUnmount() {
        //组件被移除时执行

    }
    componentDidUpdate() {
        //setState 更新时执行
    }
    componentDidMount() {
        //组件第一次render时执行
        /**
         * 监控哈希值
         * 遍历出需要的组件
         * **/
        this.firstEntry();
        let _this= this;
        window.onhashchange=function(){
            var hash = window.location.hash;
            _this.hash(hash)
        }
    }
    firstEntry = ()=>{
        var hash = window.location.hash;
        this.hash(hash)
    };
    hash(hash){
        let _this= this;
        for(let i = 0,idx = _this.tabarr.length;i<idx;i++){
            if(_this.tabarr[i].href===hash){
                _this.setState({
                    rou:_this.tabarr[i].page
                });
                return ;
            }
        }
    }
    /**
     * 管理组件
     * 通过hash值切换组件状态
     * **/
    tabarr=[
        {name:"管理员管理",href:"#gly",  icon:"icon-guanli1",       page:0,tem:<A />},
        {name:"  用户管理",href:"#hy",   icon:"icon-yonghuguanli",  page:1,tem:<B />},
        {name:"  设备管理",href:"#sb",   icon:"icon-shezhi",        page:2,tem:<C />},
        {name:"  账单管理",href:"#zd",   icon:"icon-zhangdan",      page:3,tem:<D />},
        {name:"  地图管理",href:"#dt",   icon:"icon-ditu",          page:4,tem:<E />},
        {name:"  审核管理",href:"#sh",   icon:"icon-yonghu",        page:5,tem:<F />},
        {name:"  信息管理",href:"#xx",   icon:"icon-guanli",        page:6,tem:<G />}
        ];
    render() {
        return (
            <div className={"home"}>
                <header>
                    <div className={"userImg"}><img src="" alt=""/></div>
                    <span>管理员系统</span>
                    <div className={"user"}>
                        <i className={"iconfont icon-guanli1"}></i>
                        <span>{this.state.audit}</span>
                        <span className={"userName"}>范柳原&nbsp;<Icon style={{"fontSize":"12px"}} type={"caret-down"}/></span>
                        <a className={"quit"} >退出</a>
                    </div>
                </header>
                <nav>
                    <ul>
                        <Tab tabarr={this.tabarr} rou={this.state.rou}/>
                    </ul>
                </nav>
                <div className={"State"}>
                    <Router _router={this.tabarr[this.state.rou]} />
                </div>
            </div>
        )
    }
}

export default app;

/**
 * 标签页的切换根据传入的index来判断高亮状态，
 * index根据hash值来确定
 * */
function Tab( props){
    return props.tabarr.map((item,idx)=> <li key={idx+1} className={props.rou===idx?"s":""}><a href={item.href}> <button> <i className={"iconfont "+ item.icon }></i>  {item.name}</button> </a></li> )
}
/**切换路由跳转的组件，
 * 传入路由对象
 * **/
function Router(props){
    return props._router.tem
}