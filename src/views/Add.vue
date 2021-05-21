<template>
	<v-container fluid>
		<v-tabs>
			<v-tab>新增課程</v-tab>
			<v-tab>新增TODO</v-tab>

			<v-tab-item tabindex="1">

				<v-row dense class="col-auto">
					<v-col cols="12">
						<validation-observer
							ref="observer"
							v-slot="{ invalid }"
						>
							<v-form ref="form">
								<validation-provider
									v-slot="{ errors }"
									name="課程名稱"
									rules="required"
								>
									<v-combobox
										v-model="name"
										:items="allClass.map(x=>x.name)"
										@change="changeTagColor"
										cache-items

										hide-no-data
										label="課程名稱"
										prepend-icon="mdi-text"
										required

										:counter="10"
										:error-messages="errors"
									></v-combobox>
									<!--<v-text-field
										v-model="name"
										:counter="10"
										:error-messages="errors"
										label="課程名稱"
										prepend-icon="mdi-text"
										required
									></v-text-field>-->
								</validation-provider>

								<v-menu
									ref="menu"
									v-model="menu"
									:close-on-content-click="false"
									:return-value.sync="classDate"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="classDate"
											label="課程日期"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											required
										></v-text-field>
									</template>
									<v-date-picker
										v-model="classDate"
										no-title
										scrollable
									>
										<v-spacer></v-spacer>
										<v-btn
											text
											color="primary"
											@click="menu = false"
										>
											取消
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.menu.save(classDate)"
										>
											確認
										</v-btn>
									</v-date-picker>
								</v-menu>
								<v-menu
									ref="colorMenu"
									v-model="colorMenu"
									:close-on-content-click="false"
									:return-value.sync="tagColor"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="tagColor"
											label="標籤顏色"
											prepend-icon="mdi-circle"
											readonly
											v-bind="attrs"
											v-on="on"
											:color="tagColor"
											required
										></v-text-field>
									</template>
									<v-color-picker
										v-model="tagColor"
										no-title
										scrollable
										mode="hexa"
									>

									</v-color-picker>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="colorMenu = false"
									>
										取消
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.colorMenu.save(tagColor)"
									>
										確認
									</v-btn>
								</v-menu>
								<v-row>
									<v-col cols="12" sm="6">
										<v-dialog
											ref="dialog2"
											v-model="dialog2"
											:return-value.sync="startTime"
											width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="startTime"
													label="起始時間"
													prepend-icon="mdi-clock-time-four-outline"
													readonly
													v-bind="attrs"
													v-on="on"
													:error-messages="errors"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="dialog2"
												v-model="startTime"
												full-width
											>
												<v-spacer></v-spacer>
												<v-btn
													text
													color="primary"
													@click="dialog2 = false"
												>
													Cancel
												</v-btn>
												<v-btn
													text
													color="primary"
													@click="$refs.dialog2.save(startTime)"
												>
													OK
												</v-btn>
											</v-time-picker>
										</v-dialog>
									</v-col>
									<v-col cols="12" sm="6">
										<v-dialog
											ref="dialog3"
											v-model="dialog3"
											:return-value.sync="endTime"
											width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="endTime"
													label="結束時間"
													prepend-icon="mdi-clock-time-four-outline"
													readonly
													v-bind="attrs"
													v-on="on"
													:error-messages="errors"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="dialog3"
												v-model="endTime"
												full-width
											>
												<v-spacer></v-spacer>
												<v-btn
													text
													color="primary"
													@click="dialog3 = false"
												>
													Cancel
												</v-btn>
												<v-btn
													text
													color="primary"
													@click="$refs.dialog3.save(endTime)"
												>
													OK
												</v-btn>
											</v-time-picker>
										</v-dialog>
									</v-col>
								</v-row>

								<v-btn
									class="mr-4"
									type="submit"
									:disabled="invalid"
									@click="add"
								>
									Add
								</v-btn>
							</v-form>

						</validation-observer>
					</v-col>
				</v-row>
			</v-tab-item>

			<v-tab-item tabindex="2">
				<v-text-field
					v-model="newTask"
					label="What are you working on?"
					solo
					@keydown.enter="create"
				>
					<template v-slot:append>
						<v-fade-transition>
							<v-icon
								v-if="newTask"
								@click="create"
							>
								add_circle
							</v-icon>
						</v-fade-transition>
					</template>
				</v-text-field>

			</v-tab-item>
		</v-tabs>

		<v-dialog
			v-model="dialog"
			max-width="290"
		>
			<v-card>
				<v-card-title class="headline">
					已新增課程
				</v-card-title>

				<v-card-text>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="green darken-1"
						text
						@click="redirect"
					>
						OK
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
// @ is an alias to /src
//let i=0;
import moment from 'moment';
import {extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'
import {ValidationObserver, ValidationProvider} from "vee-validate";
import store from "@/store";
//import {v4 as uuidv4} from "uuid"

extend('required', {
	...required,
	message: '必須填入{_field_}!',
})
export default {
	name: 'Add',
	components: {
		ValidationObserver,
		ValidationProvider
	},
	data: () => ({
		name: "",
		classDate: moment(new Date()).format("yyyy-MM-DD"),
		type: 'hex',
		tagColor: '#FF00FF',
		types: ['hex'],
		allClass: store.state.allClass,

		startTime: moment(new Date()).format("HH:mm"), //String
		endTime: moment(new Date()).add(50, 'minutes').format("HH:mm"),

		dialog: false,
		dialog2: false,
		dialog3: false
	}),
	methods: {
		moment,
		add() {
			store.commit('addClass', {
				classDate: this.classDate,
				flex: 6,
				tagColor: this.tagColor,
				name: this.name,
				time: {
					type: "absolute",
					startTime: this.startTime,
					endTime: this.endTime
				},
				text: this.name
			})
			this.dialog = true
		},
		redirect() {
			this.$router.push('/')
		},
		changeTagColor() {
			let _class = this.allClass.filter(x => x.name === this.name)
			console.log(_class)
			this.tagColor = _class[0].tagColor
		}
	},
	computed: {},
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