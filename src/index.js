import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import App from './App';
import * as serviceWorker from './serviceWorker';
moment.locale('en');

ReactDOM.render(<Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
