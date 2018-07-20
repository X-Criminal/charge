import React, {Component} from "react";
import { Pagination } from 'antd';

import "../css/a_2.css"

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    render() {
        return (
            <div className={"a_2"}>
                <div className={"table"}>
                    <table>
                        <thead>
                            <tr>
                                <td>用户</td>
                                <td>账号</td>
                                <td>密码</td>
                                <td>区域</td>
                                <td>详细地址</td>
                                <td>身份证号</td>
                                <td>银行卡号</td>
                                <td>状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <AataLis deleAdmin={this.deleAdmin} DataLis={this.props.DataLis}/>
                        </tbody>
                    </table>
                </div>
                <div className={"page"}>
                   <span style={{"float":"left","lineHeight":"32px"}}>共{this.props.totalItems}条</span> <Pagination onChange={this.props.pagination}  total={this.props.totalItems} />
                </div>
            </div>
        )
    }
}

export default app;

function AataLis(props){
    return props.DataLis.map((res,idx)=>(<tr key={idx}><td>{res.userName}</td><td>{res.account}</td><td>{res.password}</td><td>{res.area}</td><td>{res.address}</td><td>{res.IDNumber}</td><td>{res.bank}</td><td>{res.checkState===1?"待审核":res.checkState===2?"审核通过":res.checkState===3?"不通过":"未实名"}</td><td><button onClick={props.deleAdmin.bind(this,res.adminId,idx)}>删除</button></td></tr>))
}
