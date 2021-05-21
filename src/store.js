import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {v4 as uuidv4} from "uuid";
//import moment from "moment";

//import SecureLS from "secure-ls";
//const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);


/*
*
* allData: [{
			id: 1,
			flex: 6,
			date: new Date(),
			show: false,
			classes: [
				{
					time: {
						type: "absolute",
						startTime: new Date(),
						endTime: moment(new Date()).add(5, 'hours')
					},
					text: '國防課'
				},
				{
					time: {
						type: "absolute",
						startTime: new Date(),
						endTime: moment(new Date()).add(5, 'hours')
					},
					text: '體育課'
				}
			]
		}
*
*
*
* */

const store = new Vuex.Store({
    state: {
        isLoading: false,
        allData: [],
        allClass:[]
    },
    mutations: {
        addClass(state,payload){
            let i = state.allData.findIndex(item=>{
                return new Date(item.classDate).getTime()===new Date(payload.classDate).getTime()
            })
            if(i===-1){
                //找不到，必須新增
                state.allData.push({
                    id: uuidv4(),
                    classDate: payload.classDate,
                    flex: payload.flex ?? 6,
                    show: false,
                    classes: [{
                        tagColor: payload.tagColor,
                        name: payload.name,
                        time: {
                            type: payload.time.type,
                            startTime: new Date(payload.classDate+" "+payload.time.startTime), //Date
                            endTime: new Date(payload.classDate+" "+payload.time.endTime)
                        },
                        text: payload.name
                    }],
                    tasks:[]
                })
            }else{
                state.allData[i].classes.push({
                    tagColor: payload.tagColor,
                    name: payload.name,
                    time: {
                        type: payload.time.type,
                        startTime: new Date(payload.classDate+" "+payload.time.startTime), //Date
                        endTime: new Date(payload.classDate+" "+payload.time.endTime)
                    },
                    text: payload.name
                })
            }
            let class_index = state.allData.findIndex(x=>x.name===payload.name)

            if(class_index===-1){
                state.allClass.push({
                    name:payload.name,
                    tagColor: payload.tagColor
                })
            }else{
                state.allClass[class_index].tagColor = payload.tagColor
            }

            state.allData.sort((a,b)=>{
                return new Date(a.classDate) - new Date(b.classDate);
            })
        },
        addTask(state,payload){
            let i = state.allData.findIndex(item=>{
                return new Date(item.classDate).getTime()===new Date(payload.taskDate).getTime()
            })
            if(i===-1){
                //找不到，必須新增
                state.allData.push({
                    id: uuidv4(),
                    classDate: payload.taskDate,
                    flex: payload.flex ?? 6,
                    show: false,
                    classes: [],
                    tasks:[{
                        done: false,
                        text: payload.task,
                        time: payload.taskDate
                    }]
                })
            }else{
                state.allData[i].tasks.push({
                    done: false,
                    text: payload.task,
                    time: payload.taskDate
                })
            }
        },
        taskStatus(state,payload){
            state.allData[payload.dayIndex].tasks[payload.taskIndex].done = !state.allData[payload.dayIndex].tasks[payload.taskIndex].done
        }
    },
    plugins: [createPersistedState({})],
});
export default store