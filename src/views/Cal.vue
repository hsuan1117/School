<template>
	<v-container fluid>
		<v-row dense class="col-auto" >
			<v-col >
				<v-calendar
					ref="calendar"
					:events="allData"
					color="primary"
					type="week"
				></v-calendar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src
//let i=0;
import moment from 'moment';
import store from "@/store";

export default {
	name: 'Cal',
	components: {},
	data: () => ({
		allData : store.state.allData
			.map(x=>(x.classes)).flat()
			.map(x=> ({
				name:x.name,
				start: moment(new Date(x.time.startTime)).format("yyyy-MM-DD HH:mm"),
				end: moment(new Date(x.time.endTime)).format("yyyy-MM-DD HH:mm"),
				color: x.tagColor,
			})).concat(
				store.state.allData
					.map(x=>(x.tasks)).flat()
					.filter(x=>!x.done)
					.map(x=> ({
						name:x.text,
						start: moment(new Date(x.taskDate)).format("yyyy-MM-DD HH:mm")
					}))
			)
	}),
	methods: {
		moment
	},
	mounted() {
		console.log(
			store.state.allData
			.map(x=>(x.classes)).flat()
			.map(x=> ({
				name:x.name,
				start: moment(new Date(x.time.startTime)).format("yyyy-MM-DD HH:mm"),
				end: moment(new Date(x.time.endTime)).format("yyyy-MM-DD HH:mm"),
				color: x.tagColor,
			})).concat(
				store.state.allData
					.map(x=>(x.tasks)).flat()
					.filter(x=>!x.done)
					.map(x=> ({
						name:x.text,
						start: moment(new Date(x.taskDate)).format("yyyy-MM-DD HH:mm")
					}))
			)
		)
	}
}
</script>

<style scoped>
.v-card--reveal {
	bottom: 0;
	opacity: 1 !important;
	position: absolute;
	width: 100%;
}
</style>