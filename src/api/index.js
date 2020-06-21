import ajax from "./ajax";

const BASE_URL = 'http://localhost:3000';

const ADMIN_URL = `${BASE_URL}/admin`;
const BANNER_URL = `${BASE_URL}/banner`;
const BASEINFO_URL = `${BASE_URL}/baseInfo`;
const NEWENERGY_URL = `${BASE_URL}/newEnergy`;
const CENTER_URL = `${BASE_URL}/center`;
const EG_URL = `${BASE_URL}/eg`;
const RESERVE_URL = `${BASE_URL}/reserve`;
const ABOUT_URL = `${BASE_URL}/about`;
const NEWS_URL = `${BASE_URL}/news`;

export const uploadFile = data => ajax(BASE_URL + '/uploadFile', data, 'post', 'file');

//获取新能源延期
export const getNewEnergy = data => ajax(NEWENERGY_URL + '/getNewEnergy', data);
//修改/保存新能源延期
export const saveNewEnergy = data => ajax(NEWENERGY_URL + '/saveNewEnergy', data, 'post');

//获取基本资料
export const getBaseInfo = data => ajax(BASEINFO_URL + '/getBaseInfo', data);
//修改/保存基本资料
export const saveBaseInfo = data => ajax(BASEINFO_URL + '/saveBaseInfo', data, 'post');

//获取车务中心
export const getCenterList = data => ajax(CENTER_URL + '/getCenterList', data);
//提交reserveForm表单
export const comfirmForm = data => ajax(BASE_URL + '/reserveForm', data, 'post');
//删除车务中心
export const delCenter = data => ajax(CENTER_URL + '/delCenter', data, 'post');
//添加车务中心
export const addCenter = data => ajax(CENTER_URL + '/addCenter', data, 'post');

//获取新闻详情
export const getNewsInfo = data => ajax(NEWS_URL + '/getNewsInfo', data);
//获取新闻
export const getNewsList = data => ajax(NEWS_URL + '/getNewsList', data);
//删除新闻
export const delNews = data => ajax(NEWS_URL + '/delNews', data, 'post');
//发布新闻
export const publishNews = data => ajax(NEWS_URL + '/publishNews', data, 'post');

//获取案例
export const getEgList = data => ajax(EG_URL + '/getEgList', data);
//删除案例
export const delEg = data => ajax(EG_URL + '/delEg', data, 'post');
//添加案例
export const addEg = data => ajax(EG_URL + '/addEg', data, 'post');
//获取案例
export const getReserveList = data => ajax(RESERVE_URL + '/getReserveList', data);
//删除案例
export const delReserve = data => ajax(RESERVE_URL + '/delReserve', data, 'post');
//添加案例
export const addReserve = data => ajax(RESERVE_URL + '/addReserve', data, 'post');

//获取公司介绍
export const getAboutList = data => ajax(ABOUT_URL + '/getAboutList', data);
//删除公司介绍
export const delAbout = data => ajax(ABOUT_URL + '/delAbout', data, 'post');
//添加公司介绍
export const addAbout = data => ajax(ABOUT_URL + '/addAbout', data, 'post');

//获取轮播图
export const getBannerList = data => ajax(BANNER_URL + '/getBannerList', data);
//删除轮播图
export const delBanner = data => ajax(BANNER_URL + '/delBanner', data, 'post');
//添加轮播图
export const addBanner = data => ajax(BANNER_URL + '/addBanner', data, 'post');

//管理员登录
export const adminLogin = data => ajax(ADMIN_URL + '/login', data, 'post');
