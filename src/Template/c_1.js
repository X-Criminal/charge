import React, {Component} from "react";
import {Select, Input, Button, Cascader,Upload, Icon, message} from "antd";

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
        };
        this.keyword = this.keyword.bind(this);
    }

    componentWillUnmount() {
        //组件被移除时执行

    }

    componentDidUpdate() {
        //setState 更新时执行
        console.log();
    }

    componentDidMount() {
        //组件第一次render时执行
        this.setState({
            province: this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)
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
    };
    handleChange3 = (value) => {
        this.setState({
            txtc: value,
        })
    };
    keyword(e) {
        this.setState({
            keyword: e.target.value,
        })
    }
    enterLoading = () => {
        this.setState({loading: true});
        this.props.enterLoading("1")
    };
    AddenterLoading = () => {

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
                <Button className={"add"} onClick={this.add} type="primary">添加设备</Button>
                <AddEuipment addis={this.state.addis} addLoading={this.state.addLoading}
                     AddenterLoading={this.AddenterLoading} close={this.close} options={this.props.options}/>
            </div>
        )
    }
}

export default app;

function AddEuipment(props) {
    function onChange(value) {
        console.log(value);
    }
    if (props.addis) {
        return (
            <div className={"addBox addBox_C1"}>
                <div>
                    <h3>添加设备<i onClick={props.close}> </i></h3>
                    <div className={"input"}>
                        <p><span>设备编码</span> <Input name={"userName"} type="text"/></p>
                        <p><span>店铺名称</span> <Input name={"account"} type="text"/></p>
                        <p><span>店铺图片</span> <Avatar /></p>
                        <p>大小不超过10M，格式：bpm,png,jpeg.建议尺寸在270*270以上.</p>
                        <p><span>营业事件</span> <Input placeholder={"开始时间"} type="text"/> <Input placeholder={"结束时间"} type="text"/></p>
                        <p><span>人均消费</span> <Input name={"account"} type="text"/></p>
                        <p><span>地址</span> <Cascader options={props.options} onChange={onChange} placeholder={"省-市-区"} changeOnSelect/></p>
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


class Avatar extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
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
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">请上传图片</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/png'||'image/bpm'||'image/jpeg';
    if (!isJPG) {
        message.error('图片格式不支持!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('请上传小于10MB的图片!');
    }
    return isJPG && isLt2M;
}
