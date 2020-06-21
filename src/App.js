import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {setBaseInfo} from "./store/actionCreators";
import {getBaseInfo} from "./api";

import IndexRouter from "./pages/index/Index";
import AdminRouter from "./pages/admin/Index";
import MobileRouter from './pages/mobile/Index'
import {message} from "antd";

const store = connect(
    state => ({baseInfo: state.baseInfo}),
    dispatch => bindActionCreators({setBaseInfo}, dispatch)
);

@store
class App extends Component{
    render() {
        let {baseInfo} = this.props;
        return <div>
            <Router>
                <Switch>
                    <Route path="/i" component={IndexRouter}/>
                    <Route path="/a" component={AdminRouter}/>
                    <Route path="/m" component={MobileRouter}/>
                    <Redirect exact form="/" to="/i"/>
                </Switch>
            </Router>
        </div>
    }
    componentDidMount() {
        this.getBaseInfo();
    }
    getBaseInfo = async ()=>{
        let data = await getBaseInfo();
        if(data.code === 200){
            let baseInfo = data.result.baseInfo;
            this.props.setBaseInfo(baseInfo)
        }else {
            message.warning('获取失败')
        }
    };
}

export default App;
