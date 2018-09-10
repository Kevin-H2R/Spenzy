<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex
              v-if="loading"
              v-for="i in 6"
              :key="i"
              xs12 sm6 md4 lg3
            >
              <loading-area marged/>
            </v-flex>
            <v-flex
              v-for="(item, index) in items"
              :key="index"
              xs12 sm6 md4 lg3
            >
              <v-card tile
                class="home-dashboard__item"
                :to="'/group/' + item.id"
                hover
                height="150px"
              >
                <v-container fill-height>
                  <v-layout column align-center justify-space-around>
                    <div class="home-dashboard__item-title">{{ item.name }}</div>
                    <div class="home-dashboard__count-container">
                      <v-icon class="home-dashboard__icon">face</v-icon>
                      <div class="home-dashboard__count">{{ item.personCount }}</div>
                    </div>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
          <add-card-modal/>
        </v-container>
         
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AddCardModal from '@/components/AddCardModal'
import LoadingArea from '@/components/utils/LoadingArea'
import { EventBus } from '@/js/eventbus'
import axios from 'axios'
import { api } from '@/js/config'

export default {
  name: 'home-dashboard',
  components: { AddCardModal, LoadingArea },
  created: function () {
    EventBus.$on('add-card-event', (data) => {
      this.items.push({name: data, personCount: 0})
    })
    axios.get(api + '/parties')
    .then((response) => {
      this.items = response.data
      this.loading = false
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  data: function () {
    return {
      fab: false,
      items: [],
      loading: true
    }
  }
}
</script>
<style scoped>
  .home-dashboard__item {
    margin: 4px 8px;
    background: #545454;
  }

  .home-dashboard__item-title {
    font-size: 24px;
  }

  .home-dashboard__count-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home-dashboard__icon {
    margin-right: 2px;
  }

  .home-dashboard__count {
    margin-left: 2px;
  }

</style>


