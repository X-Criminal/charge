import React, {Component} from "react";
import {Select,Input,Button} from "antd";
import { Map, Marker } from 'react-amap';
import {transform,BD09,WGS84} from "gcoord"
import axios from "axios";
import "../css/e.css"
const Option = Select.Option;

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCenter:[],
            lis:[],
            a:"",
            b:"",
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
        this.setState({
            mapCenter:this.randomPosition( )
        });
        axios.get("http://api.map.baidu.com/geodata/v3/poi/list?coord_type=1&geotable_id=192618&ak=rKlbEA1ZkvBIr6xIYunVstavD2y7K7fZ")
            .then((res)=>{
                console.log(res.data.pois[0].location);
                let gcoord=transform(
                    res.data.pois[0].location,
                    BD09,
                    WGS84
                );
                console.log(res);
                if(res.status===200){
                   this.setState({
                       lis: res.data.pois.map((_res,idx)=><Marker key={idx} position={{"longitude":_res.gcj_location[0],"latitude":_res.gcj_location[1]}}> <img style={{zIndex:998}} src={require('../img/equipment_ed.png')} /></Marker>)
                   })
                }else{
                    alert(res.data.message)
                }

            })
    }

    randomPosition = () => ({
        longitude: 113.87202,
        latitude: 22.57786 ,
    });
    render() {
        return (
            <div className={"e"}>
                <E2 allpca={this.props.allpca}/>
                <div className={"eMap"} style={{width: "100%", height: "80%"}}>
                    <Map amapkey={"2ee7cdb1cc01246fee998a056662cf6b"} center={this.state.mapCenter}>
                        {this.state.lis}
                    </Map>
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

        }
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