<template>
  <v-dialog v-model="addSpendingDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add spending</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>          
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="spenzierArray"
                  item-text="name"
                  item-value="id"
                  label="Spenzier"
                  required
                  v-model="spenzier"
                  prepend-icon="face"
                  :rules="itemRule"
                  clearable
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Title"
                  v-model="title"
                  prepend-icon="title"
                  clearable
                  required
                  :rules="itemRule"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  type="number"
                  label="Amount"
                  v-model="amount"
                  prepend-icon="attach_money"
                  clearable
                  required
                  :rules="[v => !!v || 'Please fill this field', v => /^\d+(\.\d(\d)?)?$/.test(v) || 'Amount must contains only digits']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <v-menu
                  ref="dateMenu"
                  :close-on-content-click="false"
                  v-model="dateMenu"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Date"
                    prepend-icon="event"
                    readonly
                    clearable
                    required
                    :rules="itemRule"
                  ></v-text-field>
                  <v-date-picker v-model="date" @input="$refs.dateMenu.save(date)"></v-date-picker>

                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="clearFields">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="addSpending" :disabled="!valid">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { EventBus } from '@/js/eventbus'
export default {
  name: 'add-spending-modal',
  props: {
    spenzierArray: {
      type: Array,
      required: true
    }
  },
  created: function () {
    EventBus.$on('open-spending-modal', (data) => {
      this.addSpendingDialog = true
      this.spenzier = data
      this.date = this.todayDate()
    })
  },
  methods: {
    clearFields: function () {
      this.addSpendingDialog = false
      this.spenzier = null
      this.title = null
      this.amount = null
      this.date = this.todayDate()
      this.$refs.form.reset()
    },
    addSpending: function () {
      if (this.$refs.form.validate()) {
        EventBus.$emit(
          'add-spending-event',
          {id: this.spenzier, spending: {title: this.title, amount: parseFloat(this.amount), date: this.date}}
        )
        // TODO: POST to server API
        this.clearFields()
      }
    },
    todayDate: function () {
      return new Date().toJSON().slice(0, 10)
    }
  },
  data: function () {
    return {
      addSpendingDialog: false,
      dateMenu: false,
      spenzier: null,
      title: null,
      amount: null,
      date: this.todayDate(),
      valid: true,
      itemRule: [v => !!v || 'Please fill this field']
    }
  }
}
</script>


