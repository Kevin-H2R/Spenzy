<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn
      color="pink"
      dark
      absolute
      bottom
      right
      fab
      slot="activator"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Add a group</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout column align-center>
                <v-text-field
                  autofocus
                  v-model="name"
                  label="Name"
                  outline
                  class="add-card-modal__input"
                  :rules="[v => !!v || 'Name is required']"
                />
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="addCard()" :disabled="!valid" type="submit">Add</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { EventBus } from '@/js/eventbus'
import axios from 'axios'
import { api } from '@/js/config'

export default {
  name: 'add-card-modal',
  methods: {
    addCard: function () {
      if (!this.$refs.form.validate()) {
        return
      }
      axios.post(api + '/parties', {
        name: this.name
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
      EventBus.$emit('add-card-event', this.name)
      this.dialog = false
      this.name = null
      this.$refs.form.reset()
    }
  },
  data: function () {
    return {
      dialog: false,
      valid: false,
      name: null
    }
  }
}
</script>
<style scoped>
  .add-card-modal__input {
    width: 100%;
  }
</style>


