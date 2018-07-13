import React, {Component} from "react";


import "../css/a.css";

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

    }

    render() {
        return (
            <div className={"a b b_3"}>
                <h3>用户管理>订单管理</h3>
                <p><span>账户:15834569087</span><span>昵称:小明</span> </p>
                <div className={"a_2 b_2"}>
                    <div className={"table"}>
                        <table>
                            <thead>
                            <tr>
                                <td>时间</td>
                                <td>地点</td>
                                <td>订单号</td>
                                <td>状态</td>
                                <td>支付金额</td>
                                <td>租借时间</td>
                                <td>退款金额</td>
                                <td>消费金额</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2018-06-08 12:34:56</td>
                                <td>15467891234</td>
                                <td>123456</td>
                                <td>租借中</td>
                                <td>99</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default app;