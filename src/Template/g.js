import React, {Component} from "react";
import { Radio,Pagination } from 'antd';
import cookie from "react-cookies"
import axios from "axios"
import "../css/g.css"

const RadioGroup = Radio.Group;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a1:[],
            a2:[],
            value:1,
            numberPage:8,
            page:1
        }
    }

    componentWillMount(){
        this.adminId=cookie.load("user").data.adminId;
        this.role=cookie.load("user").data.role;
    }
    componentWillUnmount() {
        //组件被移除时执行

    }
    componentDidUpdate() {

        //setState 更新时执行

    }
    componentDidMount() {
        //组件第一次render时执行
        this.Axios({adminId:this.adminId,
            role:this.role,
            state:1,
            page:this.state.page,
            numberPage:this.state.numberPage
        },(res)=>{
            this.setState({
                value:1,
                a1:res,
            });
        });
    }
    obj=1;
    onChange = (e) => {
        this.obj=e.target.value;
        this.Axios({
            adminId:this.adminId,
            role:this.role,
            state:e.target.value,
            numberPage:this.state.numberPage,
            page:this.state.page
        },(res)=>{
            this.setState({
                value:e.target.value,
                ["a"+e.target.value]:res,
            });
        });
    };
    Axios = (data,cb)=>{
        axios.post("http://www.cbkj888.com/charge/web/opinion/queryOpinionList",data)
            .then((res)=>{
                if(res.data.code===1000){
                    cb&&cb(res.data)
                }else{
                    if(res.data.code===3001) cb&&cb([]);
                    alert(res.data.message)
                }
            });
    };
    upstate=()=>{
        this.Axios({adminId:this.adminId,
            role:this.role,
            state:1,
            numberPage:this.state.numberPage,
            page:this.state.page
        },(res)=>{
            this.setState({
                a1:res,
            });
        });
    };
    onPage=(page)=>{
        let _this = this;
            this.Axios({adminId:this.adminId,
                role:this.role,
                state:_this.obj,
                numberPage:this.state.numberPage,
                page:page
            },(res)=>{
                this.setState({
                    value:_this.obj,
                    ["a"+_this.obj]:res,
                });
            });
    };
    render() {
        return (
            <div className={"g"}>
                <h3>信息反馈</h3>
                <RadioGroup className={"radio"} onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>未审核</Radio>
                    <Radio value={2}>以审核</Radio>
                </RadioGroup>
                <div className={"box"}>
                    <Table upstate={this.upstate} adminId={this.adminId} value={this.state.value} a1={this.state.a1} a2={this.state.a2}/>
                </div>
                <PAgination a1={this.state.a1} a2={this.state.a2} value={this.obj} onpage={this.onPage}/>
            </div>
        )

    }
}

export default app;

class Table extends Component{
    constructor(props){
        super(props);
        this.state={
            adminId:"",
            role:"",
        }
    }
    componentDidMount(){

    }
    btn=(data)=>{
        let _data={
            adminId:this.props.adminId,
            certId:data.certId,
            state:data.state,
            type:3,
        };
        axios.post("http://www.cbkj888.com/charge/web/admin/updateCertState", _data)
            .then((res) => {
                if(res.data.code===1000){
                    this.props.upstate( )
                }
                alert(res.data.message);
            });
    };

    render(){
        if(this.props.value===1){
            return (<table className={"table table1"}>
                <thead>
                <tr>
                    <td>时间</td>
                    <td>反馈人</td>
                    <td>设备编号</td>
                    <td>描述</td>
                    <td>图片</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.a1.data?this.props.a1.data.map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.mac}</td><td>{res.describe}</td><td><div className={"img"}><img src={"http://www.cbkj888.com/"+res.img} alt=""/> </div></td><td><button onClick={this.btn.bind(this,{"certId":res.certId,"state":2})}>通过</button><button onClick={this.btn.bind(this,{"certId":res.certId,"state":3})}>不通过</button></td></tr>):null
                }
                </tbody>
            </table>)
        }else if(this.props.value===2){
            return (<table className={"table table2"}>
                <thead>
                <tr>
                    <td>时间</td>
                    <td>反馈人</td>
                    <td>设备编号</td>
                    <td>描述</td>
                    <td>审核时间</td>
                    <td>审核状态</td>
                    <td>审核人</td>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.a2.data?this.props.a2.data.map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.mac}</td><td>{res.describe}</td><td>{res.auditingTime}</td><td>{res.state===1?"待审核":res.state===2?"通过":res.state===3?"不通过":"待审核"}</td><td>{res.userName}</td></tr>):null
                    }
                </tbody>
            </table>)
        }
    }
};
function PAgination(props){
    if(props.value===1) return  <Pagination hideOnSinglePage={true} defaultPageSize={8} total={props.a1.totalItems} onChange={props.onpage}/>;
        if(props.value===2) return  <Pagination hideOnSinglePage={true} defaultPageSize={8} total={props.a2.totalItems} onChange={props.onpage}/>;
}