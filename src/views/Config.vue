<template>
	<v-container fluid>
		<v-row dense class="col-auto">
			<v-col cols="12">
				<validation-observer
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form ref="form">
						<v-dialog
							ref="dialog"
							v-model="modal2"
							:return-value.sync="time"
							persistent
							width="290px"
						>
							<template v-slot:activator="{ on, attrs }">

								<v-text-field
									v-model="time"
									label="Picker in dialog"
									prepend-icon="mdi-clock-time-four-outline"
									readonly
									v-bind="attrs"
									v-on="on"
									:error-messages="errors"
								></v-text-field>
							</template>
							<v-time-picker
								v-if="modal2"
								v-model="time"
								full-width
							>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="modal2 = false"
								>
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.dialog.save(time)"
								>
									OK
								</v-btn>
							</v-time-picker>
						</v-dialog>

						<v-btn
							class="mr-4"
							type="submit"
							:disabled="invalid"
						>
							Set config
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
import {ValidationObserver, /*ValidationProvider*/} from "vee-validate";

extend('required', {
	...required,
	message: '{_field_} can not be empty',
})
export default {
	name: 'Config',
	components: {
		ValidationObserver,
		/*ValidationProvider*/
	},
	data: () => ({
		time: new Date(),
		modal2: false
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