import React, {Component} from 'react';
import {Button, Input, message, Modal, Table, Tabs} from "antd";
import moment from "moment";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {uploadFile, publishNews, delNews, getNewsList} from "../../../api";
import config from "../../../config";

const {TabPane} = Tabs;
const {confirm} = Modal;

class News extends Component {
    state = {
      newsList: [],
        title: '',
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        visible: false,
        text: ''
    };
    showModal = (text) => {
        this.setState({
            visible: true,
            text
        });
    };

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
    render() {
        let {newsList, editorState, title, visible, text} = this.state;
        const controls = [
            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles',  'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'separator',
            'link', 'separator', 'hr', 'separator',
            'media', 'separator',
            'clear'
        ];
        // 禁止上传video、audio
        const media = {
            uploadFn: this.uploadFile,
            accepts: {
                image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                video: false,
                audio: false
            },
            externals: {
                image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                video: false,
                audio: false,
                embed: false
            }
        };
        return (
            <div>
                <Modal
                    title="新闻内容"
                    visible={visible}
                    width={800}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                </Modal>
                <Tabs type="card">
                    <TabPane tab="新闻" key="1">
                        <Table columns={
                            [
                                { title: 'id',width: 100, dataIndex: 'id', key: 'id', },
                                { title: '标题',width: 100, dataIndex: 'title', key: 'title',},
                                { title: '新闻内容',width: 100, dataIndex: 'content', key: 'content', render: text =>
                                        <Button onClick={()=> this.showModal(text)} type="primary">查看内容</Button>},
                                { title: '阅读次数',width: 100, dataIndex: 'readCount', key: 'readCount',},
                                { title: '发布时间',width: 100, dataIndex: 'createdAt', key: 'createdAt', render: text =>{
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
                                            <Button onClick={()=>this.delNews(text, record, index)} type="danger" size="small">删除</Button>
                                        </span>
                                    },
                                },
                            ]
                        } dataSource={
                            newsList
                        } />
                    </TabPane>
                    <TabPane tab="发布新闻" key="2">
                        <ul className="ul">
                            <li>
                                <div className="left">标题：</div>
                                <div className="right">
                                    <Input onChange={e => this.valueChange(e, 'title')} placeholder="请输入标题"
                                           value={title}/>
                                </div>
                            </li>
                            <li>
                                <div className="left">内容：</div>
                                <div className="right" style={{border: '.1rem solid #f1f1f1'}}>
                                    <BraftEditor
                                        value={editorState}
                                        controls={controls}
                                        media={media}
                                        onChange={this.handleEditorChange}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="left"/>
                                <div className="right">
                                    <Button onClick={() => this.publishNews()} type="primary">发布新闻</Button>
                                </div>
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        this.getNewsList()
    }
    //上传图片
    uploadFile = async (param) => {
        const formData = new FormData();
        formData.append('file', param.file);
        const res = await uploadFile(formData);
        if (res.code === 200) {
            param.success(res.result)
        } else {
            param.error({
                msg: '上传错误'
            })
        }
    };
    publishNews = async ()=>{
        let {title, editorState} = this.state;
        const htmlContent = editorState.toHTML();
        if(!title){
            return message.warning('请输入标题')
        }
        if(title.length > 20){
            return message.warning('标题长度不得大于20')
        }
        if(!htmlContent){
            return message.warning('请输入内容')
        }
        let adminId = config.getCache('adminId');
        let data = await publishNews({
            title, content: htmlContent, adminId
        });
        if(data.code === 200){
            this.getNewsList();
            this.setState({
                title: '',
                editorState: ContentUtils.clear(this.state.editorState)
            });
            message.success(data.data);
        }else {
            message.warning(data.data)
        }
    };
    delNews = async (text, record, index)=>{
        confirm({
            title: '删除新闻?',
            content: `确认删除此新闻吗？`,
            onOk: async () =>{
                let data = await delNews({
                    id: text.id
                });
                if(data.code === 200){
                    message.success(data.data);
                    let {newsList} = this.state;
                    newsList.splice(index, 1);
                    this.setState({
                        newsList
                    })
                }else {
                    message.warning(data.data)
                }
            },
        });
    };
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
    valueChange = (e, key) =>{
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    };
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    };
}

export default News;
