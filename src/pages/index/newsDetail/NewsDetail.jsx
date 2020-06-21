import React, {Component} from 'react';
import './index.styl'
import Lazy from "../../../components/Lazyload/Lazyload";
import banner2 from "../../../common/images/banner2.png";
import ContactUs from "../../../components/ContactUs/ContactUs";
import {getNewsInfo} from "../../../api";
import {message} from "antd";

class NewsDetail extends Component {
    state = {
      newsInfo: {}
    };
    render() {
        let {newsInfo} = this.state;
        return (
            <div className={'news-detail-box'}>
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
                            {newsInfo.title}
                        </div>
                        <div className="bottom">
                            <div className="top">
                                阅读量：{newsInfo.readCount}
                            </div>
                            <div dangerouslySetInnerHTML={{__html: newsInfo.content}} className="html">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getNewsInfo()
    }
    getNewsInfo = async ()=>{
        let data = await getNewsInfo({
            id: this.props.match.params.newsId
        });
        if(data.code === 200){
            let newsInfo = data.result.newsInfo;
            this.setState({
                newsInfo
            })
        }else {
            message.warning('获取失败')
        }
    }
}

export default NewsDetail;
