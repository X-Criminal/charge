import React, {Component} from "react";
import { Pagination , Input,Button } from 'antd';
import cookie from "react-cookies"
import axios from "axios"

import "../css/a_2.css"

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Amount:false,
            loading:false,
            shopId:{},
            checkMoney:"",
            reason:"",
        };
    }

    componentWillUnmount() {
        //组件被移除时执行

    }

    componentDidUpdate() {

        //setState 更新时执行

    }

    componentDidMount() {
        //组件第一次render时执行

    };
    deleAdmin=( id,idx )=>{
        this.props.deleAdmin(id,idx)
    };
    setAmount=(shopId)=>{
        this.setState({
            Amount:true,
            shopId:shopId,
        })

    };
    desetAmount=()=>{
        this.setState({
                  Amount:false,
              })
    };
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    onsetAmount=(a)=>{
                this.setState({
                    loading:true,
                });
        axios.post("http://47.98.252.6:80/charge/web/device/addAmount",{shopId:a,checkMoney:this.state.checkMoney,reason:this.state.reason})
        .then((res)=>{
            alert(res.data.message);
            this.setState({
                loading:false,
                Amount:false,
            });
        })
      };

    render() {
        return (
            <div className={"a_2 c_2"}>
                <div className={"table"}>
                    <table>
                        <thead>
                        <tr>
                            <td>设备编码</td>
                            <td>店铺名称</td>
                            <td>区域</td>
                            <td>详细地址</td>
                            {cookie.load("user").data.role===2?<td>状态</td>:null}
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                            <AataLis shopId={this.state.shopId} setAmount={this.setAmount} queryDetails={this.props.queryDetails} deleAdmin={this.deleAdmin} DataLis={this.props.DataLis}/>
                        </tbody>
                    </table>
                </div>
                <div className={"page"}>
                    <span style={{"float":"left","lineHeight":"32px"}}>共{this.props.totalItems}条</span> <Pagination onChange={this.props.pagination}  total={this.props.totalItems} />
                </div>
                <AddAmount onchange={this.onchange} shopId={this.state.shopId} desetAmount={this.desetAmount} onsetAmount={this.onsetAmount} loading={this.state.loading} Amount={this.state.Amount}/>
            </div>
        )
    }
}

export default app;
function AataLis(props){
    return props.DataLis.map((res,idx)=>(<tr key={idx}><td>{res.mac}</td><td>{res.shopName}</td><td>{res.shopArea}</td><td>{res.shopAddress}</td>{cookie.load("user").data.role===2?<td>{res.moneyState===1?"审核中":res.moneyState===2?"审核通过":res.moneyState===3?"不通过":"未审核"}</td>:null}<td>{cookie.load("user").data.role===2?<button onClick={props.setAmount.bind(this,{shopId:res.shopId,mac:res.mac,shopName:res.shopName})}>设置金额</button>:null}<button onClick={props.queryDetails.bind(this,{mac:res.mac,shopId:res.shopId})}>查看</button> <button onClick={props.deleAdmin.bind(this,res.equipmentId,idx)}>删除</button></td></tr>))
}

function AddAmount(props){
    if(props.Amount){
        return (<div className={"AddAmount"}>
                    <div className={"AddAmount_box"}>
                          <h3>设置金额 <i onClick={props.desetAmount}> </i></h3>
                          <div>
                              <span>设备编码</span>
                              <span>{props.shopId.mac}</span>
                          </div>
                          <div>
                                <span>店铺名称</span>
                                <span>{props.shopId.shopName}</span>
                          </div>
                          <div>
                              <span>费用</span>
                              <span><Input onChange={props.onchange} name={"checkMoney"}/>元/小时</span>
                          </div>
                          <div>
                              <span>理由</span>
                               <Input.TextArea onChange={props.onchange} name={"reason"}/>
                        </div>
                          <div>
                              <span> </span>
                              <Button onClick={props.desetAmount}>取消</Button>
                              <Button type="primary" loading={props.loading} onClick={props.onsetAmount.bind(this,props.shopId.shopId)}>
                                  确定
                              </Button>
                          </div>
                    </div>
                </div>)
    }else{
        return null;
    }
}
