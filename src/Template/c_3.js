import React, {Component} from "react";
import { Input } from 'antd';

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
                                <td>充电槽</td>
                                <td>电量（%）</td>
                                <td>状态</td>
                                <td>操作</td>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>16</td>
                                    <td>有</td>
                                    <td>不可借</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Cdit />
                </div>
            </div>
        )
    }
}

export default app;
function Cdit(props){
          return (
              <div className={"cdit"}>
                  <h3>
                      商家详情
                  </h3>
                  <p><span>店铺名称</span>      <Input placeholder="" /></p>
                  <p><span>店铺图片</span>      <div><img src="" alt=""/></div></p>
                  <p><span>人均消费(元)</span>  <Input placeholder="" /></p>
                  <p><span>人均消费(元)</span>  <Input placeholder="" /></p>
                  <p><button>编辑</button>      <Input placeholder="" /></p>
              </div>
          )
}