<template>
	<v-container fluid>
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
							<v-text-field
								v-model="name"
								:counter="10"
								:error-messages="errors"
								label="課程名稱"
								prepend-icon="mdi-text"
								required
							></v-text-field>
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
import {v4 as uuidv4} from "uuid"

extend('required', {
	...required,
	message: '{_field_} 不能是空白的!',
})
export default {
	name: 'Add',
	components: {
		ValidationObserver,
		ValidationProvider
	},
	data: () => ({
		name: "",
		classDate: "",
		type: 'hex',
		tagColor: '#FF00FF',
		types: ['hex'],
	}),
	methods: {
		moment,
		add() {
			store.commit('add', {
				id: uuidv4(),
				tagColor: this.tagColor,
				name: this.name,
				classDate: this.classDate,
				flex: 6,
				date: new Date(this.classDate),
				show: false,
				classes: [{
					time: {
						type: "absolute",
						startTime: new Date(),
						endTime: moment(new Date()).add(5, 'hours')
					},
					text: this.name
				}]
			})
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