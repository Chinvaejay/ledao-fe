import * as constants from './actionTypes'

//默认数据
const defaultState = {
    baseInfo: {},
};

export default (state = defaultState, action) =>{
    switch (action.type) {
        case constants.SET_BASE_INFO:{
            const newState = {...state};
            newState.baseInfo = action.baseInfo;
            return newState;
        }
        default:
            return state
    }
}
