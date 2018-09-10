<template>
  <v-layout row wrap align-center>
    <v-flex xs12 md8 lg8>
      <v-container fluid grid-list-sm class="group-page__grid-container">
        <v-layout row wrap>
          <v-flex
            v-for="(item, index) in items" :key="index"
            xs12 sm6
          >
            <transition name="remove-member">
              <user-card v-bind="item" v-show="item.visible"/>
            </transition>
          </v-flex>
          <v-flex xs12 sm8 offset-sm2>
            <add-member-modal :partyId="parseInt(this.$route.params.id)"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 md4 lg3 offset-lg1>
      <v-card>
        <v-container>
          <v-layout column align-center>
            <debt-list :debtItems="items"/>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <add-spending-modal :spenzierArray="spenzierArray"/>
  </v-layout>  
</template>
<script>
import UserCard from '@/components/UserCard'
import AddSpendingModal from '@/components/AddSpendingModal'
import DebtList from '@/components/DebtList'
import { EventBus } from '@/js/eventbus'
import AddMemberModal from '@/components/AddMemberModal'
import axios from 'axios'
import { api } from '@/js/config'

export default {
  name: 'group-page',
  components: { UserCard, AddSpendingModal, DebtList, AddMemberModal },
  created: function () {
    EventBus.$on('add-spending-event', (data) => {
      const item = this.items.filter(item => item.id === data.id)[0]
      item.spendings.push(data.spending)
    })
    EventBus.$on('add-member-to-group-event', (data) => {
      // API CALL Add member to group
      this.items.push({
        id: data.id,
        name: data.name,
        img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
        spendings: [],
        visible: true
      })
    })
    EventBus.$on('delete-member-event', (data) => {
      const item = this.items.filter(item => {
        return item.id === data
      })
      item[0].visible = false
      window.setTimeout(() => {
        this.items.splice(this.items.indexOf(item[0]), 1)
      }, 300)
    })

    axios.get(`${api}/parties/${this.$route.params.id}`)
    .then((response) => {
      this.items = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  },
  computed: {
    spenzierArray: function () {
      return this.items.map(data => { return {id: data.id, name: data.name} })
    }
  },
  data: function () {
    return {
      items: [],
      modalVisible: false
    }
  }
}
</script>
<style scoped>
  .group-page__grid-container {
    padding-top: 0;
  }
  
  .remove-member-leave-to {
    transition: all ease-in-out 300ms;
    opacity: 0;
  }
</style>


