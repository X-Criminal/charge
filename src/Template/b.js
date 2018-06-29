import React, {Component} from "react";


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
            <div className={"app"}>
                    b

            </div>
        )

    }
}

export default app;