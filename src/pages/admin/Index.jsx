import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import About from "./about/About";
import Banner from "./banner/Banner";
import Center from "./center/Center";
import Eg from "./eg/Eg";
import Reserve from "./reserve/Reserve";
import NewEnergy from "./newEnergy/NewEnergy";
import News from "./news/News";
import Login from "./login/Login";
import BaseInfo from "./baseInfo/BaseInfo";
import config from './../../config'
import moment from "moment";
import { Layout, Menu, Breadcrumb, Dropdown, Modal } from 'antd';
import './index.styl'

const { Header, Content, Footer } = Layout;
const {confirm} = Modal;

class Index extends Component {
    state = {
        navList: [
            {path: '/a/banner', title: '轮播图管理'},
            {path: '/a/baseInfo', title: '联系信息管理'},
            {path: '/a/newEnergy', title: '指标延期管理'},
            {path: '/a/center', title: '车务中心管理'},
            {path: '/a/eg', title: '客户案例管理'},
            {path: '/a/reserve', title: '服务项目'},
            {path: '/a/news', title: '新闻管理'},
            {path: '/a/about', title: '关于我们'},
        ]
    };
    render() {
        let {navList} = this.state;
        return (
            <div>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div id="logo">乐道车务管理系统</div>
                        <div id="admin">
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item onClick={() => this.gout()}>
            <span>
                退出账号
            </span>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <span className="ant-dropdown-link">
                                    管理员
                                </span>
                            </Dropdown>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[this.props.history.location.pathname]}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                navList.map(nav =>{
                                    return <Menu.Item onClick={() => this.jumpPath(nav.path)} key={nav.path}>{nav.title}</Menu.Item>
                                })
                            }
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                navList.filter(nav => nav.path === this.props.history.location.pathname).map(n => {
                                    return <span key={n.path}>{n.title}</span>
                                })
                            }
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>

                            <Switch>
                                <Route path="/a/banner" component={Banner} />
                                <Route path="/a/center" component={Center} />
                                <Route path="/a/reserve" component={Reserve} />
                                <Route path="/a/newEnergy" component={NewEnergy} />
                                <Route path="/a/eg" component={Eg} />
                                <Route path="/a/news" component={News} />
                                <Route path="/a/login" component={Login} />
                                <Route path="/a/about" component={About} />
                                <Route path="/a/baseInfo" component={BaseInfo} />
                                <Redirect exact form="/a" to="/a/banner" />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //防止死循环
        if(prevProps.history.location.pathname !== '/a/login'){
            if(!config.getCache('adminId')){
                this.props.history.replace('/a/login');
            }
        }
    }

    componentDidMount() {
        if(!config.getCache('adminId')){
            this.props.history.replace('/a/login');
        }
    }
    jumpPath = (path) =>{
        this.props.history.push(path);
    };
    gout = () =>{
        confirm({
            title: '退出账号?',
            content: '确认退出乐道车务管理系统吗？',
            onOk: () =>{
                config.delCache('adminId');
                this.props.history.replace('/a/login')
            },
        });
    }
}

export default Index;
