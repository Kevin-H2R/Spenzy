<template>
  <v-app dark>    

    <v-toolbar
      app
    >
      <v-btn flat icon @click.stop="drawer = !drawer">
        <v-icon>{{ displayedToolbarIcon }}</v-icon>
      </v-btn>
      <v-toolbar-items>
        <router-link class="toolbar__link" to="/">{{ title }}</router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer app
      v-model="drawer"
      absolute
      disable-resize-watcher
    >
      <v-list subheader>
        <v-list-tile to="/" @click="drawer = false">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>  
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
        <v-subheader>Groups</v-subheader>
        <v-list-tile
          v-for="(item, index) in items" :key="index"
          :to="'/group/' + item.id"
          @click="drawer = false"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          
          <v-list-tile-content>
            <v-list-tile-title class="navigation-drawer__person-count">
              {{ item.personCount }}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-content class="navigation-drawer__person-icon">
            <v-list-tile-action>
              <v-icon>face</v-icon>
            </v-list-tile-action>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; H2R</span>
    </v-footer>
  </v-app>
</template>

<script>
import { EventBus } from '@/js/eventbus'
import axios from 'axios'
import { api } from '@/js/config'
export default {
  created: function () {
    EventBus.$on('add-card-event', (data) => {
      this.items.push({name: data, personCount: 0})
    })

    axios.get(api + '/parties')
    .then((response) => {
      this.items = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  computed: {
    displayedToolbarIcon: function () {
      return this.drawer ? 'keyboard_arrow_left' : 'menu'
    }
  },
  data () {
    return {
      title: 'SPENZY',
      drawer: false,
      items: []
    }
  },
  name: 'App'
}
</script>
<style>

  .navigation-drawer__person-icon .v-list__tile__action {
    min-width: 10px;
  }

  .list__tile--active .list__tile__action .icon {
    color: inherit;
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  .toolbar__link {
    color: white;
    text-decoration: none;
    align-self: center
  }

  .navigation-drawer__person-count {
    text-align: right;
  }

  .navigation-drawer__person-icon {
    flex-grow: 0;
    margin-left: 5px;
  }
</style>

