<template>
	<v-container fluid>
		<v-row dense class="col-auto">
			<v-col cols="12" >
				<validation-observer
					ref="observer"
					v-slot="{ invalid }"
				>
				<v-form ref="form">
					<validation-provider
						v-slot="{ errors }"
						name="Name"
						rules="required"
					>
						<v-text-field
							v-model="name"
							:counter="10"
							:error-messages="errors"
							label="Name"
							required
						></v-text-field>
					</validation-provider>
					<v-btn
						class="mr-4"
						type="submit"
						:disabled="invalid"
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
import {ValidationObserver,ValidationProvider} from "vee-validate";

extend('required', {
	...required,
	message: '{_field_} can not be empty',
})
export default {
	name: 'Add',
	components: {

		ValidationObserver,
		ValidationProvider
	},
	data: () => ({
		name:""
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