import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.styl'

class TitleItem extends Component {
    static propTypes = {
        en: PropTypes.string,
        zh: PropTypes.string.isRequired,
        style: PropTypes.object
    };
    static defaultProps = {
        zh: '汉字'
    };
    render() {
        let {zh, en, style} = this.props;
        return (
            <section style={style} className="title-box">
                <div className="line"/>
                <div className="en">{en}</div>
                <div className="zh">{zh}</div>
                <div className="line"/>
            </section>
        );
    }
}

export default TitleItem;
