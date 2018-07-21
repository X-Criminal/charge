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
            <div className={"a_2 c_2"}>
                <div className={"table"}>
                    <table>
                        <thead>
                        <tr>
                            <td>设备编码</td>
                            <td>店铺名称</td>
                            <td>区域</td>
                            <td>详细地址</td>
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
    return props.DataLis.map((res,idx)=>(<tr key={idx}><td>{res.mac}</td><td>{res.shopName}</td><td>{res.shopArea}</td><td>{res.shopAddress}</td><td><button>查看</button> <button onClick={props.deleAdmin.bind(this,res.equipmentId,idx)}>删除</button></td></tr>))
}
