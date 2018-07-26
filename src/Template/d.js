import React, {Component} from "react";
import axios from "axios";
import {Pagination } from "antd";
import D1 from "./d_1"
import D2 from "./d_2"
import "../css/d.css"

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:{},
            lis:[],
            totalItems:0,
            totalPages:0,
        }
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
    onAxios=( data )=>{
        this.setState({
            loading:true,
            data:data,
        });
        this.emAxios(data)
    };
    emAxios=(data)=>{
        axios.post(this.props.httpUrl+"/charge/web/bill/queryBillList",data)
            .then((res)=>{
                this.setState({
                    loading:false,
                });
                if(res.data.code===1000){
                    this.setState({
                        lis:res.data.data,
                        totalItems:res.data.totalItems,
                        totalPages:res.data.totalPages,
                    })
                }else{
                    alert(res.data.message);
                }
            })
    };
    pagechange=( page )=>{
        let data = this.state.data;
            data.page=page;
            this.emAxios(data)
    };

    render() {
        return (
            <div className={"d"}>
                 <h3> 账单管理</h3>
                 <D1 loading={this.state.loading} onAxios={this.onAxios} allpca={this.props.allpca}/>
                 <D2 lis={this.state.lis}/>
                <br/>
                <br/>
                <div>
                  <span className={"totalItems"}>共&nbsp;{this.state.totalItems}&nbsp;条</span>&nbsp;&nbsp;<Pagination onChange={this.pagechange} className={"totalItems"} defaultCurrent={1} pageSize={11} total={this.state.totalItems} />
                </div>
            </div>
        )

    }
}

export default app;