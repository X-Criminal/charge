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
            <div className={"a b b_3"} style={this.props.quserBox?{"top":0}:{"top":"100%"}}>
                <h3><span onClick={this.props.close}>用户管理</span>>订单管理</h3>
                <p><span>{this.props.usernum}</span><span>昵称:{this.props.username}</span> </p>
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
                          {
                            this.props._b3Data.map((res,idx)=> <tr key={idx}><td>{res.startTime}</td><td>{res.address}</td><td>{res.orderNumber}</td><td>{res.state===2?"租借中":"已归还"}</td><td>{res.money}</td><td>{res.startTime}</td><td>{res.refund}</td><td>{res.monetary}</td></tr> )
                          }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default app;