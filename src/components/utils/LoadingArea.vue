<template>
  <v-card :height="`${this.height}px`"
    class="loading-area"
    v-bind:class="{'loading-area__marged': marged}"
    tile
    flat
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
    marged: {
      type: Boolean,
      required: false,
      default: false
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
    background: #545454;
  }

  .loading-area__marged {
    margin: 4px 8px;
  }
</style>


