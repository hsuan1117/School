<template>
	<v-container fluid>
		<v-row dense class="col-auto" >
			<v-col v-for="(day) in allData" :key="day.id">
				<v-card
					class="mx-auto col-8"
					max-width="400"
				>
					<v-img
						src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
						height="200px"
					></v-img>

					<v-card-title>
						{{ new Date(day.date).getMonth() + 1 + "/" + new Date(day.date).getDate() }}
					</v-card-title>

					<v-card-subtitle>
						{{ new Date(day.date).toLocaleString('zh-TW', {weekday: "short"}) }} ({{day.classes.length}}堂課)
					</v-card-subtitle>

					<v-card-actions>
						<v-btn
							color="orange lighten-2"
							text
						>
							編輯
						</v-btn>

						<v-spacer></v-spacer>

						<v-btn
							icon
							@click="day.show = !day.show"
						>
							<v-icon>{{ day.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
						</v-btn>
					</v-card-actions>

					<v-expand-transition>
						<div v-show="day.show">
							<v-divider></v-divider>
							<v-timeline
								align-top
								dense
								class="ma-4 hidden-sm-and-down"
							>
								<v-timeline-item
									v-for="(item, i) in day.classes"
									:key="i"
									color="pink"
									small
								>
									<v-row class="pt-1">
										<v-col cols="3">
											<strong>{{ new Date(item.time.startTime) | shortTimeFormat }} -
												{{ new Date(item.time.endTime) | shortTimeFormat }}</strong>
										</v-col>
										<v-col>
											<strong>{{ item.text }}</strong>
											<div class="caption">
												{{ item.text }}
											</div>
										</v-col>
									</v-row>
								</v-timeline-item>
							</v-timeline>
							<v-divider></v-divider>
							<v-list dense class="hidden-md-and-up">
								<v-list-item-group
									disabled=""
									color="primary"
								>
									<v-list-item
										v-for="(item, i) in day.classes"
										:key="i"
										class="text-wrap"
									>
										<v-list-item-subtitle v-if="item.time.type ===  'absolute'">
											{{ new Date(item.time.startTime) | shortTimeFormat }} -
											{{ new Date(item.time.endTime) | shortTimeFormat }}
										</v-list-item-subtitle>
										<v-list-item-title>{{ item.text }}</v-list-item-title>
									</v-list-item>
								</v-list-item-group>
							</v-list>
							<v-divider></v-divider>
							<v-list dense>
								<v-list-item-group
									disabled=""
									color="primary"
								>
									<v-list-item
										v-for="(item, i) in day.classes"
										:key="i"
										class="text-wrap"
									>
										<v-list-item-subtitle v-if="item.time.type ===  'absolute'">
											{{ new Date(item.time.startTime) | shortTimeFormat }} -
											{{ new Date(item.time.endTime) | shortTimeFormat }}
										</v-list-item-subtitle>
										<v-list-item-title>{{ item.text }}</v-list-item-title>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</div>
					</v-expand-transition>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src
//let i=0;
import moment from 'moment';

export default {
	name: 'Home',
	components: {},
	data: () => ({
		allData: [{
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
		}, {
			id: 2,
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
					text: '體育課'
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
		}, {
			id: 3,
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
					text: '體育課'
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
		}, {
			id: 4,
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
					text: '體育課'
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
		}],
	}),
	methods: {
		moment
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