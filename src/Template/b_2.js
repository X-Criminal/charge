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
    User=(idx)=>{
        this.props.querybtn(idx )
    };

    render() {
        return (
            <div className={"a_2 b_2"}>
                <div className={"table"}>
                    <table>
                        <thead>
                        <tr>
                            <td>用户头像</td>
                            <td>账号</td>
                            <td>昵称</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                            <AataLis httpUrl={this.props.httpUrl} User={this.User} deleAdmin={this.deleAdmin} DataLis={this.props.DataLis}/>
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
    return props.DataLis.map((res,idx)=>(<tr key={idx}><td><div><img src={props.httpUrl+"/"+res.headUrl} /></div></td><td>{res.account}</td><td>{res.name}</td><td> <button onClick={props.User.bind(this,{userId:res.userId,usernum:res.account,username:res.name})}>查看</button> <button onClick={props.deleAdmin.bind(this,res.userId,idx)}>删除</button></td></tr>))
}
