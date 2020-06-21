import React, {Component} from 'react';
import './index.styl'
import TitleItem from "../../../components/TitleItem/TitleItem";
import Lazy from "../../../components/Lazyload/Lazyload";
import {getEgList} from "../../../api";
import {message} from "antd";

class Eg extends Component {
    state = {
        egList: [],
    };
    render() {
        let {egList} = this.state;
        return (
            <div className='mobile-eg-box'>
                <TitleItem style={{transform: 'scale(.7)'}} zh={'客户案例'} />
                <ul>
                    {
                        egList.map(eg =>{
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
            </div>
        );
    }
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
}

export default Eg;
