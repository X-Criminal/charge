import React, {Component} from "react";
import {Select,Input,Button} from "antd";
/*import { Map, Marker } from 'react-amap';*/
/*import axios from "axios";*/
import fetch from "fetch-jsonp";
import "../css/e.css";
import img from "../img/icon.png";


const Option = Select.Option;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCenter:[],
            lis:[],
            a:"",
            b:"",
            ak:"rKlbEA1ZkvBIr6xIYunVstavD2y7K7fZ",
        }
    }

    componentWillUnmount() {
        //组件被移除时执行

    }

    componentDidUpdate() {

        //setState 更新时执行

    }
    BMap=null;
    map=null;
    componentDidMount() {
        this.BMap= window.BMap;
        //组件第一次render时执行
        this.AxiosPositin(  )
    };

    mapInit(lon,lat){
        this.map = new this.BMap.Map("allmap"); // 创建Map实例
        var mapStyle={  style : "googlelite" };
        this.map.setMapStyle(mapStyle);
        this.map.centerAndZoom(new this.BMap.Point(lon, lat), 12); // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }
    AxiosPositin(address,title,cb){
        let _this= this;
        address=address||"";title=title||"";
        fetch('http://api.map.baidu.com/geodata/v3/poi/list?ak=MPpwM1lbwbnE21Q35UwQsvyxZyA8WsKs&geotable_id=193017&page_size=200&retrieval='+address+"&title="+title)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                // 在此处进行接收数据之后的操作
            if(json.status===0){
                let data = json.pois;
                if(data){
                    _this.mapInit(data[0].location[0],json.pois[0].location[1]);
                    for(let i = 0,idx = data.length;i<idx;i++){
                        let point = new _this.BMap.Point(data[i].location[0],data[i].location[1]);
                        _this.addMarker(point,data[i]);
                    }
                }else{
                    alert("暂无数据");
                }
            }else{
                alert("地图获取失败")
            }
            cb&&cb()
        }).catch(function(ex) {
            console.log('parsing failed', ex) // 此处是数据请求失败后的处理
        })
    }
    addMarker(point,data){  // 创建图标对象
        let _this =this;
        let myIcon = new this.BMap.Icon(img, new this.BMap.Size(28, 28), {
            anchor: new this.BMap.Size(14, 28),
          /*imageOffset: new this.BMap.Size(0,0)*/// 设置图片偏移
        });
        // 创建标注对象并添加到地图
        let marker = new this.BMap.Marker(point, {icon: myIcon});
        let opts={
            width:100,
            height:50,
            title:data.title
        };
        let infoWindow = new this.BMap.InfoWindow("地址："+data.province+data.city+data.district+data.address,opts);
        this.map.addOverlay(marker);
        marker.addEventListener("click",function(){
            _this.map.openInfoWindow(infoWindow,point)
        });
    }
    onenter = (address,title,cb)=> {
        this.AxiosPositin(address,title,cb);
    };
    render() {
        return (
            <div className={"e"}>
                <E2 allpca={this.props.allpca} onenter={this.onenter}/>
                <div className={"eMap"} style={{width: "100%", height: "80%"}}>
                    <div id={"allmap"} style={{width:"100%",height:"100%"}}>

                    </div>
                </div>
            </div>
        )
    }
}

export default app;

class E2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            city: {dom: [], arr: []},
            district: [],
            txta: "",
            txtb: "",
            txtc: "",
            loading:false,
            keyWOrd:""
        };
        this.keyword= this.keyword.bind(this);
        this.enterLoading = this.enterLoading.bind(this)
    }
    componentDidMount() {
        //组件第一次render时执行
        this.setState({
            province: this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
        });
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
    keyword(e){
        this.setState({
            keyWOrd:e.target.value,
        })
    }
    enterLoading(){
        let _this = this;
        this.setState({
            loading:true,
        });
        this.props.onenter(this.state.txta+this.state.txtb+this.state.txtc,this.state.keyWOrd,function(){
            _this.setState({
                loading:false,
            });
        });
    }
    render(){
        return(
            <div>
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