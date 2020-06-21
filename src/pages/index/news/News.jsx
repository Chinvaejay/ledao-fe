import React, {Component} from 'react';
import './index.styl'
import Lazy from "../../../components/Lazyload/Lazyload";
import banner2 from "../../../common/images/banner2.png";
import ContactUs from "../../../components/ContactUs/ContactUs";
import {message} from "antd";
import {getNewsList} from "../../../api";
import moment from "moment";

class News extends Component {
    state = {
        newsList: []
    };
    render() {
        let {newsList} = this.state;
        return (
            <div className='news-box'>
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
                            新闻中心
                        </div>
                        <div className="bottom">
                            <ul>
                                {
                                    newsList.map(item =>{
                                        return <li key={item.id} onClick={() =>this.props.history.push(`/i/newsDetail/${item.id}`)}>
                                            <div className="left ellipsis">
                                                {item.title}
                                            </div>
                                            <div className="right">
                                                {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
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

    componentDidMount() {
        this.getNewsList()
    }
    getNewsList = async ()=>{
        let data = await getNewsList();
        if(data.code === 200){
            let {newsList} = data.result;
            newsList.forEach(item =>{
                item.key = item.id;
            });
            this.setState({
                newsList
            })
        }else {
            message.warning('获取失败')
        }
    };
}

export default News;
