<template>
  <div>
    <debt-list-filter :participatingUsers="items"/>
    <v-list two-line>
      <span v-for="(item, index) in getDebtList" :key="index">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-list-tile-content class="debt-list__user-container">
              <v-list-tile-title class="debt-list__avatar">
                <img class="debt-list__image" :src="item.giver.img"/>
              </v-list-tile-title>
              <v-list-tile-sub-title class="debt-list__name">
                {{ item.giver.name }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="debt-list__middle-text">{{ item.amount }}€</v-list-tile-title>
            <v-list-tile-sub-title class="debt-list__middle-text">
              <v-icon>arrow_right_alt</v-icon>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-list-tile-content class="debt-list__user-container">
              <v-list-tile-title class="debt-list__avatar">
                <img class="debt-list__image" :src="item.receiver.img"/>
              </v-list-tile-title>
              <v-list-tile-sub-title class="debt-list__name">
                {{ item.receiver.name }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile-avatar>
        </v-list-tile>
        <v-divider v-if="index < getDebtList.length - 1"/>
      </span>
    </v-list>
  </div>
</template>
<script>
import DebtListFilter from '@/components/DebtListFilter'
import { EventBus } from '@/js/eventbus'

export default {
  name: 'debt-list',
  components: { DebtListFilter },
  props: {
    debtItems: {
      type: Array,
      required: true
    }
  },
  created: function () {
    EventBus.$on('debt-list-filter-changed', data => {
      this.filtered = data
    })
  },
  computed: {
    getDebtList: function () {
      const usersTotals = this.items.map(data => {
        const userTotalSpent = data.spendings.reduce((accumulated, current) => {
          return parseFloat(accumulated) + parseFloat(current.amount)
        }, 0)
        return {
          user: {id: data.id, name: data.name, img: data.img},
          total: Number.parseFloat(userTotalSpent.toFixed(2))
        }
      })

      const totalSpent = usersTotals.reduce((accumulated, current) => {
        return accumulated + current.total
      }, 0)

      const totalDuePerUser = totalSpent / this.items.length
      const centsBasis = Math.floor(totalDuePerUser * 100)
      let extra = Math.round((totalDuePerUser * 100 % 1) * this.items.length)

      const userTotalDue = usersTotals.map(data => {
        data.due = data.total - (centsBasis / 100)
        if (extra > 0) {
          data.due -= 0.01
          --extra
        }
        data.due = Number.parseFloat(data.due).toFixed(2)
        return data
      })

      let resultActions = []
      let positiveUsers = userTotalDue.filter(data => data.due > 0)
      let negativeUsers = userTotalDue.filter(data => data.due < 0).map(data => {
        data.due = Math.abs(data.due)
        return data
      })

      while (negativeUsers.length > 0 && positiveUsers.length > 0) {
        let giver = negativeUsers.pop()
        let receiver = positiveUsers.pop()

        if (receiver.due >= giver.due) {
          receiver.due = Math.floor((receiver.due - giver.due) * 100) / 100
          positiveUsers.push(receiver)
          resultActions.push({giver: giver.user, receiver: receiver.user, amount: giver.due})
          continue
        }
        giver.due = Math.floor((giver.due - receiver.due) * 100) / 100
        negativeUsers.push(giver)
        resultActions.push({giver: giver.user, receiver: receiver.user, amount: receiver.due})
      }
      const filteredResult = resultActions.filter(data => {
        if (this.filtered.length === 0) {
          return true
        }
        return this.filtered.indexOf(data.giver.id) !== -1 ||
         this.filtered.indexOf(data.receiver.id) !== -1
      })
      return filteredResult
    }
  },
  methods: {
    filterClicked: function (userId) {
      this.filtered = userId
    }
  },
  data: function () {
    return {
      items: this.debtItems,
      fab: false,
      filtered: []
    }
  }
}
</script>
<style scoped>

  .debt-list__name {
    font-size: 10px;
    text-align: center;
  }

  .debt-list__middle-text {
    text-align: center;
  }

  .debt-list__avatar {
    width: 20px;
    height: 20px;
  }

  .debt-list__user-container {
    align-items: center;
  }

  .debt-list__name {
    font-size: 12px;
    width: 40px;
  }

</style>


