<template>
  <v-app>
    <v-app-bar elevation="0" color="red" app dense clipped-left>

      <v-btn small icon color="white" @click="switchNavigation">
        <v-icon small>fas fa-bars</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-avatar color="primary" size="40">
        AML

      </v-avatar>

    </v-app-bar>


    <v-navigation-drawer app clipped v-model="drawer" :mini-variant.sync="mini" permanent>


      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>

      
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Nuevo</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar elevation= "0"
              color="primary"
              dark
            >Crear nuevo producto</v-toolbar>
            <v-card-text>
             <v-text-field outlined class="my-2" label='Nombre' v-model="name" >
              
             </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                color="success"
                @click="save();dialog.value=false"
              >Crear</v-btn>
              <v-btn
                text
                color="error"
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-data-table :headers="headers" :items="products" :items-per-page="5" class="elevation-1"></v-data-table>
    </v-main>
  </v-app>


</template>



<script>
import axios from "axios"
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'fas fa-home' },
          { title: 'My Account', icon: 'fas fa-user-alt' },
          { title: 'Users', icon: 'fas fa-users' },
        ],
        mini: true,
        headers: [
          {text: "ID" ,value:"id", sortable:false},
          {text: "UUID", value:"uuid"},
          {text: "NAME", value:"name"},
          {text:"CREATE DATE", value:"createdAt"},
          {text:"UPDATE CREATE", value:"updatedAt"}
        ],
        name:null,
      
      products: []
      }
    },
    methods:{
      switchNavigation(){
      this.mini = !this.mini
      },
     async save(){
      var res= await axios.post("http://192.168.100.30:3000/product/save",{name:this.name})
      this.getall()
      this.name= null
      
      console.log(res);
    } ,
    async getall(){
      var res= await axios.get("http://192.168.100.30:3000/product/all")
      this.products = res.data
    }
    },
    created:async function(){
      this.getall()
    }

  }
</script>
