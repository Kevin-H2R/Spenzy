<template>
  <v-layout row wrap align-center>
    <v-flex xs12 md8 lg8>
      <v-container fluid grid-list-sm class="group-page__grid-container">
        <v-layout row wrap>
          <v-flex
            v-for="(item, index) in items" :key="index"
            xs12 sm6
          >
            <user-card v-bind="item" />
          </v-flex>
          <v-flex xs12 sm-8 offset-sm2>
            <add-member-modal />
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
        id: this.items[this.items.length - 1].id + 1,
        name: data.name,
        img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
        spendings: []
      })
    })
  },
  computed: {
    spenzierArray: function () {
      return this.items.map(data => { return {id: data.id, name: data.name} })
    }
  },
  data: function () {
    return {
      items: [
        {
          id: 1,
          name: 'Pierre',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: [
            { title: 'Courses auchan', amount: 125.39, date: '25/08/2018' },
            { title: 'Courses carrefour', amount: 12.25, date: '26/08/2018' },
            { title: 'Courses leclerc', amount: 45, date: '27/08/2018' },
            { title: 'Courses casino', amount: 12.89, date: '28/08/2018' },
            { title: 'Courses super u', amount: 21.02, date: '29/08/2018' },
            { title: 'Courses intermarché', amount: 42, date: '23/08/2018' }
          ]
        },
        {
          id: 2,
          name: 'Jean',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: [
            { title: 'Courses auchan', amount: 125.35, date: '25/08/2018' },
            { title: 'Courses carrefour', amount: 12.25, date: '26/08/2018' },
            { title: 'Courses leclerc', amount: 45, date: '27/08/2018' },
            { title: 'Courses casino', amount: 12.89, date: '28/08/2018' },
            { title: 'Courses super u', amount: 21.02, date: '29/08/2018' },
            { title: 'Courses intermarché', amount: 42, date: '23/08/2018' }]
        },
        {
          id: 3,
          name: 'Yves',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: []
        },
        {
          id: 4,
          name: 'Kevin',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: []
        },
        {
          id: 5,
          name: 'Jacques',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: []
        },
        {
          id: 6,
          name: 'Adrien',
          img: 'https://yt3.ggpht.com/a-/ACSszfH-TGySV8bcz1a_rF-2cS0XVvkDEaA27r6qwQ=s900-mo-c-c0xffffffff-rj-k-no',
          spendings: []
        }
      ],
      modalVisible: false
    }
  }
}
</script>
<style scoped>
  .group-page__grid-container {
    padding-top: 0;
  }
</style>


