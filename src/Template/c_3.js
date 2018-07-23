import React, {Component} from "react";
import { Input,Button,Cascader,message,Icon,Upload} from 'antd';

import "../css/a.css";

class app extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:"",
            area:"",
            end:"",
            img:"",
            name:"",
            shopId:"",
            start:""
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

    upimg=(data)=>{
        if(data.code===1000){
            this.setState({
                img:data.data,
            })
        }else{
            alert(data.message)
        }
    };
    dataLis=(e )=>{
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
    onlick=(e)=>{
        let data ={
            address:this.state.address,
            area:this.state.area,
            end:this.state.end,
            img:this.state.img,
            name:this.state.name,
            shopId:this.props.onshopId,
            start:this.state.start,
        };
        this.props.onedit(data);
    };
    render() {
        return (
            <div className={"a b b_3"} style={this.props.ishowC3?{top:"0"}:{top:""}}>
                <h3><span onClick={this.props.hidDeta}>设备管理</span>>设备详情</h3>
                <p><span>设备编码:{this.props.c3Data.mac}</span><span>详细地址:{this.props.c3Data.area+this.props.c3Data.address}</span> </p>
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
                                <Lis />
                            </tbody>
                        </table>
                    </div>
                    <Cdit onlick={this.onlick} dataLis={this.dataLis} c3Data={this.props.c3Data} isCdit={this.props.isCdit} edit={this.props.edit} rerF={this.props.rerF} options={this.props.options} upimg={this.upimg}/>
                </div>
            </div>
        )
    }
}

export default app;
function Cdit(props){
    if(props.isCdit){
                return (
                    <div key={1} className={"cdit cditone"}>
                        <h4>
                            商家详情
                        </h4>
                        <div><span>店铺名称</span>      <Input value={props.c3Data.name} readOnly={"readonly"} /></div>
                        <div><span>店铺图片</span>      <div><img style={{width:"100%"}} src={"http://47.98.252.6:80/"+props.c3Data.img} alt=""/></div></div>
                        <div><span>营业时间</span>      <Input readOnly={"readonly"} value={props.c3Data.start+"~"+props.c3Data.end} /></div>
                        <div><span>人均消费(元)</span>  <Input readOnly={"readonly"} value={props.c3Data.pay} /></div>
                        <div><span>详细地址</span>      <Input className={"address"} readOnly={"readonly"} value={""+props.c3Data.area+props.c3Data.address}/></div>
                        <div><span> </span> <Button type="primary" onClick={props.edit}>编辑</Button></div>
                    </div>
                )
            }else{
                return(
                    <div key={2} className={"cdit cdittwo"}>
                        <h4>
                            商家详情
                        </h4>
                        <div><span>店铺名称</span>                           <Input name={"name"}   onChange={props.dataLis} placeholder={props.c3Data.name}/></div>
                        <div id={"imgup"}><span>店铺图片</span>              <Avatar   upimg={props.upimg}/></div>
                        <div className={"date"}><span>营业时间</span>        <Input name={"start"}   onChange={props.dataLis} placeholder={props.c3Data.start}/> <Input name={"end"} onChange={props.dataLis} placeholder={props.c3Data.end}/></div>
                        <div><span>人均消费(元)</span>                       <Input name={"pay"}   onChange={props.dataLis} placeholder={props.c3Data.pay}/></div>
                        <div className={"addr"}><span>详细地址</span>        <Cascader onChange={props.dataLis} name={"area"} options={props.options} placeholder={props.c3Data.area} changeOnSelect/></div>
                        <div><span> </span>                                  <Input name={"address"}   onChange={props.dataLis} placeholder={props.c3Data.address}/></div>
                        <div><span></span> <Button onClick={props.rerF}>取消 </Button> <Button type="primary" onClick={props.onlick.bind(this,props.c3Data.shopId)}>确定</Button></div>
                    </div>
                )
            }

}

function Lis(props){
    return(
        <tr>
            <td>1</td>
            <td>16</td>
            <td>有</td>
            <td>不可借</td>
        </tr>
    )
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
                action="http://47.98.252.6:80/charge/web/user/addPicture"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}