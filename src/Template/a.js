import React, {Component} from "react";
import axios from "axios"
import "../img/fontImage/iconfont.css"

import A1 from "./a_1"
import A2 from "./a_2"

import "../css/a.css"


class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            current:1,
            DataLis:[],
            totalItems:0,
            page:1,
            pagination:{
                total:500,
            },
            deleis:false,
            pageData:{}
        };
        this.enterLoading = this.enterLoading.bind(this);
        this.paginationData = this.paginationData.bind(this);
        this.deleAdmin = this.deleAdmin.bind(this);
        this.onDel = this.onDel.bind(this)
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


    /**获取数据后的回调**/
    enterLoading(res){
        let data = res.data.data;
        this.setState({
            DataLis:data,
            totalItems:res.data.totalItems
        })
    }
    /**获取查询条件进行分页查询**/
    paginationData(obj){
        this.setState({
           pageData:obj
       })
    }
    /**分页时触发*/
    pagination = ( a )=>{
       let data = this.state.pageData;
       data.page=a;
        this.pageAxios(data)
    };
    pageAxios(data){
        axios({
            url:this.props.httpUrl+"/charge/web/admin/queryAdminList",
            method:"post",
            data:data
        }).then((res)=>{
            this.enterLoading(res)
        })
    }
    delid = "";
    idx="";
    /**删除后触发**/
    deleAdmin(a,idx){
        this.delid=a;
        this.idx=idx;
        this.setState({
            deleis:!this.state.deleis,
        })
    };
    /**取消删除**/
    dele_box = ()=>{
        this.setState({
            deleis:!this.state.deleis,
        })
    };
    /**确定删除**/
    onDel(){
        var _this = this;
        this.onDelAxios(function(){
            _this.setState({
                DataLis:_this.dellarr(_this.state.DataLis,_this.idx)
            })
        })
    }
    dellarr(arr,idx){
        let a = [];
        for(let i = 0,_idx= arr.length;i<_idx;i++){
            if(i!==idx){
                a.push(arr[i])
            }
        }
        return a;
    }
    onDelAxios(cb){
        axios({
            url:this.props.httpUrl+"/charge/web/admin/delAdmin",
            method:"post",
            params:{
                adminId:this.delid,
            }
        }).then((res)=>{
            alert(res.data.message);
            this.dele_box( );
            if(res.data.code) cb&&cb();
        })
    }

    render() {
        return (
            <div className={"a"}>
                   <h3>管理员管理</h3>
                   <A1 paginationData={this.paginationData} httpUrl={this.props.httpUrl} allpca={this.props.allpca} options={this.props.options} loading={this.state.loading} enterLoading={this.enterLoading}/>
                   <A2 totalItems={this.state.totalItems} DataLis={this.state.DataLis} dataLis={this.dataLis} pagination={this.pagination} deleAdmin={this.deleAdmin}/>
                   <DeleAdmin onDel={this.onDel} dele_box={this.dele_box} deleis={this.state.deleis}/>
            </div>
        )
    }
}
export  default app;

   function DeleAdmin(props){
       if(props.deleis){
            return (
                <div className={"dele"}>
                    <div className={"dele_box"}>
                        <h3>删除</h3>
                        <p>
                            <i className="iconfont icon-wuuiconsuotanhao"></i>
                            <span>此操作将永久删除该条目，是否继续？</span>
                        </p>
                        <div className={"delBtn"}>
                            <button onClick={props.dele_box}>取消</button>
                            <button onClick={props.onDel}>确定</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }