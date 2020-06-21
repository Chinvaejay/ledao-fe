import React, {Component} from 'react';
import moment from 'moment';
import {  Modal, Form, Input, Button, DatePicker, Checkbox} from 'antd';
import {Carousel} from 'antd-mobile'
import './index.styl'
import banner1 from "../../../common/images/banner1.png";
import TitleItem from "../../../components/TitleItem/TitleItem";
import nianjian from "../../../common/images/年检.png";
import guohu from "../../../common/images/过户.png";
import waiqian from "../../../common/images/迁移.png";
import waizhuanjing from "../../../common/images/转换.png";
import hefa from "../../../common/images/hefa.png";
import anquan from "../../../common/images/anquan.png";
import kuaijie from "../../../common/images/kuaijie.png";
import wuyou from "../../../common/images/wuyou.png";
import titie from "../../../common/images/titie.png";
import shengqian from "../../../common/images/shengqian.png";
import Lazy from "../../../components/Lazyload/Lazyload";
import {connect} from "react-redux";
import {getCenterList, getBannerList, comfirmForm} from "../../../api";
import {message} from "antd";
const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
class Home extends Component {
    state = {
        bannerList: [],
        serveList: [
            {title: '年检', url: nianjian, modal: false},
            {title: '过户', url: guohu, modal: false},
            {title: '外迁', url: waiqian, modal: false},
            {title: '外转京', url: waizhuanjing, modal: false}
        ],
        centerList: [],
        newEnergyList: [
            {title: '合法', url: hefa, intro: '完全合法合规，全程在车管所办理，将我们的车过户给您，再过户回来，相当于您买卖一次车'},
            {title: '安全', url: anquan, intro: '和您一起到车管所办理，您没时间，可让亲友代办，全程在场监督，确保您的证件更安全放心'},
            {title: '快捷', url: kuaijie, intro: '今天买进，次日卖出，绝不像某些不良商家，次日出还收您加急费，我们会第一时间为您服务'},
            {title: '无忧', url: wuyou, intro: '办理成功再付款，车辆过户到您名下后，您确认无误后付款，此时，新能源服务有效期已重置'},
            {title: '体贴', url: titie, intro: '若您和亲友都没空，我们可以为您全程代办，让您即使足不出户，也可以轻松办理新能源服务'},
            {title: '省钱', url: shengqian, intro: '新能源服务有效期为半年，我们正规途径为您办理一年有效期，不像某些商家办理一年要加钱'},
        ],
        currForm: {
            title: '',
            index: 0,
            modal: false
        },
        reserveForm: {
            username: '',
            tel: '',
            reserve: '',
            date: '',
        }
    };
    getBannerList = async ()=>{
        let data = await getBannerList();
        if(data.code === 200){
            let {bannerList} = data.result;
            bannerList.forEach(item =>{
                item.key = item.id;
            });
            this.setState({
                bannerList
            })
        }else {
            message.warning('获取失败')
        }
    };

    // 弹出表单
    popUp = (index, title) => {
        let currForm = this.state.currForm
        currForm.title = title
        currForm.index = index
        currForm.modal = true
        this.setState({
            currForm
        })
    }
    // 表单提交
    handleOkModal = async () => {
        let reserveForm = {...this.state.reserveForm}
        reserveForm.date = moment(reserveForm.date).format('YYYY-MM-DD')
        let currForm = this.state.currForm
        let index = currForm.index
        for (let i in reserveForm) {
            if (!reserveForm[i].trim()) {
                let n;
                switch (i) {
                    case 'username':
                        n='请填写您的名字'
                        break;
                    case 'tel':
                        n='请填写您的电话号码'
                        break;
                    case 'reserve':
                        n='请填写您的预约说明'
                        break;
                    case 'date':
                        n='请选择您的预约日期'
                        break;
                }
                message.error(n)
                return 
            }
        }
        reserveForm.type = index
        let res = await comfirmForm(reserveForm)
        if (res.code == 200) {
            message.success('预约成功')
            currForm.title = ''
            currForm.index = 0
            currForm.modal = false
            this.setState({
                currForm
            })
        }
        else {
            message.error('预约失败')
        }
    }
    // 表单取消
    handleCancelModal = () => {
        let currForm = this.state.currForm
        currForm.title = ''
        currForm.index = 0
        currForm.modal = false
        this.setState({
            currForm
        })
    }

    inputChange = (e, key) => {
        console.log(e, key)
        let value
        if (key === 'date') {
            value = e
        }
        else {
            value = e.target.value;
        }
        console.log(value)
        let reserveForm = this.state.reserveForm
        reserveForm[key] = value
        this.setState({
            reserveForm
        })
    }
    render() {
        let {baseInfo} = this.props;
        let {bannerList, serveList, centerList, newEnergyList, currForm, reserveForm} = this.state;
        return (
            <div className="mobile-home-box">
                {/*轮播图*/}
                <div className="banner">
                    <Carousel
                        autoplay
                        infinite
                        style={{width: '100%', height: '100%'}}
                    >
                        {bannerList.map(banner => (
                            <div
                                key={banner.title}
                                style={{width: '100%', height: '100%',marginLeft: 0, marginRight: 0}}
                            >
                                <img
                                    src={banner.url}
                                    alt=""
                                    style={{ width: '100%', height: '16rem', objectFit: 'cover'}}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                {/*服务*/}
                <Modal
                    title={this.state.currForm.title}
                    visible={this.state.currForm.modal}
                    onOk={this.handleOkModal}
                    onCancel={this.handleCancelModal}
                >
                    {/* 姓名，电话，预约说明，预约日期 */}
                    <div className="form">
                        <label className="form-item">
                            <span>姓名</span>
                            <Input
                                placeholder="请输入您的名字"
                                value={reserveForm.username}
                                onChange={(e)=> this.inputChange(e, 'username')}
                            />
                        </label>
                        <label className="form-item">
                            <span>电话</span>
                            <Input
                                placeholder="请输入您的电话号码"
                                value={reserveForm.tel}
                                onChange={(e)=> this.inputChange(e, 'tel')}
                            />
                        </label>
                        <label className="form-item">
                            <span>预约说明</span>
                            <Input
                                placeholder="请输入预约说明"
                                value={reserveForm.reserve}
                                onChange={(e)=> this.inputChange(e, 'reserve')}
                            />
                        </label>
                        <label className="form-item">
                            <span>预约日期</span>
                            <DatePicker
                                placeholder="请选择预约日期"
                                defaultValue={null}
                                onChange={(e)=> this.inputChange(e, 'date')}
                            />
                        </label>
                        
                    </div>
                    </Modal>
                <div className="serve-center">
                    <TitleItem style={{transform: 'scale(.7)'}} en={'SERVICE'} zh={'服务项目'} />
                    <ul>
                        {
                            serveList.map((serve, index) =>{
                                return <li key={serve.title} onClick={() =>this.popUp(index, serve.title)}>
                                    <Lazy className="img" src={serve.url} />
                                    <span>{serve.title}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {/*新能源指标延期*/}
                <div className="newEnergy">
                    <TitleItem style={{transform: 'scale(.7)'}} zh={'新能源指标延期'} />
                    <ul>
                        {
                            newEnergyList.map(newEnergy => {
                                return <li key={newEnergy.title}>
                                    <Lazy className="img" src={newEnergy.url} />
                                    <span>{newEnergy.title}</span>
                                    <p>{newEnergy.intro}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {/*车务中心*/}
                <div className="center">
                    <TitleItem style={{transform: 'scale(.7)'}} en={'TRAFFIC'} zh={'车务中心'} />
                    <ul>
                        {
                            centerList.map(center =>{
                                return <li key={center.title}>
                                    <div>
                                        <Lazy className="img" src={center.url} />
                                        <div className="tip">
                                            {center.title}
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {/*联系我们*/}
                <div className="contact-us">
                    <TitleItem style={{transform: 'scale(.7)'}} zh={'联系我们'} />
                    <div className="middle">
                        <div className="left">
                            <div className="map" id="map">

                            </div>
                        </div>
                        <div className="right">
                            <div className="contact">
                                <p>{baseInfo.name}</p>
                                <p>联系人：{baseInfo.boss}</p>
                                <p>手机号码：{baseInfo.phone}</p>
                                <p>微信：{baseInfo.weChat}</p>
                                <p>电子邮箱：{baseInfo.email}</p>
                                <p>联系地址：{baseInfo.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getBannerList();
        this.getCenterList();
        this.initMap();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(JSON.stringify(prevProps.baseInfo) !== JSON.stringify(this.props.baseInfo)){
            this.initMap()
        }
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
    initMap(){
        let map = new window.BMap.Map("map");
        map.centerAndZoom();
        let local = new window.BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        local.search(this.props.baseInfo.address);
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
}

export default Home;
