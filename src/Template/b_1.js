import React, {Component} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {Select, Input, Button} from "antd";

const Option = Select.Option;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            city: {dom: [], arr: []},
            txta: "",
            district: [],
            txtb: "",
            txtc: "",
            loading: false,
            addLoading: false,
            keyword: "",
            page:1,
            account:"",
            area:"",
            password:"",
            userName:"",
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
        this._queryAdminList()
    }

    _queryAdminList(cb){
        axios({
            url:this.props.httpUrl+"/charge/web/user/queryUserList",
            method:"post",
            data:{
                area:this.state.txta+this.state.txtb+this.state.txtc,
                keyWord:this.state.keyword,
                page:this.state.page,
                numberPage:11,
                adminId:cookie.load("user").data.adminId,
                role:cookie.load("user").data.role
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
        })
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
    AddenterLoading = () => {
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
            });
            console.log(1);
            alert(res.data.message);
            this.queryAdminList();
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
            </div>
        )
    }
}

export default app;