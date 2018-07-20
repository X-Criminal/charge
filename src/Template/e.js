import React, {Component} from "react";
import { Map, Marker } from 'react-amap';


class app extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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




    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <Map amapkey={"2ee7cdb1cc01246fee998a056662cf6b"} >
                    <Marker position={{longitude: 121, latitude: 34 }} >

                    </Marker>
                </Map>
            </div>
        )

    }
}

export default app;