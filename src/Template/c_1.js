import React, {Component} from "react";
import {Select, Input, Button, Cascader} from "antd";
import FileBase64 from 'react-file-base64';
import axios from "axios"

import "../css/c_1.css"

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
            bimg:"",
                address:"",
                adminId:"",
                area:"",
                end:"",
                img:"",
                mac:"",
                name:"",
                pay:"",
                start:""
        };

        this._addOnchange=this._addOnchange.bind(this)
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
            province: this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)
        });
        this.queryAdminList()
    }
    queryAdminList(cb){
        axios({
            url:this.props.httpUrl+"/charge/web/device/queryEquipmentList",
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
    /**添加设备**/
    AddenterLoading = () => {
        axios({
            url:this.props.httpUrl+"/charge/web/device/addDevice",
            method:"post",
            data:{
                address:this.state.address,
                adminId:this.state.adminId,
                area:this.state.area,
                end:this.state.end,
                img:this.state.img,
                mac:this.state.mac,
                name:this.state.name,
                pay:this.state.pay,
                start:this.state.start,
            }
        }).then((res)=>{
            this.setState({
                account:"",
                area:"",
                password:"",
                userName:"",
                addis:false,
            });
            alert(res.data.message);
            this.queryAdminList();
        })
    };
    close = ()=>{
        this.setState({
            addis:false
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
    imabase64=(img,type)=>{
        this.setState({
            bimg:img,
            img:img.replace(/^data:image\/(png|jpg|bpm);base64,/, "")
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
                <AddEuipment _addOnchange={this._addOnchange}
                             addis={this.state.addis}
                             bimg={this.state.bimg}
                             addLoading={this.state.addLoading}
                             AddenterLoading={this.AddenterLoading}
                             close={this.close}
                             options={this.props.options}
                             imabase64={this.imabase64}/>
            </div>
        )
    }
}

export default app;

function AddEuipment(props) {
    let getFiles=(files)=>{
        if(files.type==="image/png"||files.type==="image/jpeg"||files.type==="image/bpm"){
            if(files.file.size/1024/1024<10){
                        props.imabase64(files.base64,files.type)
                }else{
                    alert("图片过大，请重新上传！")
                }
        }else{
            alert("图片格式不正确！")
        }
    };

    if (props.addis) {
        return (
            <div className={"addBox addBox_C1"}>
                <div>
                    <h3>添加设备<i onClick={props.close}> </i></h3>
                    <div className={"input"}>
                        <p><span>设备编码</span> <Input name={"userName"} type="text"/></p>
                        <p><span>店铺名称</span> <Input name={"account"} type="text"/></p>
                        <div className={"up_img"}><span>店铺图片</span> <div style={{"backgroundImage":"url("+props.bimg+")"}}><FileBase64  multiple={ false } onDone={getFiles.bind(this) }/></div></div>
                        <p>大小不超过10M，格式：bpm,png,jpeg.建议尺寸在270*270以上.</p>
                        <p><span>营业事件</span> <Input placeholder={"开始时间"} type="text"/> <Input placeholder={"结束时间"} type="text"/></p>
                        <p><span>人均消费</span> <Input name={"account"} type="text"/></p>
                        <p><span>地址</span> <Cascader options={props.options} placeholder={"省-市-区"} changeOnSelect/></p>
                        <p><span>详细地址</span> <Input name={"account"} type="text"/></p>
                        <p><span>经纬度</span> <Input placeholder={"经度"} type="text"/> <Input placeholder={"纬度"} type="text"/></p>
                    </div>
                    <div className={"addBtn"}>
                        <Button onClick={props.close}>取消</Button>
                        <Button style={{"marginLeft": "10px"}} type="primary" loading={props.addLoading}
                                onClick={props.AddenterLoading}>
                            搜索
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

