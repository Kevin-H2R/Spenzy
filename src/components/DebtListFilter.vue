<template>
  <v-autocomplete
    v-model="filteredUsers"
    :items="users"
    chips
    clearable
    color="blue-grey lighten-2"
    label="Filter"
    item-text="name"
    item-value="id"
    multiple
    hide-selected
    single-line
    @change="filterChanged"
  >
    <template
      slot="selection"
      slot-scope="data"
    >
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        outline
        color="white"
        @input="remove(data.item)"
      >
        <v-avatar style="margin: 0; margin-left:-12px">
          <img style="width: 20px;height:20px;" :src="data.item.img">
        </v-avatar>
        <span style="font-size: 12px">
          {{ data.item.name }}
        </span>
      </v-chip>
    </template>
    <template
      slot="item"
      slot-scope="data"
    >
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <img :src="data.item.img">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import { EventBus } from '@/js/eventbus'

export default {
  name: 'debt-list-filter',
  props: {
    participatingUsers: {
      type: Array,
      required: true
    }
  },
  watch: {
    participatingUsers: function (newValue, oldValue) {
      this.users = newValue
    }
  },
  methods: {
    remove (item) {
      const index = this.filteredUsers.indexOf(item.id)
      if (index >= 0) {
        this.filteredUsers.splice(index, 1)
      }
    },
    filterChanged: function () {
      EventBus.$emit('debt-list-filter-changed', this.filteredUsers)
    }
  },
  data: function () {
    return {
      filteredUsers: [],
      users: this.participatingUsers
    }
  }
}
</script>

