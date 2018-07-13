import React, {Component} from "react";
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
                <Button className={"add"} onClick={this.add} type="primary">添加账号</Button>
                <Add addis={this.state.addis} addLoading={this.state.addLoading}
                     AddenterLoading={this.AddenterLoading} close={this.close} options={this.props.options}/>
            </div>
        )
    }
}

export default app;

function Add(props) {
    function onChange(value) {
        console.log(value);
    }
    if (props.addis) {
        return (
            <div className={"addBox"}>
                <div>
                    <h3>添加用户 <i onClick={props.close}> </i></h3>
                    <div className={"input"}>
                        <p><span>用户</span> <Input name={"userName"} type="text"/></p>
                        <p><span>账号</span> <Input name={"account"} type="text"/></p>
                        <p><span>密码</span> <Input name={"password"} type="text"/></p>
                        <p><span>地区</span> <Cascader options={props.options} onChange={onChange} placeholder={""}
                                                     changeOnSelect/></p>
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
