import React , {Component}from "react";


export default class _app extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={"d_2"}>
                <table>
                    <thead>
                            <tr>
                                <td>时间</td>
                                <td>设备编码</td>
                                <td>代理商</td>
                                <td>区域</td>
                                <td>金额（元）</td>
                                <td>来源</td>
                                <td>状态</td>
                            </tr>
                    </thead>
                    <tbody>
                    <Alis lis={this.props.lis}/>
                    </tbody>
                </table>
            </div>
        )
    }
};
function Alis(props){
    if(props.lis){
        return props.lis.map((res,idx)=> <tr key={idx}><td>{res.time}</td><td>{res.cabMac}</td><td>{res.userName}</td><td>{res.area}</td><td>{res.money}</td><td>{res.source===1?"银行卡":"余额"}</td><td>{res.state===1?"入账":"出账"}</td></tr>)
    }else{
        return (<tr><td>暂无数据</td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td></tr>)
    }
}