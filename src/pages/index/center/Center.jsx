import React, {Component} from 'react';
import './index.styl'
import {message, Modal} from 'antd'
import ContactUs from "../../../components/ContactUs/ContactUs";
import zhibiao from "../../../common/images/zhibiao.jpg";
import Lazy from "../../../components/Lazyload/Lazyload";
import banner2 from "../../../common/images/banner2.png";
import {getCenterList} from "../../../api";

class Center extends Component {
    state = {
        centerList: [],
        visible: false,
        currentImgUrl: zhibiao,
        currentTitle: '新能源指标延期'
    };
    render() {
        let {centerList, currentImgUrl, currentTitle, visible} = this.state;
        return (
            <div className='car-center-box'>
                <Modal
                    title={`查看大图（${currentTitle}）`}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Lazy className="img" src={currentImgUrl} style={{width: '100%'}}/>
                </Modal>
                <div className="top">
                    <Lazy className="img" src={banner2}/>
                </div>
                {/*内容*/}
                <div className="content">
                    <div className="left">
                        <ContactUs />
                    </div>
                    <div className="right">
                        <div className="top">
                            车务中心
                        </div>
                        <div className="bottom">
                            <ul>
                                {
                                    centerList.map(center =>{
                                        return <li key={center.title}>
                                            <div onClick={() => this.showBigImg(center.url, center.title)}>
                                                <Lazy className="img" src={center.url}/>
                                                <div className="tip">
                                                    {center.title}
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        this.getCenterList()
    }

    getCenterList = async ()=>{
        let data = await getCenterList();
        if(data.code === 200){
            let {centerList} = data.result;
            centerList.forEach(item =>{
                item.key = item.id;
            });
            this.setState({
                centerList
            })
        }else {
            message.warning('获取失败')
        }
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    showBigImg = (url, title) =>{
        this.setState({
            currentImgUrl: url,
            visible: true,
            currentTitle: title
        })
    }
}

export default Center;
