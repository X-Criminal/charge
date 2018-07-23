import React, {Component} from "react";
import { Upload, Icon, message } from 'antd';

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
d               "http://47.98.252.6:80/charge/web/user/addPicture"
                <Avatar />
                <form action="http://47.98.252.6:80/charge/web/user/addPicture" method={"post"}>
                    <input type="file" name={"file"}/>
                    <input type="Submit"/>
                </form>
            </div>
        )

    }
}

export default app;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'||"image/png";
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
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
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
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
