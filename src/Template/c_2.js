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
                        <tr>
                            <td>mobao145</td>
                            <td>披萨店</td>
                            <td>广东省深圳市</td>
                            <td>广东省深圳市西乡街道</td>
                            <td><button>查看</button>   <button  onClick={this.props.deleAdmin.bind(this,"abc")}>删除</button></td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className={"page"}>
                   <span style={{"float":"left","lineHeight":"32px"}}>共220条</span> <Pagination onChange={this.props.pagination} defaultCurrent={1} total={50} />
                </div>
            </div>
        )
    }
}

export default app;
