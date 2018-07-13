import React, {Component} from "react";
import "../img/fontImage/iconfont.css"

import A1 from "./a_1"
import A2 from "./a_2"

import "../css/a.css"


class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            current:1,
            pagination:{
                total:500,
            },
            deleis:false
        };
        this.enterLoading = this.enterLoading.bind(this);
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


    /**获取数据后的回调**/
    enterLoading(a){

    }
    /**分页时触发*/
    pagination = (a)=>{

    };
    /**删除后触发**/
    deleAdmin=(a,b)=>{
        this.setState({
            deleis:!this.state.deleis,
        })
    };
    /**取消删除**/
    dele_box = ()=>{
        this.setState({
            deleis:!this.state.deleis,
        })
    };
    render() {
        return (
            <div className={"a"}>
                   <h3>管理员管理</h3>
                   <A1 allpca={this.props.allpca} options={this.props.options} loading={this.state.loading} enterLoading={this.enterLoading}/>
                   <A2 pagination={this.pagination} deleAdmin={this.deleAdmin}/>
                   <DeleAdmin dele_box={this.dele_box} deleis={this.state.deleis}/>
            </div>
        )

    }
}
export  default app;

   function DeleAdmin(props){
       if(props.deleis){
            return (
                <div className={"dele"}>
                    <div className={"dele_box"}>
                        <h3>删除</h3>
                        <p>
                            <i className="iconfont icon-wuuiconsuotanhao"></i>
                            <span>此操作将永久删除该条目，是否继续？</span>
                        </p>
                        <div className={"delBtn"}>
                            <button onClick={props.dele_box}>取消</button>
                            <button>确定</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }