<template>
  <v-card class="user-card">
    <v-container class="user-card__container">
      <v-layout column align-center>
        <img class="user-card__image" :src="img" alt="Member image">
        <div class="user-card__name">{{ name }}</div>
        <v-expansion-panel :disabled="spendings.length === 0">
          <v-expansion-panel-content>
            <div slot="header">
              <h2>{{ spendingsTotal }}€</h2>
            </div>
            <v-card>
              <v-list>
                <div v-for="(item, index) in spendings" :key="index">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-avatar>
                      {{ item.amount }}€
                    </v-list-tile-avatar>
                  </v-list-tile>
                  <v-divider v-if="index < spendings.length - 1"/>
                </div>
              </v-list>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-btn class="user-card__add-button" icon color="pink" v-on:click="addButtonClicked">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { EventBus } from '@/js/eventbus'
export default {
  name: 'user-card',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    spendings: {
      type: Array,
      required: true
    }
  },
  computed: {
    spendingsTotal: function () {
      const total = this.spendings.reduce((accumulated, current) => {
        return accumulated + current.amount
      }, 0)

      return Number.parseFloat(total).toFixed(2)
    }
  },
  methods: {
    addButtonClicked: function () {
      EventBus.$emit('open-spending-modal', this.id)
    }
  }
}
</script>
<style scoped>

  .user-card {
    background: #545454;
  }

  .user-card__image {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-bottom: 5px;
  }

  .user-card__name {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .user-card__total-amount {
    text-align: right;
  }

  .user-card__expansion-panel-header {
    display: flex;
  }

  .user-card__add-button {
    margin-top: 15px;
  }

  .user-card__container {
    padding-bottom: 10px;
  }
</style>

