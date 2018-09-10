<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="pink" dark>
        Add member
        <v-icon right>add_to_queue</v-icon>
      </v-btn>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Add member</span>
          </v-card-title>
          <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <image-uploader/>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field prepend-icon="label" label="Name"
                      v-model="memberName"
                      :rules="[v => !!v || 'Give the member a name']"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addMember" type="submit">Add</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import ImageUploader from '@/components/utils/ImageUploader'
import { EventBus } from '@/js/eventbus'
import axios from 'axios'
import { api } from '@/js/config'

export default {
  name: 'add-member-modal',
  components: { ImageUploader },
  props: {
    partyId: {
      type: Number,
      required: true
    }
  },
  created: function () {
    EventBus.$on('member-image-uploaded-event', (data) => {
      this.imageData = data
    })
  },
  methods: {
    addMember: function () {
      if (!this.$refs.form.validate()) {
        return
      }
      axios.post(`${api}/members`, {
        name: this.memberName,
        party: this.partyId
      })
      .then((response) => {
        this.dialog = false
        EventBus.$emit('add-member-to-group-event', {
          id: response.data.id,
          name: this.memberName,
          imageData: this.imageData
        })
        this.$refs.form.reset()
      })
    }
  },
  data: function () {
    return {
      dialog: this.visible,
      valid: false,
      memberName: '',
      imageData: null
    }
  }
}
</script>

