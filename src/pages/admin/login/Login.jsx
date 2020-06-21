import React, {Component} from 'react';
import {check_name} from "../../../common/js/FabLabFun";
import {Input,Icon, Button, message} from "antd";
import './index.styl'
import config from './../../../config'
import {adminLogin} from "../../../api";

class login extends Component {
    state = {
        admin: '',
        password: '',
        loading: false
    };
    get loginComputed(){
        let {admin, password} = this.state;
        return check_name(admin) && !!password
    }
    render() {
        let {admin, password, loading} = this.state;
        return (
            <div className="admin-login-box">
                <div className="title">
                    乐道车务后台管理系统
                </div>
                <div className="login-box">
                    <div className="login-content">
                        <Input
                            className="input"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入管理员账号"
                            value={admin}
                            onChange={(e)=> this.inputChange(e, 'admin')}
                            onKeyUp={e => this.enterLogin(e)}
                        />
                        <Input
                            className="input"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入管理员密码"
                            value={password}
                            onChange={(e)=> this.inputChange(e, 'password')}
                            onKeyUp={e => this.enterLogin(e)}
                        />
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#">忘记密码？联系超管。</a>
                        <Button loading={loading} disabled={!this.loginComputed} onClick={()=> this.loginAdmin()} style={{marginTop: '1rem'}} block type="primary">登录</Button>
                    </div>
                </div>
            </div>
        );
    }

    inputChange(e, type){
        let {admin, password} = this.state;
        let value = e.target.value;
        switch (type) {
            case 'admin':
                admin = value;
                break;
            case 'password':
                password = value;
                break;
            default:
                break
        }
        this.setState({
            admin, password
        })
    }
    enterLogin(e){
        e.keyCode === 13 && this.loginComputed && this.loginAdmin();
    }
    async loginAdmin(){
        let {admin, password} = this.state;
        await this.setState({
            loading: true
        });
        let data = await adminLogin({
            admin,
            password
        });
        await this.setState({
            loading: false
        });
        if(data.code === 200){
            config.setCache('adminId',  data.result.adminInfo.id);
            /*切换到主界面*/
            this.props.history.push('/a');
        }else {
            message.warning(data.data)
        }
    }
}

export default login;
