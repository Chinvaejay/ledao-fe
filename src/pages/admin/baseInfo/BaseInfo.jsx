import React, {Component} from 'react';
import {getBaseInfo, saveBaseInfo, uploadFile} from "../../../api";
import {Button, Divider, Input, message} from 'antd';
import {check_email, check_phone} from "../../../common/js/FabLabFun";
import config from "../../../config";

const { TextArea } = Input;

class BaseInfo extends Component {
    state = {
        name: '',
        boss: '',
        email: '',
        phone: '',
        info: '',
        qrCode: '',
        weChat: '',
        address: '',
        id: undefined,
    };
    render() {
        let {name, address, boss, email, info, phone, qrCode, weChat} = this.state;
        return (
            <div>
                <Divider orientation="left">公司基本信息</Divider>
                <ul className="ul">
                    <li>
                        <div className="left">公司名：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'name')} placeholder="请输入公司名"
                                   value={name}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">联系人：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'boss')} placeholder="请输入公司联系人"
                                   value={boss}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">手机号：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'phone')} placeholder="请输入公司联系人手机号"
                                   value={phone}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">微信：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'weChat')} placeholder="请输入公司联系人微信"
                                   value={weChat}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">微信二维码：</div>
                        <div className="right">
                            <div className="img qrCode">
                                {
                                    !qrCode ? <svg t="1576988501256" className="icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1813"
                                                width="200" height="200">
                                            <path
                                                d="M878.592 176.896H162.96a110.096 110.096 0 0 0-110.096 110.096v495.424a110.112 110.112 0 0 0 110.096 110.112h715.632c60.8 0 110.096-49.296 110.096-110.112V286.992c0-60.8-49.296-110.096-110.096-110.096z m55.072 605.52c0 10.096-2.928 19.44-7.664 27.584 0 0-9.552 16.352 0 0l-75.76 0.384-152.368-165.248-0.208 0.368a40.96 40.96 0 0 0-55.088-2.32l-0.416-0.384-120.912 112.368-145.792-176.96a41.056 41.056 0 0 0-67.376-1.888l-0.592-0.496L112.72 804.736c8.576 19.264 0 0 0 0-3.04-6.832-4.8-14.336-4.8-22.32V286.992a55.04 55.04 0 0 1 55.04-55.04h715.632a55.072 55.072 0 0 1 55.056 55.04v495.424z"
                                                p-id="1814" fill="#8a8a8a"></path>
                                            <path
                                                d="M725.616 369.632c-68.832 6.512-68.08 68.944-68.08 68.992-0.688 70.416 68.08 68.928 68.08 68.928 76.784-1.488 70.288-68.928 70.288-68.928-0.016-69.696-70.288-68.992-70.288-68.992z"
                                                p-id="1815" fill="#8a8a8a"></path>
                                        </svg> :
                                        <img src={qrCode} alt=""/>
                                }
                                <input type="file" onChange={e => this.selectFile(e)}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="left">电子邮箱：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'email')} placeholder="请输入电子邮箱"
                                   value={email}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">联系地址：</div>
                        <div className="right">
                            <Input onChange={e => this.valueChange(e, 'address')} placeholder="请输入公司联系地址"
                                   value={address}/>
                        </div>
                    </li>
                    <li>
                        <div className="left">公司介绍：</div>
                        <div className="right">
                            <TextArea onChange={e => this.valueChange(e, 'info')} placeholder="请输入公司介绍"
                                      value={info} rows={4} />
                        </div>
                    </li>
                    <li>
                        <div className="left"/>
                        <div className="right">
                            <Button onClick={() => this.saveBaseInfo()} type="primary">保存公司信息</Button>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
    componentDidMount() {
        this.getBaseInfo();
    }
    getBaseInfo = async ()=>{
        let data = await getBaseInfo();
        if(data.code === 200){
            let baseInfo = data.result.baseInfo;
            let { name = '', boss = '', email = '', phone = '', info = '', qrCode = '', weChat = '', address = '', id = 0,}= baseInfo;
            this.setState({
                name, boss, email, phone, info, qrCode, weChat, address, id,})
        }else {
            message.warning('获取失败')
        }
    };
    selectFile = async (e)=>{
        let file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            return message.warning('您上传的文件：' + file.name + '格式不是png/jpg/jpeg/gif格式！请重新选择！');
        }
        if (file.size > 2097152 * 10) {
            return message.warning('您上传的文件：' + file.name + '大小超过20M！请重新选择！');
        }
        let formData = new FormData();
        formData.append('file', file);
        let res = await uploadFile(formData);
        if(res.code === 200){
            this.setState({
                qrCode: res.result.url
            })
        }else {
            message.warning('上传失败')
        }
    };
    valueChange = (e, key) =>{
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    };

    saveBaseInfo = async ()=>{
        let {name, boss, email, phone, info, qrCode, weChat, address, id} = this.state;
        if(!name){
            return message.warning('请输入公司名')
        }
        if(name.length > 20){
            return message.warning('公司名长度不得大于20')
        }
        if(!boss){
            return message.warning('请输入公司联系人')
        }
        if(name.length > 20){
            return message.warning('公司联系人名长度不得大于20')
        }
        if(!check_phone(phone)){
            return message.warning('手机号格式错误')
        }
        if(!weChat){
            return message.warning('请输入公司联系人微信')
        }
        if(weChat.length > 20){
            return message.warning('微信长度不得大于20')
        }
        if(!qrCode){
            return message.warning('请上传微信二维码')
        }
        if(!check_email(email)){
            return message.warning('邮箱格式错误')
        }
        if(!address){
            return message.warning('请输入公司联系地址')
        }
        if(address.length > 200){
            return message.warning('公司联系地址长度不得大于200')
        }
        if(!info){
            return message.warning('请输入公司介绍')
        }
        if(info.length > 500){
            return message.warning('公司介绍长度不得大于500')
        }
        let adminId = config.getCache('adminId');
        let data = await saveBaseInfo({
            name, boss, email, phone, info, qrCode, weChat, address, id, adminId
        });
        if(data.code === 200){
            message.success(data.data);
        }else {
            message.warning(data.data)
        }
    };

}

export default BaseInfo;
