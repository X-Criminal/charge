import React, {Component} from "react";
import axios from "axios"
import cookie from "react-cookies"
import "../img/fontImage/iconfont.css"

import C1  from "./c_1.js";
import C2  from "./c_2.js";
import C3  from "./c_3.js"

import "../css/a.css";

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            current:1,
            DataLis:[],
            totalItems:0,
            page:1,
            ishowC3:false,
            deleis:false,
            isCdit:true,
            pageData:{},
            c3Data:[],
            onshopId:"",
            deleAdmin:""
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
        this.setState({
            pageData:data
        });
        this.pageAxios(this.state.pageData)
    };
    pageAxios(data){
        axios({
            url:this.props.httpUrl+"/charge/web/device/queryEquipmentList",
            method:"post",
            data:data
        }).then((res)=>{
            this.enterLoading(res)
        })
    }
    equipmentId = "";
    idx="";
    /**删除后触发**/
    deleAdmin(a,idx,deleAdmin){
        this.equipmentId=a;
        this.idx= idx;
        this.setState({
            deleis:!this.state.deleis,
            deleAdmin:deleAdmin,
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
            _this.ondemap()
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
            url:this.props.httpUrl+"/charge/web/device/delDevice",
            method:"get",
            params:{
                equipmentId:this.equipmentId,
            }
        }).then((res)=>{
            alert(res.data.message);
            this.dele_box( );
            if(res.data.code===1000) cb&&cb();
        })
    }
    ondemap(){
     let data={
         ak:"MPpwM1lbwbnE21Q35UwQsvyxZyA8WsKs",
         geotable_id:"193017",
         title:this.state.deleAdmin
     };
         data=JSON.stringify(data);
        axios({
            url:this.props.httpUrl+"/charge/web/map/addData",
            method:"get",
            params:{"url":"http://api.map.baidu.com/geodata/v3/poi/delete","jsonString":data},
        }).then((res)=>{
            console.log(res);
        })
    }
    /**查看店铺信息**/
    queryDetails=( data )=>{
        this.queryDetailsAxios(data);
        this.setState({
            onshopId:data.shopId
        })
    };
    queryDetailsAxios( data ){
        let _this = this;
        axios.get(this.props.httpUrl+"/charge/web/device/queryShopDetails?shopId="+data.shopId)
            .then((res)=>{
                if(res.data.code===1000){
                    res.data.data.mac=data.mac;
                    _this.setState({
                        ishowC3:true,
                        c3Data:res.data.data,
                        isCdit:true,
                    })
                }else{
                    alert(res.data.message)
                }
            })
    }
    /**关闭店铺信息**/
    hidDeta=()=>{
      this.setState({
          ishowC3:false,
          isCdit:true,
      })
    };
    /**编辑**/
    edit=()=>{
        this.setState({
            isCdit:false,
        })
    };
    rerF=()=>{
        this.setState({
            isCdit:true,
        })
    };
    onedit=(data,cb)=>{
        axios.post(this.props.httpUrl+"/charge/web/device/updateDevice",data)
            .then((res)=>{
               if(res.data.code===1000){
                    let _data={
                       shopId:data.shopId,
                       mac:this.state.c3Data.mac,
                   };
                    this.queryDetailsAxios(_data);
                    cb&&cb()
               }else{
                   alert(res.data.message)
               }
            });
    };
    _queryAdminList=()=>{
        axios({
            url:this.props.httpUrl+"/charge/web/device/queryEquipmentList",
            method:"post",
            data:{
                adminId:cookie.load("user").data.adminId,
                role:cookie.load("user").data.role,
                area:"",
                keyWord:"",
                page:1,
                numberPage:11
            }
        }).then((res)=>{
            if(res.data.code===1000){
                this.enterLoading(res)
            }else if(res.data.code===3001||res.data.code===1002){
                alert(res.data.message)
            }
        })
    }

    render() {
        return (
            <div className={"a c"}>
                    <h3>设备管理</h3>
                    <C1 paginationData={this.paginationData} httpUrl={this.props.httpUrl} allpca={this.props.allpca} options={this.props.options} loading={this.state.loading} enterLoading={this.enterLoading}/>
                    <C2  _queryAdminList={this._queryAdminList} totalItems={this.state.totalItems} DataLis={this.state.DataLis} dataLis={this.dataLis} pagination={this.pagination} deleAdmin={this.deleAdmin} queryDetails={this.queryDetails}/>
                    <DeleAdmin onDel={this.onDel} dele_box={this.dele_box} deleis={this.state.deleis}/>
                    <C3 httpUrl={this.props.httpUrl} enterLoading={this.enterLoading} pageData={this.state.pageData} onedit={this.onedit} ishowC3={this.state.ishowC3} hidDeta={this.hidDeta} c3Data={this.state.c3Data} isCdit={this.state.isCdit} edit={this.edit} rerF={this.rerF} options={this.props.options} onshopId={this.state.onshopId}/>
            </div>
        )
    }
}

export default app;

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


