import React, {Component} from "react";

import axios from "axios"

import {Select, Input, Button, Cascader} from "antd";

const Option = Select.Option;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            city: {dom: [], arr: []},
            district: [],
            txta: "",
            txtb: "",
            txtc: "",
            loading: false,
            addLoading: false,
            keyword: "",
            addis: false,
            page:1,
                account:"",
                area:"",
                password:"",
                userName:"",
            err:null
        };

        this._addOnchange=this._addOnchange.bind(this);
        this.keyword = this.keyword.bind(this);
    }

    componentWillUnmount() {
        //组件被移除时执行

    }

    componentDidUpdate() {
        //setState 更新时执行
    
    }

    componentDidMount() {
        //组件第一次render时执行
        this.setState({
            province: this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
        });
        this.queryAdminList()
    }
    queryAdminList(cb){
        axios({
            url:this.props.httpUrl+"/charge/web/admin/queryAdminList",
            method:"post",
            data:{
                area:this.state.txta+this.state.txtb+this.state.txtc,
                keyWord:this.state.keyword,
                page:this.state.page,
                numberPage:11
            }
        }).then((res)=>{
            if(res.data.code===1000){
                this.props.paginationData({
                    area:this.state.txta+this.state.txtb+this.state.txtc,
                    keyWord:this.state.keyword,
                    numberPage:11,
                    page:1,
                });
                this.props.enterLoading(res)
            }else if(res.data.code===3001||res.data.code===1002){
                alert(res.data.message)
            }
            cb&&cb( )
        })
    }

    handleChange1 = (value) => {
           let arr = [];
           for (let i = 0, idx = this.props.allpca.length; i < idx; i++) {
               if (this.props.allpca[i].name === value) {
                   arr = this.props.allpca[i]["sub"];
                   this.setState({
                       city: {
                           dom: arr.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
                           arr: arr,
                       },
                       txta: value,
                       txtb: "",
                       txtc: "",
                   });
                   return;
               }
           }
           if(!value){
               this.setState({
                   txta:""
               })
           }
    };
    handleChange2 = (value) => {
            for (let i = 0, idx = this.state.city.arr.length; i < idx; i++) {
                if (this.state.city.arr[i].name === value) {
                    this.setState({
                        district: this.state.city.arr[i].sub.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
                        txtb: value,
                    });
                    return;
                }
            }
        if(!value){
            this.setState({
                txtb:""
            })
        }
    };
    handleChange3 = (value) => {
            this.setState({
                txtc: value,
            });
        if(!value){
            this.setState({
                txtc:""
            })
        }
    };

    keyword(e) {
        this.setState({
            keyword: e.target.value,
        })
    }
    /**搜索按钮**/
    enterLoading = () => {
        this.setState({loading: true});
        this.queryAdminList( ()=>{
            this.setState({loading: false});
        })
    };
    isAdd=false;
    _Isadd=false;
    AddenterLoading = () => {
         this.isAdd = true;
         if(this.state.account.length<=0||this.state.area.length<=0||this.state.password.length<=0||this.state.userName.length<=0||!this._Isadd){
             this.isAdd = false;
             this.setState({
                 err:this.state.err||"资料请填写完成！"
             })
         }
        if(this.isAdd){
            axios({
                url:this.props.httpUrl+"/charge/web/admin/addAdmin",
                method:"post",
                data:{
                    account:this.state.account,
                    area:this.state.area,
                    password:this.state.password,
                    userName:this.state.userName,
                }
            }).then((res)=>{
                this.setState({
                    account:"",
                    area:"",
                    password:"",
                    userName:"",
                    addis:false,
                    err:""
                });
                alert(res.data.message);
                this.queryAdminList();
            })
        }
    };
    close = ()=>{
        this.setState({
            addis:false,
            err:""
        })
    };
    add=()=>{
         this.setState({
             addis:true
         })
    };
    _addOnchange( e ){
       if(!e.length){
           this.setState({
               [e.target.name]:e.target.value,
           });
       }else{
           let area="";
           for(let i = 0;i<e.length;i++){
               area += e[i]
           }
           this.setState({
               area:area
           })
       }
    }
    _checkAdmin(admin,cb){
        axios.get(this.props.httpUrl+"/charge/web/admin/checkAdmin?account="+admin)
            .then((res)=>{
                if(res.data.code!==3001){
                    cb&&cb(res.data)
                }else{
                    this._Isadd=true
                }
            })
    }
    _onBlur=(e)=>{
       this._checkAdmin(e.target.value,(err)=>{
           this.setState({
               err:err.message
           });
       })
    };
    _onFocus=()=>{
        this.setState({
            err:null
        })
    };
    render() {
        return (
            <div className={"Region"}>
                <span style={{"fontSize": "12px"}}> 地区 </span>
                <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    placeholder="省"
                    optionFilterProp="children"
                    onChange={this.handleChange1}
                    allowClear={true}
                    name={"sheng"}
                >
                    {this.state.province}
                </Select>
                <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    placeholder="市"
                    optionFilterProp="children"
                    onChange={this.handleChange2}
                    allowClear={true}
                >
                    {this.state.city.dom}
                </Select>
                <Select
                    showSearch
                    style={{width: 110, marginLeft: 10}}
                    placeholder="区"
                    optionFilterProp="children"
                    onChange={this.handleChange3}
                    allowClear={true}
                >
                    {this.state.district}
                </Select>
                <span style={{"marginLeft": "10px", "fontSize": "12px"}}> 搜索</span>
                <Input placeholder="输入搜索关键字" onChange={this.keyword} className={"Search"}/>
                <Button style={{"marginLeft": "10px"}} type="primary" loading={this.state.loading}
                        onClick={this.enterLoading}>
                    搜索
                </Button>
                <Button className={"add"} onClick={this.add} type="primary">添加</Button>
                <Add _addOnchange={this._addOnchange}
                     addis={this.state.addis}
                     addLoading={this.state.addLoading}
                     AddenterLoading={this.AddenterLoading}
                     close={this.close}
                     err={this.state.err}
                     options={this.props.options}
                     _onFocus={this._onFocus}
                     _onBlur={this._onBlur}/>
            </div>
        )
    }
}

export default app;

function Add(props) {
    if (props.addis) {
        return (
            <div className={"addBox"}>
                <div>
                    <h3>添加管理员 <i onClick={props.close}> </i></h3>
                    <div className={"input"}>
                        <p><span>用户</span> <Input name={"userName"} type="text" onChange={props._addOnchange}/></p>
                        <p><span>账号</span> <Input name={"account"} type="text" onFocus={props._onFocus} onBlur={props._onBlur}  onChange={props._addOnchange}/></p>
                        <p><span>密码</span> <Input name={"password"} type="text" onChange={props._addOnchange}/></p>
                        <p><span>地区</span> <Cascader name={"area"} options={props.options} onChange={props._addOnchange} placeholder={""}
                                                     changeOnSelect/></p>
                        <p className={"err"}>{props.err}</p>
                    </div>
                    <div className={"addBtn"}>
                        <Button onClick={props.close}>取消</Button>
                        <Button style={{"marginLeft": "10px"}} type="primary" loading={props.addLoading}
                                onClick={props.AddenterLoading}>
                            添加
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}
