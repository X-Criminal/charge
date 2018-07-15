import React, {Component} from "react";
import { Input,Button  } from 'antd';

import "../css/a.css";

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
                isCdit:false
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
                    <Cdit isCdit={this.state.isCdit}/>
                </div>
            </div>
        )
    }
}

export default app;
function Cdit(props){
            if(props.isCdit){
                return (
                    <div className={"cdit"}>
                        <h4>
                            商家详情
                        </h4>
                        <div><span>店铺名称</span>      <input value={"一点点"} readOnly={"readonly"} placeholder={""}/></div>
                        <div><span>店铺图片</span>      <div><img src="" alt=""/></div></div>
                        <div><span>营业时间</span>      <input readOnly={"readonly"} placeholder={""}/></div>
                        <div><span>人均消费(元)</span>  <input readOnly={"readonly"} placeholder={""}/></div>
                        <div><span>详细地址</span>      <input readOnly={"readonly"} placeholder={""} /></div>
                        <div><span></span> <Button type="primary">编辑</Button></div>
                    </div>
                )
            }else{
                return(
                    <div className={"cdit"}>
                        <h4>
                            商家详情
                        </h4>
                        <div><span>店铺名称</span>      <Input placeholder={""}/></div>
                        <div><span>店铺图片</span>      <div><img src="" alt=""/></div></div>
                        <div><span>营业时间</span>      <Input placeholder={""} /></div>
                        <div><span>人均消费(元)</span>  <Input placeholder={""} /></div>
                        <div><span>详细地址</span>      <Input placeholder={""} /></div>
                        <div><span></span> <Button type="primary">编辑</Button></div>
                    </div>
                )
            }

}