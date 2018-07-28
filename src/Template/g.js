import React, {Component} from "react";
import { Radio } from 'antd';
import cookie from "react-cookies"
import axios from "axios"
import "../css/g.css"

const RadioGroup = Radio.Group;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:1
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

    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
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
                    <Table value={this.state.value}/>
                </div>
            </div>
        )

    }
}

export default app;
class Table extends Component{
    constructor(props){
        super(props);
        this.state={
            "a1":[],
            "a2":[],
         adminId:"",
            role:"",
        }
    }

    componentWillMount(){
        this["a1"]=[];
        this["a2"]=[];
        this.adminId=cookie.load("user").data.adminId;
        this.role=cookie.load("user").data.role;
    }

    componentDidMount(){

    }

   Axios = (data,cb)=>{
        axios.post("http://47.98.252.6:80/charge/web/opinion/queryOpinionList",data)
            .then((res)=>{
                if(res.data.code===1000){
                    cb&&cb(res.data.data)
                }else{
                    alert(res.data.message)
                }
            });
    };

   btn=(data)=>{
       let _data={
           adminId:this.adminId,
           certId:data.certId,
           state:data.state,
           type:3,
       };
       axios.post("http://47.98.252.6:80/charge/web/admin/updateCertState",_data)
           .then((res)=>{
                alert(res.data.message)
           });
   };

   render(){
       this.Axios({adminId:this.adminId,
           role:this.role,
           state:this.props.value
       },(data)=>{
           this["a"+this.props.value]=data;
           console.log(this["a" + this.props.value]);
       });
       if(this.props.value===1){
           return (<table className={"table table1"}>
                       <thead>
                           <tr>
                               <td>时间</td>
                               <td>反馈人</td>
                               <td>描述</td>
                               <td>图片</td>
                               <td>操作</td>
                           </tr>
                       </thead>
                       <tbody>
                          {
                              this.state["a1"].map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.describe}</td><td><div className={"img"}><img src={"http://47.98.252.6:80/"+res.img} alt=""/> </div></td><td><button onClick={this.btn.bind(this,{"certId":res.certId,"state":2})}>通过</button><button onClick={this.btn.bind(this,{"certId":res.certId,"state":3})}>不通过</button></td></tr>)
                          }
                       </tbody>
                  </table>)
       }else if(this.props.value===2){
           return (<table className={"table table2"}>
                       <thead>
                           <tr>
                               <td>时间</td>
                               <td>反馈人</td>
                               <td>描述</td>
                               <td>审核时间</td>
                               <td>审核状态</td>
                               <td>审核人</td>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               {
                                   this.state["a1"].map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.describe}</td><td>{res.auditingTime}</td><td>{res.state===1?"待审核":res.state===2?"不通过":res.state===3?"通过":"待审核"}</td><td>{res.userName}</td></tr>)
                               }
                           </tr>
                       </tbody>
           </table>)
       }
   }
}