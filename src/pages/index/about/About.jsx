import React, {Component} from 'react';
import './index.styl'
import {message, Modal} from 'antd'
import ContactUs from "../../../components/ContactUs/ContactUs";
import eg1 from "../../../common/images/eg1.jpg";
import Lazy from "../../../components/Lazyload/Lazyload";

import banner2 from '../../../common/images/banner2.png'
import {connect} from "react-redux";
import {getAboutList} from "../../../api";

const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
class About extends Component {
    state = {
      aboutList: [],
        visible: false,
        currentImgUrl: eg1,
        currentTitle: '案例1'
    };
    getAboutList = async ()=>{
        let data = await getAboutList();
        if(data.code === 200){
            let {aboutList} = data.result;
            aboutList.forEach(item =>{
                item.key = item.id;
            });
            this.setState({
                aboutList
            })
        }else {
            message.warning('获取失败')
        }
    };
    componentDidMount() {
        this.getAboutList()
    }

    render() {
        let {baseInfo} = this.props;
        let {aboutList, currentImgUrl, currentTitle, visible} = this.state;
        return (
            <div className='about-box'>
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
                            关于我们
                        </div>
                        <div className="bottom" >
                            <ul>
                                {
                                    aboutList.map(eg =>{
                                        return <li key={eg.title}>
                                            <div onClick={() => this.showBigImg(eg.url, eg.title)}>
                                                <Lazy className="img" src={eg.url} />
                                                <div className="tip">
                                                    {eg.title}
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                            <div dangerouslySetInnerHTML={{__html: baseInfo.info}} style={{width: '100%',whiteSpace:'pre-line'}}>

                            </div>
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

export default About;
