import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import Home from "./home/Home";
import About from "./about/About";
import IndexHeader from "../../components/IndexHeader/IndexHeader";
import IndexFooter from "../../components/IndexFooter/IndexFooter";
import Center from "./center/Center";
import Eg from "./eg/Eg";
import NewEnergy from "./newEnergy/NewEnergy";
import NewsDetail from "./newsDetail/NewsDetail";
import News from "./news/News";

class Index extends Component {
    render() {
        return (
            <div>
                <IndexHeader />
                <Switch>
                    <Route path="/i/home" component={Home} />
                    <Route path="/i/newEnergy" component={NewEnergy} />
                    <Route path="/i/center" component={Center} />
                    <Route path="/i/eg" component={Eg} />
                    <Route path="/i/news" component={News} />
                    <Route path="/i/newsDetail/:newsId" component={NewsDetail} />
                    <Route path="/i/about" component={About} />
                    <Redirect exact form="/i" to="/i/home" />
                </Switch>
                <IndexFooter />
            </div>
        );
    }
    componentDidMount() {
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
            console.log(this.props.history);
            this.props.history.replace('/m');
        }else {

        }
    }
}

export default Index;
