<template>
  <v-card :height="`${this.height}px`"
    class="loading-area"
    tile
    flat
    :style="{margin: this.margin}"
    color="grey darken-2"
  >
  </v-card>  
</template>
<script>
export default {
  name: 'loading-area',
  props: {
    height: {
      type: Number,
      required: false,
      default: 150
    },
    margin: {
      type: String,
      required: false,
      default: '0'
    }
  }
}
</script>
<style scoped>
  @keyframes loadingArea {
    from {
      opacity: 0;
    }
    to {
      opacity: 100;
    }
  }

  .loading-area {
    animation-duration: 800ms;
    animation-name: loadingArea;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
</style>


