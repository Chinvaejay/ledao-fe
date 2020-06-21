import React, {Component} from 'react';
import './index.styl'
import {connect} from "react-redux";
const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
class ContactUs extends Component {
    render() {
        let {baseInfo} = this.props;
        return (
            <div className='ContactUs'>
                <div className="top">
                    联系我们
                </div>
                <div className="bottom">
                    <div className="text">

                        {baseInfo.name}<br />
                        联系人：{baseInfo.boss}<br />
                        手机号码：{baseInfo.phone}<br />
                        微信：{baseInfo.weChat}<br />
                        电子邮箱：{baseInfo.email}<br />
                        联系地址：{baseInfo.address}<br />

                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;
