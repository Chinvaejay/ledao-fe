import React, {Component} from 'react';
import './index.styl'
import TitleItem from "../../../components/TitleItem/TitleItem";
import Lazy from "../../../components/Lazyload/Lazyload";
import {getAboutList} from "../../../api";
import {connect} from "react-redux";
import {message} from "antd";

const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
class About extends Component {
    state = {
        aboutList: [],
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
        let {aboutList} = this.state;
        let {baseInfo} = this.props;
        return (
            <div className="mobile-about-box">
                <TitleItem style={{transform: 'scale(.7)'}} zh={'关于我们'} />
                <ul>
                    {
                        aboutList.map(eg =>{
                            return <li key={eg.title}>
                                <div>
                                    <Lazy className="img" src={eg.url} />
                                    <div className="tip">
                                        {eg.title}
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
                <div dangerouslySetInnerHTML={{__html: baseInfo.info}} style={{width: '100%', padding: '2rem', whiteSpace:'pre-line'}}>

                </div>
            </div>
        );
    }
}

export default About;
