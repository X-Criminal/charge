import React, {Component} from "react";

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
            deleis:true
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
        console.log(a);
    };
    /**删除后触发**/
    deleAdmin(a,b){

    }

    render() {
        return (
            <div className={"a"}>
                   <h3>管理员管理</h3>
                   <A1 loading={this.state.loading} enterLoading={this.enterLoading}/>
                   <A2 pagination={this.pagination} deleAdmin={this.deleAdmin}/>
                   <DeleAdmin deleis={this.deleis}/>
            </div>
        )

    }
}
export  default app;

   function DeleAdmin(props){
       console.log(props.deleis);
       if(props.deleis){
            return (
                <div className={"dele"}>

                </div>
            )
        }else{
            return null;
        }

    }