import React, {Component} from 'react';
import ContactUs from "../../../components/ContactUs/ContactUs";
import './index.styl'
import banner2 from "../../../common/images/banner2.png";
import Lazy from "../../../components/Lazyload/Lazyload";
import {getNewEnergy} from "../../../api";
import {message} from "antd";

class NewEnergy extends Component {
    state = {
      title: '',
        content: ''
    };
    render() {
        let {title, content} = this.state;
        return (
            <div className="new-energy-box">
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
                            新能源指标延期
                        </div>
                        <div dangerouslySetInnerHTML={{__html: content}} className="bottom">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getNewEnergy()
    }

    getNewEnergy = async ()=>{
        const data = await getNewEnergy();
        if(data.code === 200){
            let newEnergy = data.result.newEnergy;
            let { title = '', content = ''}= newEnergy;
            this.setState({
                title,
                content
            })
        }else {
            message.warning('获取失败')
        }
    };
}

export default NewEnergy;
