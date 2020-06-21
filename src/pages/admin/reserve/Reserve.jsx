import React, {Component} from 'react';
import {Tabs, Input, message,Button,Table, Modal} from 'antd';
import {uploadFile, delReserve, getReserveList} from "../../../api";
import config from './../../../config'
import moment from "moment";

const {TabPane} = Tabs;
const {confirm} = Modal;

class Reserve extends Component {
    state = {
        title: '',
        url: '',
        reserveList: []
    };

    render() {
        let {title, url, reserveList} = this.state;
        return (
            <div>
                <Tabs type="card">
                    <TabPane tab="年检" key="1">
                        <Table columns={
                            [
                                { title: '姓名',width: 100, dataIndex: 'username', key: 'username',},
                                { title: '电话',width: 100, dataIndex: 'tel', key: 'tel',},
                                { title: '预约说明',width: 100, dataIndex: 'reserve', key: 'reserve',},
                                { title: '预约日期',width: 100, dataIndex: 'date', key: 'date',},
                                { title: '预约类型',width: 100, dataIndex: 'typeShow', key: 'typeShow',},
                            ]
                        } dataSource={
                            reserveList.filter(i =>i.type === 0)
                        } />
                    </TabPane>
                    <TabPane tab="过户" key="2">
                        <Table columns={
                            [
                                { title: '姓名',width: 100, dataIndex: 'username', key: 'username',},
                                { title: '电话',width: 100, dataIndex: 'tel', key: 'tel',},
                                { title: '预约说明',width: 100, dataIndex: 'reserve', key: 'reserve',},
                                { title: '预约日期',width: 100, dataIndex: 'date', key: 'date',},
                                { title: '预约类型',width: 100, dataIndex: 'typeShow', key: 'typeShow',},
                            ]
                        } dataSource={
                            reserveList.filter(i =>i.type === 1)
                        } />
                    </TabPane>
                    <TabPane tab="外迁" key="3">
                        <Table columns={
                            [
                                { title: '姓名',width: 100, dataIndex: 'username', key: 'username',},
                                { title: '电话',width: 100, dataIndex: 'tel', key: 'tel',},
                                { title: '预约说明',width: 100, dataIndex: 'reserve', key: 'reserve',},
                                { title: '预约日期',width: 100, dataIndex: 'date', key: 'date',},
                                { title: '预约类型',width: 100, dataIndex: 'typeShow', key: 'typeShow',},
                            ]
                        } dataSource={
                            reserveList.filter(i =>i.type === 2)
                        } />
                    </TabPane>
                    <TabPane tab="外转京" key="4">
                        <Table columns={
                            [
                                { title: '姓名',width: 100, dataIndex: 'username', key: 'username',},
                                { title: '电话',width: 100, dataIndex: 'tel', key: 'tel',},
                                { title: '预约说明',width: 100, dataIndex: 'reserve', key: 'reserve',},
                                { title: '预约日期',width: 100, dataIndex: 'date', key: 'date',},
                                { title: '预约类型',width: 100, dataIndex: 'typeShow', key: 'typeShow',},
                            ]
                        } dataSource={
                            reserveList.filter(i =>i.type === 3)
                        } />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        this.getReserveList();
    }
    delReserve = async (text, record, index)=>{
        confirm({
            title: '删除案例?',
            content: `确认删除此案例吗？`,
            onOk: async () =>{
                let data = await delReserve({
                    id: text.id
                });
                if(data.code === 200){
                    message.success(data.data);
                    let {reserveList} = this.state;
                    reserveList.splice(index, 1);
                    this.setState({
                        reserveList
                    })
                }else {
                    message.warning(data.data)
                }
            },
        });
    }
    getReserveList = async ()=>{
        let data = await getReserveList();
        console.log(data)
        if(data.code === 200){
            let {reserveList} = data.result;
            reserveList.forEach(item =>{
                item.key = item.id;
                switch (item.type){
                    case 0:
                        item.typeShow = '年检';
                        break;
                    case 1:
                        item.typeShow = '过户';
                        break;
                    case 2:
                        item.typeShow = '外迁';
                        break;
                    case 3:
                        item.typeShow = '外转京';
                        break;
                } 
            });
            // 0年检
            // 1过户
            // 2外迁
            // 3外转京
            this.setState({
                reserveList
            })
        }else {
            message.warning('获取失败')
        }
    };
   
    valueChange = (e, key) =>{
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    };
}

export default Reserve;
