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
           state:"",
        }
    }
    componentWillMount(){
        this.setState({
            adminId:cookie.load("user").data.adminId,
            role:cookie.load("user").data.role,
            state:this.props.value,
        })
    }
    componentDidMount(){
        this.Axios({adminId:this.state.adminId,
                        role:this.state.role,
                       state:this.state.state
                    },(data)=>{
                        this.state({
                            ["a"+this.props.value]:data
                        })
        })
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

   render(){
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
                          {/* <tr>
                               <td>2018-09-08 12:33</td>
                               <td>小明</td>
                               <td>归还还在扣费</td>
                               <td><div className={"img"}><img src="../img/add.png" alt=""/></div></td>
                               <td><button>通过</button><button>不通过</button></td>
                           </tr>*/
                              this.state["a1"].map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.describe}</td><td><div className={"img"}><img src={"http://47.98.252.6:80/"+res.img} alt=""/> </div></td><td><button>通过</button><button>不通过</button></td></tr>)
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
                               {/* <td>2018-09-08 12:33</td>
                               <td>小明</td>
                               <td>归还还在扣费</td>
                               <td>2018:09:08</td>
                               <td>通过</td>
                               <td>小明</td>*/
                                   this.state["a1"].map((res,idx)=><tr key={idx}><td>{res.submitTime}</td><td>{res.name}</td><td>{res.describe}</td><td>{res.auditingTime}</td><td>{res.state===1?"待审核":res.state===2?"不通过":res.state===3?"通过":"待审核"}</td><td>{res.userName}</td></tr>)
                               }
                           </tr>
                       </tbody>
           </table>)
       }
   }
}