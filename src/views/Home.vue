<template>
	<v-container fluid>
		<v-row dense class="col-auto">
			<v-col v-for="(day,dayIndex) in allData" :key="day.id">
				<v-card
					class="mx-auto col-8"
					max-width="400"
					:day="dayIndex"
				>
					<!--<v-img
						:src="day.image || 'https://source.unsplash.com/random/300x200'"
						height="200px"
					></v-img>-->

					<v-card-title>
						{{ new Date(day.classDate).getMonth() + 1 + "/" + new Date(day.classDate).getDate() }}
					</v-card-title>

					<v-card-subtitle>
						{{ new Date(day.classDate).toLocaleString('zh-TW', {weekday: "short"}) }}
						({{ day.classes.length }}堂課)
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
									:color="item.tagColor"
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

							<v-divider class="ma-3"></v-divider>
							<!--<v-list dense>
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
							</v-list>-->

							<h2 class="display-0 success--text pl-1">
								TODO:&nbsp;
								<v-fade-transition leave-absolute>
						<span :key="`tasks-${day.tasks.length}`">
							{{ day.tasks.length }}
						</span>
								</v-fade-transition>
							</h2>

							<v-row
								class="my-1"
								align="center"
							>
								<strong class="mx-4 info--text text--darken-2">
									剩下: {{ remainingTasks }}
								</strong>

								<v-divider vertical></v-divider>

								<strong class="mx-4 success--text text--darken-2">
									完成: {{ completedTasks }}
								</strong>

								<v-spacer></v-spacer>

								<v-progress-circular
									:value="progress"
									class="mr-2"
								></v-progress-circular>
							</v-row>

							<v-divider class="mb-4"></v-divider>

							<v-card v-if="day.tasks.length > 0">
								<v-slide-y-transition
									class="py-0"
									group
									tag="v-list"
								>
									<template v-for="(task, i) in day.tasks">
										<v-divider
											v-if="i !== 0"
											:key="`${i}-divider`"
										></v-divider>

										<v-list-item :key="`${i}-${task.text}`">
											<v-list-item-action>
												<v-checkbox
													v-model="task.done"
													@change="changeStatus(i)"
													:color="task.done && 'grey' || 'primary'"
												>
													<template v-slot:label>
														<div
															:class="task.done && 'grey--text' || 'primary--text'"
															class="ml-4"
															v-text="task.text"
														></div>
													</template>
												</v-checkbox>
											</v-list-item-action>

											<v-spacer></v-spacer>

											<v-scroll-x-transition>
												<v-icon
													v-if="task.done"
													color="success"
												>
													mdi-check
												</v-icon>
											</v-scroll-x-transition>
										</v-list-item>
									</template>
								</v-slide-y-transition>
							</v-card>
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
import store from "@/store";
export default {
	name: 'Home',
	components: {
	},
	data: () => ({
		allData: store.state.allData,
		dayIndex: 0,
		tasks: store.state.allData.map(x=>x.tasks).flat(),
		errors:[]
	}),
	methods: {
		moment,
		changeStatus(taskIndex){
			store.commit('taskStatus', {
				taskIndex,
				dayIndex: this.dayIndex
			})
			this.allData= store.state.allData
			this.tasks  = store.state.allData.map(x=>x.tasks).flat();
			console.log(this.dayIndex+" "+taskIndex)
		}
	},
	computed:{
		completedTasks () {
			return this.allData[this.dayIndex].tasks.filter(task => task.done).length
		},
		progress () {
			return this.completedTasks / this.allData[this.dayIndex].tasks.length * 100
		},
		remainingTasks () {
			return this.allData[this.dayIndex].tasks.length - this.completedTasks
		},
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