<template>
  <v-layout>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img class="image-uploader__preview" :src="imageUrl" height="150" v-if="imageUrl"/>
      <v-text-field 
        label="Select Image"
        @click='pickFile'
        v-model='imageName'
        prepend-icon='attach_file'
        :rules="[v => !!v || 'You need to upload an image']"
        lazy-validation
      />
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      >
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Hello World!</v-card-title>
        <v-card-text>Image Upload Script in VUE JS
          <hr>Yubaraj Shrestha
          <br>http://yubarajshrestha.com.np/</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { EventBus } from '@/js/eventbus'

export default {
  name: 'image-uploader',
  methods: {
    pickFile: function () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] === undefined) {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
        return
      }
      this.imageName = files[0].name
      if (this.imageName.lastIndexOf('.') <= 0) {
        return
      }
      const fr = new FileReader()
      fr.readAsDataURL(files[0])
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result
        this.imageFile = files[0] // this is an image file that can be sent to server...
        EventBus.$emit('member-image-uploaded-event', {
          imageName: this.imageName,
          imageUrl: this.imageUrl,
          imageFile: this.imageFile
        })
      })
    }
  },
  data: function () {
    return {
      title: 'Image Upload',
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  }
}
</script>
<style scoped>
  .image-uploader__preview {
    border-radius: 50%;
  }
</style>


