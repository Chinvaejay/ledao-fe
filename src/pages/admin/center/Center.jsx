import React, {Component} from 'react';
import {Tabs, Input, message,Button,Table, Modal} from 'antd';
import {uploadFile, addCenter, delCenter, getCenterList} from "../../../api";
import config from './../../../config'
import moment from "moment";

const {TabPane} = Tabs;
const {confirm} = Modal;

class Center extends Component {
    state = {
        title: '',
        url: '',
        centerList: []
    };

    render() {
        let {title, url, centerList} = this.state;
        return (
            <div>
                <Tabs type="card">
                    <TabPane tab="车务中心列表" key="1">
                        <Table columns={
                            [
                                { title: 'id',width: 100, dataIndex: 'id', key: 'id', },
                                { title: '服务标题',width: 100, dataIndex: 'title', key: 'title',},
                                { title: '图片地址',width: 100, dataIndex: 'url', key: 'url', render: text => <a
                                        href={text} target="_blank">
                                        <img src={text} style={{width: '100%', height: '10rem', objectFit: 'cover'}} alt=""/>
                                    </a> },
                                { title: '创建时间',width: 100, dataIndex: 'createdAt', key: 'createdAt', render: text =>{
                                        return <span>{
                                            moment(text).format('YYYY-MM-DD HH:mm:ss')
                                        }</span>
                                    } },
                                {
                                    title: '操作',
                                    dataIndex: '',
                                    width: 100,
                                    key: 'x',
                                    render: (text, record, index) => {
                                        return <span>
                                            <Button onClick={()=>this.delCenter(text, record, index)} type="danger" size="small">删除</Button>
                                        </span>
                                    },
                                },
                            ]
                        } dataSource={
                            centerList
                        } />
                    </TabPane>
                    <TabPane tab="添加服务" key="2">
                        <ul className={'ul'}>
                            <li>
                                <div className="left">服务标题：</div>
                                <div className="right">
                                    <Input onChange={e => this.valueChange(e, 'title')} placeholder="请输入服务标题"
                                           value={title}/>
                                </div>
                            </li>
                            <li>
                                <div className="left">上传图片：</div>
                                <div className="right">
                                    <div className="img">
                                        {
                                            !url ? <svg t="1576988501256" className="icon" viewBox="0 0 1024 1024"
                                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1813"
                                                        width="200" height="200">
                                                    <path
                                                        d="M878.592 176.896H162.96a110.096 110.096 0 0 0-110.096 110.096v495.424a110.112 110.112 0 0 0 110.096 110.112h715.632c60.8 0 110.096-49.296 110.096-110.112V286.992c0-60.8-49.296-110.096-110.096-110.096z m55.072 605.52c0 10.096-2.928 19.44-7.664 27.584 0 0-9.552 16.352 0 0l-75.76 0.384-152.368-165.248-0.208 0.368a40.96 40.96 0 0 0-55.088-2.32l-0.416-0.384-120.912 112.368-145.792-176.96a41.056 41.056 0 0 0-67.376-1.888l-0.592-0.496L112.72 804.736c8.576 19.264 0 0 0 0-3.04-6.832-4.8-14.336-4.8-22.32V286.992a55.04 55.04 0 0 1 55.04-55.04h715.632a55.072 55.072 0 0 1 55.056 55.04v495.424z"
                                                        p-id="1814" fill="#8a8a8a"></path>
                                                    <path
                                                        d="M725.616 369.632c-68.832 6.512-68.08 68.944-68.08 68.992-0.688 70.416 68.08 68.928 68.08 68.928 76.784-1.488 70.288-68.928 70.288-68.928-0.016-69.696-70.288-68.992-70.288-68.992z"
                                                        p-id="1815" fill="#8a8a8a"></path>
                                                </svg> :
                                                <img src={url} alt=""/>
                                        }
                                        <input type="file" onChange={e => this.selectFile(e)}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="left"/>
                                <div className="right">
                                    <Button onClick={() => this.addCenter()} type="primary">添加服务</Button>
                                </div>
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        this.getCenterList();
    }
    delCenter = async (text, record, index)=>{
        confirm({
            title: '删除服务?',
            content: `确认删除此服务吗？`,
            onOk: async () =>{
                let data = await delCenter({
                    id: text.id
                });
                if(data.code === 200){
                    message.success(data.data);
                    let {centerList} = this.state;
                    centerList.splice(index, 1);
                    this.setState({
                        centerList
                    })
                }else {
                    message.warning(data.data)
                }
            },
        });
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
    addCenter = async ()=>{
        let {title, url} = this.state;
        let adminId = config.getCache('adminId');
        if(!title){
            return message.warning('标题不能为空')
        }
        if(title.length > 20){
            return message.warning('标题字数不得大于20字')
        }
        if(!url){
            return message.warning('请上传图片')
        }
        let data = await addCenter({
            title, url, adminId
        });
        if(data.code === 200){
            this.getCenterList();
            message.success(data.data);
            this.setState({
                title: '',
                url: '',
            })
        }else {
            message.warning(data.data)
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
                url: res.result.url
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
}

export default Center;
