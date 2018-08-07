import React, {Component} from "react";
import {Select, Input, Button, Cascader,Upload, Icon, message} from "antd";
import cookie from "react-cookies"
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
                start:"",
            longitude:"",
             latitude:"",
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

    componentWillMount(){
        this.setState({
            province: this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
            adminId:cookie.load("user").data.adminId,
            role:cookie.load("user").data.role,
        });
    }
    componentDidMount() {
        //组件第一次render时执行
        this.queryAdminList()
    }
    queryAdminList(cb){
        axios({
            url:this.props.httpUrl+"/charge/web/device/queryEquipmentList",
            method:"post",
            data:{
                adminId:this.state.adminId,
                role:this.state.role,
                area:this.state.txta+this.state.txtb+this.state.txtc,
                keyWord:this.state.keyword,
                page:this.state.page,
                numberPage:11
            }
        }).then((res)=>{
            if(res.data.code===1000){
                this.props.paginationData({
                    adminId:this.state.adminId,
                    role:this.state.role,
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
            this.onPosition(res.data.data)
        });
    };

    onPosition(shopId){
        let _this= this;
        let url="http://api.map.baidu.com/geodata/v4/poi/create";
        let formData = new FormData();
        formData.append("ak","MPpwM1lbwbnE21Q35UwQsvyxZyA8WsKs");
        formData.append("geotable_id",1000004359);
        formData.append("title",this.state.name);
        formData.append("address",this.state.address);
        formData.append("latitude",this.state.latitude);
        formData.append("longitude",this.state.longitude);
        formData.append("coord_type",1);
        formData.append("shopId",shopId);

        fetch(url,{
            method:'post',
            body:formData,
        }).then((res)=>{
            return res.json( );
        }).then((json)=>{
            console.log(json);
        })

       /* let data ={
            title:this.state.name,
            address:this.state.address,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            coord_type:1,
            geotable_id:"1000004354",
            ak:"rKlbEA1ZkvBIr6xIYunVstavD2y7K7fZ"
        };*/
    }

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
    Onclick =(e)=>{
        if(e.target){
            this.setState({
                [e.target.name]:e.target.value
            });
        }else{
            let txt="";
            for(let j =0;j<e.length;j++){
                txt+=e[j]
            }
            this.setState({
                area:txt
            })
        }
    };
    upimg=(data)=>{
        if(data.code===1000){
            this.setState({
                img:data.data,
            })
        }else{
            console.log(1);
            alert(data.message)
        }
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
                             Onclick={this.Onclick}
                             upimg={this.upimg}
                             options={this.props.options}
                     />
            </div>
        )
    }
}

export default app;

function AddEuipment(props) {

    if (props.addis) {
        return (
            <div className={"addBox addBox_C1"}>
                <div>
                    <h3>添加设备<i onClick={props.close}> </i></h3>
                    <div className={"input"}>
                        <p><span>设备编码</span> <Input  onChange={props.Onclick}  name={"mac"} type="text"/></p>
                        <p><span>店铺名称</span> <Input  onChange={props.Onclick}  name={"name"} type="text"/></p>
                        <div className={"up_img"}><span>店铺图片</span><Avatar upimg={props.upimg}/></div>
                        <p>大小不超过10M，格式：bpm,png,jpeg.建议尺寸在270*270以上.</p>
                        <p><span>营业事件</span>  <span><Input name={"start"} onChange={props.Onclick} placeholder={"开始时间"}/> <Icon type="lock-circle-o"/></span><span><Input onChange={props.Onclick} name={"end"} placeholder={"结束时间"}/>  <Icon type="lock-circle-o" style={{ fontSize: 16, color: '#08c' }} /></span></p>
                        <p><span>人均消费</span>  <Input  onChange={props.Onclick}  name={"pay"} type="text"/></p>
                        <p><span>地址</span>      <Cascader name={"area"} options={props.options} onChange={props.Onclick} placeholder={"省-市-区"} changeOnSelect/></p>
                        <p><span>详细地址</span>  <Input  onChange={props.Onclick}  name={"address"} type="text"/></p>
                        <p><span>经纬度</span>    <Input  name={"longitude"} onChange={props.Onclick} placeholder={"经度"} type="text"/> <Input onChange={props.Onclick} name={"latitude"} placeholder={"纬度"} type="text"/></p>
                    </div>
                    <div className={"addBtn"}>
                        <Button onClick={props.close}>取消</Button>
                        <Button style={{"marginLeft": "10px"}} type="primary" loading={props.addLoading}
                                onClick={props.AddenterLoading}>
                            提交
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'||"image/png"||"image/bpm";
    if (!isJPG) {
        message.error('该图片格式不正确!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('该图片大于10M!');
    }
    return isJPG && isLt2M;
}

class Avatar extends React.Component {
    state = {
        loading: false,
    };

    handleChange = (info) => {
        if(info.file.response){
            this.props.upimg(info.file.response)
        }
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">选择图片</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://www.cbkj888.com/charge/web/user/addPicture"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}

