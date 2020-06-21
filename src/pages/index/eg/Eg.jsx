import React, {Component} from 'react';
import {message, Modal} from 'antd'
import './index.styl'
import ContactUs from "../../../components/ContactUs/ContactUs";
import eg1 from './../../../common/images/eg4.jpg'
import Lazy from "../../../components/Lazyload/Lazyload";
import banner2 from "../../../common/images/banner2.png";
import {getEgList} from "../../../api";

class Eg extends Component {
    state = {
        egList: [],
        visible: false,
        currentImgUrl: eg1,
        currentTitle: '案例1'
    };
    render() {
        let {egList, visible, currentImgUrl, currentTitle} = this.state;
        return (
            <div className='eg-box'>
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
                            客户案例
                        </div>
                        <div className="bottom">
                            <ul>
                                {
                                    egList.map(eg =>{
                                        return <li key={eg.title}>
                                            <div onClick={() => this.showBigImg(eg.url, eg.title)}>
                                                <Lazy className="img" src={eg.url}/>
                                                <div className="tip">
                                                    {eg.title}
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
        this.getEgList()
    }

    getEgList = async ()=>{
        let data = await getEgList();
        if(data.code === 200){
            let {egList} = data.result;
            egList.forEach(item =>{
                item.key = item.id;
            });
            this.setState({
                egList
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

export default Eg;
