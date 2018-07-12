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
            <div className={"a_2 b_2"}>
                <div className={"table"}>
                    <table>
                        <thead>
                        <tr>
                            <td>用户头像</td>
                            <td>账号</td>
                            <td>密码</td>
                            <td>区域</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div><img src="" alt=""/></div></td>
                            <td>15527543183</td>
                            <td>123456</td>
                            <td>广东省深圳市</td>
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
