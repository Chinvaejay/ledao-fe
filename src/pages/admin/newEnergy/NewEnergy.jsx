import React, {Component} from 'react';
import {Button, Divider, Input, message} from "antd";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {uploadFile, saveNewEnergy, getNewEnergy} from "../../../api";
import config from "../../../config";

class NewEnergy extends Component {
    state = {
        title: '',
        content: '',
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    };
    render() {
        let {title, content, editorState} = this.state;
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
                <Divider orientation="left">新能源指标延期</Divider>
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
                                onSave={this.submitContent}
                            />
                        </div>
                    </li>
                    <li>
                        <div className="left"/>
                        <div className="right">
                            <Button onClick={() => this.saveNewEnergy()} type="primary">保存新能源延期</Button>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
    componentDidMount() {
        this.getNewEnergy()
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
    valueChange = (e, key) =>{
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    };
    saveNewEnergy = async ()=>{
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
        let data = await saveNewEnergy({
            title, content: htmlContent, adminId
        });
        if(data.code === 200){
            message.success(data.data);
        }else {
            message.warning(data.data)
        }
    };
    getNewEnergy = async ()=>{
        const data = await getNewEnergy();
        if(data.code === 200){
            let newEnergy = data.result.newEnergy;
            let { title = '', content = ''}= newEnergy;
            this.setState({
                title,
                editorState: BraftEditor.createEditorState(content)
            })
        }else {
            message.warning('获取失败')
        }
    };
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    };
    submitContent = async () => {
        this.saveNewEnergy()
    }
}

export default NewEnergy;
