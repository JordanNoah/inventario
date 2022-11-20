<template>
  <v-container>
    <v-btn @click="dialog = true;objConfig.image.url = ''">
      abrir
    </v-btn>
    <v-dialog v-model="dialog" @click:outside="close()">
      <v-card>
        <v-card height="200" width="200" @click="openFileSystem()" v-if="objConfig.image.file || objConfig.image.url">
          <v-img :src="objConfig.image.url" contain aspect-ratio="1"></v-img>
        </v-card>
        <v-card height="200" width="200" outlined v-else @click="openFileSystem()">
          <v-container fill-height>
            <v-row align="center" justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-icon>
                  fas fa-cloud-upload-alt
                </v-icon>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <span>
                  Upload image
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <input type="file" accept="image/*" ref="fileSystem" @input="pickFile()">
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data:() =>({
    dialog:false,
    objConfig:{
      image:{
        file:null,
        url:null
      }
    }
  }),
  methods:{
    openFileSystem(){
      this.$refs.fileSystem.click()
    },
    pickFile(){
      let file = this.$refs.fileSystem.files
      if (file && file[0]) {
        this.objConfig.image.file = file.item(0)
        this.objConfig.image.url = URL.createObjectURL(file.item(0))
      }else{
        this.objConfig.image.file = null
        this.objConfig.image.url = ""
      }
    },
    close(){
      this.objConfig.image.file = null
      this.objConfig.image.url = ""
    }
  }
}
</script>