import React, {Component} from "react";
import { Radio } from 'antd';
import  axios from "axios";
import  cookie from "react-cookies"
import "../css/f.css"

const RadioGroup = Radio.Group;



class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue:1,//审核状态
            settingValue:1,
            state1:[],//实名认证未审核
            state1_2:[],
            state2:[],//金额认证未审核
            state2_2:[],
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
        this.DataAxios1();
        this.DataAxios1_2( );
        this.DataAxios2( );
        this.DataAxios2_2( );
    }
/**审核列表**/
    DataAxios1 = ()=>{
        this.Axios({
            state:1,
            type:1,
        },(data)=>{
            this.setState({
                state1:data.data.data
            });
        })
    };
    DataAxios1_2   = ()=>{
        this.Axios({
            state:2,
            type:1,
        },(data)=>{
            this.setState({
                state1_2:data.data.data
            });
        })
    };
    DataAxios2   = ()=>{
        this.Axios({
            state:1,
            type:2,
        },(data)=>{
            this.setState({
                state2:data.data.data
            });
        })
    };
    DataAxios2_2 =()=>{
        this.Axios({
            state:2,
            type:2,
        },(data)=>{
              this.setState({
                  state2_2:data.data.data
              });
        })
    };
    Axios(data,cb){
        axios({
            url:this.props.httpUrl+"/charge/web/examine/queryExamineList",
            method:"post",
            data:data
        }).then((res)=>{
            cb&&cb(res)
        })
    };

/**修改审核状态**/
    updateCertState=(a,b,c)=>{
        let _this = this;
    let adminId = cookie.load("user").data.adminId;
    this.updateCertStateAxios({
        adminId:adminId,
        certId:c,
        state:a,
        type:b,
    },function(data){
       alert(data.data.message);
        _this.DataAxios1();
        _this.DataAxios1_2();
        _this.DataAxios2();
        _this.DataAxios2_2();
    })
};
    updateCertStateAxios(data,cb){
        axios({
            url:this.props.httpUrl+"/charge/web/admin/updateCertState",
            method:"post",
            data:data
        }).then((res)=>{
            cb&&cb(res)
        })
    }


    radio_onChange = (e) => {
        this.setState({
            radioValue: e.target.value,
        });
    };
    setting(e){
        this.setState({
            settingValue:e
        })
    };
    render() {
        return (
            <div className={"f"}>
                <div className={"f_ss"}>
                    <div className={this.state.settingValue===1?"s":""} onClick={this.setting.bind(this,1)}>实名认证</div>
                    <div className={this.state.settingValue===2?"s":""} onClick={this.setting.bind(this,2)}>设置审核</div>
                </div>
                <div className={"_radio"}>
                    <RadioGroup onChange={this.radio_onChange} defaultValue={1}>
                        <Radio value={1}>未审核</Radio>
                        <Radio value={2}>以审核</Radio>
                    </RadioGroup>
                </div>
                <div className={"tab1 tab"} style={this.state.radioValue===1?{"display":"block"}:{"display":"none"}}>
                    <CheckState state1={this.state.state1}  state2={this.state.state2} settingValue={this.state.settingValue} updateCertState={this.updateCertState}/>
                </div>
                <div className={"tab2 tab"} style={this.state.radioValue===1?{"display":"none"}:{"display":"block"}}>
                    <MoneyState state1={this.state.state1_2}  state2={this.state.state2_2} settingValue={this.state.settingValue}/>
                </div>
            </div>
        )
    }
}

export default app;

function CheckState( props ){
    if(props.settingValue===1){
        return (
            <table>
                <thead>
                <tr >
                    <td>被审核人</td>
                    <td>身份证</td>
                    <td>银行卡号</td>
                    <td>详细地址</td>
                    <td>操作</td>
                </tr >
                </thead>
                <tbody>
                    {
                        props.state1.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.card}</td><td>{item.bank}</td><td>{item.address}</td><td><button onClick={props.updateCertState.bind(this,2,1,item.certId)}>通过</button><button onClick={props.updateCertState.bind(this,3,1,item.certId)}>不通过</button></td></tr>))
                    }
                </tbody>
            </table>
        )
    }else{
        return (
            <table>
                <thead>
                <tr >
                    <td>被审核人</td>
                    <td>店名</td>
                    <td>金额</td>
                    <td>理由</td>
                    <td>操作</td>
                </tr >
                </thead>
                <tbody>
                {
                    props.state2.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.name}</td><td>{item.checkMoney}</td><td>{item.reason}</td><td><button onClick={props.updateCertState.bind(this,2,2,item.certId)}>通过</button><button onClick={props.updateCertState.bind(this,3,2,item.certId)}>不通过</button></td></tr>))
                }
                </tbody>
            </table>
        )

    }
}
function MoneyState( props ){
    if(props.settingValue===1){
        return(
            <table>
                <thead>
                    <tr >
                        <td>被审核人</td>
                        <td>身份证</td>
                        <td>银行卡号</td>
                        <td>详细地址</td>
                        <td>审核时间</td>
                        <td>审核结果</td>
                        <td>审核人</td>
                    </tr >
                </thead>
                <tbody>
                {
                    props.state1.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.card}</td><td>{item.bank}</td><td>{item.address}</td><td>{item.auditingTime}</td><td>{item.checkState===2?"审核通过":item.checkState===3?"不通过":"不通过"}</td><td>{item.examineName}</td></tr>))
                }
                </tbody>
            </table>
        )
    }else{
        return(
            <table>
                <thead>
                <tr >
                    <td>被审核人</td>
                    <td>店名</td>
                    <td>金额</td>
                    <td>理由</td>
                    <td>审核时间</td>
                    <td>审核结果</td>
                    <td>审核人</td>
                </tr >
                </thead>
                <tbody>
                {
                    props.state2.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.shopName}</td><td>{item.checkMoney}</td><td>{item.reason}</td><td>{item.auditingTime}</td><td>{item.moneyState===2?"审核通过":item.moneyState===3?"不通过":"不通过"}</td><td>{item.examineName}</td></tr>))
                }
                </tbody>
            </table>
        )

    }
}