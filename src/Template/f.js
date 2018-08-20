import React, {Component} from "react";
import { Radio ,Pagination} from 'antd';
import  axios from "axios";
import  cookie from "react-cookies"
import "../css/f.css"

const RadioGroup = Radio.Group;



class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue:1,//审核状态
            _radio:1,
            settingValue:1,
            State:1,
            state1:[],//实名认证未审核
            state1_2:[],
            state2:[],//金额认证未审核
            state2_2:[],
            PAGE:1,
            page:1,
            numberPage:11,
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
    DataAxios1 = ( n )=>{
        this.Axios({
            state:1,
            type:1,
            numberPage:this.state.numberPage,
            page:n||this.state.page
        },(data)=>{
            this.setState({
                state1:data.data||[]
            });
        })
    };
    DataAxios1_2 = (n)=>{
        this.Axios({
            state:2,
            type:1,
            numberPage:this.state.numberPage,
            page:n||this.state.page
        },(data)=>{
            this.setState({
                state1_2:data.data||[]
            });
        })
    };
    DataAxios2   = (n)=>{
        this.Axios({
            state:1,
            type:2,
            numberPage:this.state.numberPage,
            page:n||this.state.page
        },(data)=>{
            this.setState({
                state2:data.data||[]
            });
        })
    };
    DataAxios2_2 =(n)=>{
        this.Axios({
            state:2,
            type:2,
            numberPage:this.state.numberPage,
            page:n||this.state.page
        },(data)=>{
            this.setState({
                  state2_2:data.data||[]
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
    _radio=(e)=>{
       this.setState({
           _radio:e
       })
    };
    _change1=(page)=>{
        this.DataAxios1(page);
    };
    _change2=(page)=>{
        this.DataAxios1_2(page);
    };
    _change3=(page)=>{
        this.DataAxios2(page);
    };
    _change4=(page)=>{
        this.DataAxios2_2(page);
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
                        <Radio value={1} onClick={this._radio.bind(this,1)}>未审核</Radio>
                        <Radio value={2} onClick={this._radio.bind(this,2)}>以审核</Radio>
                    </RadioGroup>
                </div>
                <div className={"tab1 tab"} style={this.state.radioValue===1?{"display":"block"}:{"display":"none"}}>
                    <CheckState state1={this.state.state1}  state2={this.state.state2} settingValue={this.state.settingValue} updateCertState={this.updateCertState}/>
                </div>
                <div className={"tab2 tab"} style={this.state.radioValue===1?{"display":"none"}:{"display":"block"}}>
                    <MoneyState state1={this.state.state1_2}  state2={this.state.state2_2} settingValue={this.state.settingValue}/>
                </div>
                <br/>
                <br/>
                <PAgination
                    settingValue={this.state.settingValue}
                    _radio={this.state._radio}
                    v1={this.state.state1}
                    v2={this.state.state1_2}
                    v3={this.state.state2}
                    v4={this.state.state2_2}
                    _onclick1={this._change1}
                    _onclick2={this._change2}
                    _onclick3={this._change3}
                    _onclick4={this._change4}
                />
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
                        props.state1.data?props.state1.data.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.card}</td><td>{item.bank}</td><td>{item.address}</td><td><button onClick={props.updateCertState.bind(this,2,1,item.certId)}>通过</button><button onClick={props.updateCertState.bind(this,3,1,item.certId)}>不通过</button></td></tr>)):null
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
                    <td>设备ID</td>
                    <td>店名</td>
                    <td>金额</td>
                    <td>理由</td>
                    <td>操作</td>
                </tr >
                </thead>
                <tbody>
                {
                    props.state2?props.state2.data.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.mac}</td><td>{item.name}</td><td>{item.checkMoney}</td><td>{item.reason}</td><td><button onClick={props.updateCertState.bind(this,2,2,item.certId)}>通过</button><button onClick={props.updateCertState.bind(this,3,2,item.certId)}>不通过</button></td></tr>)):null
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
                    props.state1.data?props.state1.data.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.card}</td><td>{item.bank}</td><td>{item.address}</td><td>{item.auditingTime}</td><td>{item.checkState===2?"审核通过":item.checkState===3?"不通过":"不通过"}</td><td>{item.examineName}</td></tr>)):null
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
                    <td>设备ID</td>
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
                    props.state2.data?props.state2.data.map((item,idx)=>(<tr key={idx}><td>{item.userName}</td><td>{item.mac}</td><td>{item.name}</td><td>{item.checkMoney}</td><td>{item.reason}</td><td>{item.auditingTime}</td><td>{item.moneyState===2?"审核通过":item.moneyState===3?"不通过":"不通过"}</td><td>{item.examineName}</td></tr>)):null
                }
                </tbody>
            </table>
        )
    }
}
function PAgination (props){
    if(props.settingValue===1&&props._radio===1)  return <Pagination hideOnSinglePage={true} total={props.v1.totalItems} defaultPageSize={11}  onChange={props._onclick1}/>;
    if(props.settingValue===1&&props._radio===2)  return <Pagination hideOnSinglePage={true} total={props.v2.totalItems} defaultPageSize={11}  onChange={props._onclick2}/>;
    if(props.settingValue===2&&props._radio===1)  return <Pagination hideOnSinglePage={true} total={props.v3.totalItems} defaultPageSize={11}  onChange={props._onclick3}/>;
    if(props.settingValue===2&&props._radio===2)  return <Pagination hideOnSinglePage={true} total={props.v4.totalItems} defaultPageSize={11}  onChange={props._onclick4}/>;
    return null;
}