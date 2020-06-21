import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import { NavBar, TabBar } from 'antd-mobile';
import phone from './../../common/images/phone.png'
import Home from "./home/Home";
import About from "./about/About";
import Eg from "./eg/Eg";
import home from './../../common/images/home.png'
import selectHome from './../../common/images/selecthome.png'
import anli from './../../common/images/anli.png'
import selectAnli from './../../common/images/selectanli.png'
import about from './../../common/images/about.png'
import selectAbout from './../../common/images/selectAbout.png'
import {connect} from "react-redux";

const mobileStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    paddingTop: '45px',
    paddingBottom: 'calc(env(safe-area-inset-bottom) + 50px)',
    background: '#f9f9f9',
    overflow: 'auto'
};
const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
class Index extends Component {
    state = {
        selectedTab: this.props.history.location.pathname === '/m' ? '/m/banner' : this.props.history.location.pathname,
    };
    render() {
        let {baseInfo} = this.props;
        return (
            <div style={mobileStyle}>
                <NavBar
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        zIndex: '998'
                    }}
                    mode="dark"
                >{baseInfo.name}</NavBar>
                <Switch>
                    <Route path="/m/home" component={Home} />
                    <Route path="/m/about" component={About} />
                    <Route path="/m/eg" component={Eg} />
                    <Redirect exact form="/m" to="/m/home" />
                </Switch>
                <div style={{ position: 'fixed', height: '50px', width: '100%', bottom: 'env(safe-area-inset-bottom)', left: 0, zIndex: '998' }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        <TabBar.Item
                            title="首页"
                            key="/m/home"
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${home}) center center /  21px 21px no-repeat` }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${selectHome}) center center /  21px 21px no-repeat` }}
                            />
                            }
                            selected={this.state.selectedTab === '/m/banner'}
                            onPress={() => {
                                this.props.history.push('/m/banner');
                                this.setState({
                                    selectedTab: '/m/banner',
                                });
                            }}
                            data-seed="logId"
                        />
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${phone}) center center /  21px 21px no-repeat` }}
                                />
                            }
                            title="电话"
                            key="phone"
                            selected={this.state.selectedTab === 'phone'}
                            onPress={() => {
                                window.location.href = `tel:${baseInfo.phone}`;
                            }}
                            data-seed="logId1"
                        />
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${anli}) center center /  21px 21px no-repeat` }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${selectAnli}) center center /  21px 21px no-repeat` }}
                                />
                            }
                            title="客户案例"
                            key="/m/eg"
                            selected={this.state.selectedTab === '/m/eg'}
                            onPress={() => {
                                this.props.history.push('/m/eg');
                                this.setState({
                                    selectedTab: '/m/eg',
                                });
                            }}
                        />
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${about}) center center /  21px 21px no-repeat` }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${selectAbout}) center center /  21px 21px no-repeat` }}
                                />
                            }
                            title="关于我们"
                            key="/m/about"
                            selected={this.state.selectedTab === '/m/about'}
                            onPress={() => {
                                this.props.history.push('/m/about');
                                this.setState({
                                    selectedTab: '/m/about',
                                });
                            }}
                        />
                    </TabBar>
                </div>
            </div>
        );
    }
    componentDidMount() {
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){

        }else {
            // console.log(this.props.history);
            this.props.history.replace('/i');
        }
    }
}

export default Index;
