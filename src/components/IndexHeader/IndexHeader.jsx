import React, {Component} from 'react';
import './index.styl'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";

const store = connect(
    state => ({baseInfo: state.baseInfo}),
);

@store
@withRouter
class IndexHeader extends Component {
    state = {
        navList: [
            {title: '网站首页', path: '/i/banner'},
            {title: '新能源指标延期', path: '/i/newEnergy'},
            {title: '车务中心', path: '/i/center'},
            {title: '客户案例', path: '/i/eg'},
            {title: '新闻动态', path: '/i/news'},
            {title: '关于我们', path: '/i/about'}
        ]
    };
    render() {
        let {navList} = this.state;
        let {baseInfo} = this.props;
        return (
            <div className="index-header">
                <div className="top">
                    <div className="inner-box">
                        <div className="left">
                            <span className="logo">乐道车务</span>
                            主打车辆一切业务 - 为你排忧解难 - <span>诚信为本是我司宗旨</span></div>
                        <div className="right">
                            <svg t="1575015121806" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="5038" width="200" height="200">
                                <path
                                    d="M682.25 465.262c0 16.695 11.115 27.811 27.81 27.811s27.812-11.116 27.812-27.811A167.395 167.395 0 0 0 570.96 298.35c-16.695 0-27.811 11.116-27.811 27.811s11.16 27.812 27.811 27.812a111.597 111.597 0 0 1 111.29 111.289z m111.289 0c0 16.695 11.115 27.811 27.81 27.811s27.812-11.116 27.812-27.811c0-152.984-125.217-278.201-278.2-278.201-16.696 0-27.812 11.16-27.812 27.855s11.16 27.811 27.811 27.811c122.405 0 222.579 100.174 222.579 222.535zM417.976 367.9c30.623-30.579 33.391-77.898 5.58-111.289L337.31 148.134c-27.811-36.16-80.666-41.74-116.869-13.928-2.768 2.812-5.536 2.812-5.536 5.58l-75.13 75.13c-72.318 72.318 30.623 267.041 217.042 453.417C543.15 854.708 735.06 954.88 807.378 885.33l75.13-75.13c33.392-33.391 33.392-86.246 0-116.825l-5.536-5.58-108.52-86.246c-33.348-27.81-80.623-25.043-111.246 5.58l-47.275 47.319c-50.087-30.623-94.593-64.014-133.564-102.941-38.927-38.971-72.275-83.478-102.898-133.565l44.507-50.043z m-38.927-75.13c8.348 11.16 8.348 27.855-2.812 36.203l-61.202 63.97a29.569 29.569 0 0 0-5.536 33.392 721.425 721.425 0 0 0 122.405 164.1 721.512 721.512 0 0 0 164.1 122.405 29.569 29.569 0 0 0 33.39-5.58l63.971-63.97c11.16-11.116 25.043-11.116 36.203-2.769l108.477 89.014s2.768 0 2.768 2.768a26.889 26.889 0 0 1 0 38.971l-75.13 75.13c-36.115 36.115-208.606-55.666-372.75-217.042-164.1-161.332-253.114-336.548-216.955-372.75l77.854-77.899c11.16-8.348 30.623-8.348 38.971 5.58l86.246 108.521z"
                                    fill="#1396DC" p-id="5039"></path>
                            </svg>
                            <span>{baseInfo.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="nav-box">
                    <div className="inner-box">
                        <ul>
                            {navList.map( nav => {
                                return <li className={this.props.history.location.pathname === nav.path ? 'select' : ''} key={nav.path} onClick={() =>this.jumpPath(nav)}>
                                    {nav.title}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    jumpPath = (nav)=>{
        this.props.history.push(nav.path);
    }
}

export default IndexHeader;
