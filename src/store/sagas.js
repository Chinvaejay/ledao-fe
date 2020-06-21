import {put, takeEvery} from 'redux-saga/effects'
import * as constants from './actionTypes'
import {setBaseInfo} from "./actionCreators";

import * as ajax from './../api/index'
import config from "../config";

/*function* setAdmin(action) {
    let data = yield ajax.getAllMessages();
    let chatList = [];
    if(data.code === 200){
        data.result.forEach(v =>{
            chatList.push({
                uuid: v.adminInfo.adminInfo.uuid,
                username: v.adminInfo.adminInfo.username,
                headImg: v.adminInfo.adminInfo.headImg,
                power: v.adminInfo.roleInfo.power,
                createTime: new Date(v.msgInfo.createTime).getTime(),
                msg: v.msgInfo.msg,
            })
        });
    }
    yield put({//异步转同步
        type: constants.SET_ADMIN_INFO,
        chatList: chatList
    });
}*/

function* setAdmin(){

}


function* mySaga() {
    yield takeEvery(constants.SET_BASE_INFO, setAdmin);
    // yield takeEvery(constants.INIT_CHAT, setChat);
}

export default mySaga;
