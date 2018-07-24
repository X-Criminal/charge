import React,{Component} from "react";
import cookie from "react-cookies";
import {Select, Button, DatePicker,Input} from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

const Option = Select.Option;

class app extends Component {
  constructor(props){
      super(props);
      this.state={
          txta: "",
          txtb: "",
          txtc: "",
          area:"",
          endTime:"",
          startTime:"",
          adminId:"",
          numberPage:11,
          page:1,
          keyWord:"",
          role:0,
          province:[],
          city: {dom: [], arr: []},
          district: [],
      }
  }
    componentWillUnmount() {
        //组件被移除时执行

    }

    componentDidUpdate() {

        //setState 更新时执行

    }
    componentWillMount(){
      this.setState({
          adminId:cookie.load("user").data.adminId,
          role:cookie.load("user").data.role,
      })
    }
    componentDidMount() {
        //组件第一次render时执行
        this.setState({
            province:this.props.allpca.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>),
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
    ontiem1=(value,dateString)=>{
      this.setState({
          startTime:dateString,
      })
    };
    ontiem2=(value,dateString)=>{
        this.setState({
            endTime:dateString,
        })
    };
    enChange=(e)=>{
        this.setState({
            keyWord:e.target.value,
        })
    };
    enterLoading=()=>{
        this.props.onAxios({
          adminId:this.state.adminId,
          area:this.state.txta+this.state.txtb+this.state.txtc,
          endTime:this.state.endTime,
          keyWord:this.state.keyWord,
          numberPage:this.state.numberPage,
          page:this.state.page,
          role:this.state.role,
          startTime:this.state.startTime
      });
    };

    render(){
      return (
          <div className={"d_1"}>
              <span>地区</span>
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
              &nbsp;
              &nbsp;
              时间查询 &nbsp;
              <DatePicker onChange={this.ontiem1} locale={locale}  placeholder={"开始时间"}  /> &nbsp;
              <DatePicker onChange={this.ontiem2} locale={locale}  placeholder={"结束时间"}  />&nbsp;&nbsp;
              搜索 &nbsp;
              <Input style={{width:150}} onChange={this.enChange} placeholder={"请输入关键字"}  />
              <Button style={{"marginLeft": "10px"}} type="primary" loading={this.props.loading}
                      onClick={this.enterLoading}>
                  搜索
              </Button>
          </div>
      )
    }
};
export default app

