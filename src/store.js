import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

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

        allData: []
    },
    mutations: {
        Loaded(state) {
            state.isLoading = !state.isLoading

            // 這樣每執行一次都會設定一次
            Vue.set(state, 'clicked', false);
        },
        add(state, payload) {
            state.allData.push(payload)
        }
    },
    plugins: [createPersistedState({})],
});
export default store