<template>
  <v-app dark>    

    <v-toolbar
      app
    >
      <v-btn flat icon @click.stop="drawer = !drawer">
        <v-icon>{{ displayedToolbarIcon }}</v-icon>
      </v-btn>
      <v-toolbar-items>
        <v-btn class="toolbar__button" flat to="/">{{ title }}</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer app
      v-model="drawer"
      absolute
      disable-resize-watcher
    >
      <v-list subheader>
        <v-list-tile to="/">
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
          to="/group"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          
          <v-list-tile-content class="navigation-drawer__person-count">
            <v-list-tile-title class="navigation-drawer__person-count">
              {{ item.personCount }}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>

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
export default {
  created: function () {
    EventBus.$on('add-card-event', (data) => {
      this.items.push({name: data, personCount: 0})
    })
  },
  computed: {
    displayedToolbarIcon: function () {
      return this.drawer ? 'arrow_back_ios' : 'menu'
    }
  },
  data () {
    return {
      title: 'Spenzy',
      drawer: false,
      items: [
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'Hello', personCount: 6},
        {name: 'World', personCount: 12}
      ]
    }
  },
  name: 'App'
}
</script>
<style>
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  .toolbar__button::before {
    opacity: 0;
  }

  .navigation-drawer__person-count {
    text-align: right;
    color: white;
  }
</style>

