<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-xl">
                    <v-card-title>
                        <v-row justify="space-between">
                            <v-col cols="5">
                                <v-text-field outlined dense clearable hide-details></v-text-field>
                            </v-col>
                            <v-col cols="3" class="d-flex justify-end">
                                <v-btn @click="dialog=true">
                                    <v-icon small class="pr-2">
                                        fas fa-plus
                                    </v-icon>
                                    New Brand
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="brands" class="elevation-0 mt-3" :search="search" >
                        <template v-slot:top>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:[`item.image`]="{ item }">
                           
                            <v-avatar height="40" min-width="40" width="40">
                             <v-img :src="'http://192.168.100.30:3000/'+item.image"></v-img>
                            </v-avatar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">

                            <v-icon small class="mr-2" @click="editItem(item)">
                                fas fa-edit
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                fas fa-trash-alt
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="500" class="rounded-xl">
            <v-card elevation="0">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="6">
                            <v-card height="250" elevation="0" class="d-flex align-center elevation-0" v-if="editedItem.image">
                                <v-img src="https://www.ret.ec/wp-content/uploads/2022/05/Nestle.png" v-if="!editedItem.image"></v-img>
                                <v-hover  v-else v-slot="{ hover }">
                                    <v-img :src="$store.state.baseUrl+'/'+editedItem.image">
                                    <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out  darken-2 v-card--reveal text-h2 white--text"
           
          >
            <v-row no-gutters align="end ">
                <v-col cols="6"> <v-btn block @click="uplodadImage()"><v-icon>fas fa-redo-alt</v-icon> </v-btn></v-col>
                <v-col cols="6"> <v-btn block> <v-icon>fas fa-backspace</v-icon> </v-btn> </v-col>    
            </v-row>
          </div>
        </v-expand-transition>
                                    </v-img>
                                    
                                </v-hover>
                            </v-card>
                            <v-card height="250" outlined @click="uplodadImage" v-else>
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
                            <input type="file" accept="image/*" ref="imageUpload" @change="imagetoupload" style="display:none;">
                        </v-col>
                        <v-col cols="6">
                            <v-container fill-height class="d-flex align-start">
                                <v-row no-gutters style="height:inherit!important;">
                                    <v-col cols="12" class="d-flex align-center">
                                        <div class="mx-2">
                                            <v-row>
                                                <v-card-title>
                                                    New Brand
                                                </v-card-title>
                                                <v-col cols="12" class="d-flex align-center">
                                                    <v-text-field outlined dense hide-details="auto" label="Brand name" v-model="editedItem.name"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-container>
                        <v-row justify="end">
                            <v-btn text class="mx-1" color="error">
                                Close
                            </v-btn>
                            <v-btn text color="success" @click="saveBrand()">
                                Save
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data:()=>({
        search:null,
        editedIndex: -1,
        editedItem:{
            name:'',
            uuid:'',
            image:null
        },
        dialogDelete:false,
        uploadImage:null,
        previewImage:null,
        brandName:null,
        headers:[
            {
                text:'Avatar',
                value:'image',
                sortable:false
            },
            {
                text:'Uuid',
                value:'uuid'
            },
            {
                text:'Name',
                value:'name'
            },
            {
                text:'Created At',
                value:'createdAt'
            },
            {
                text:'Updated At',
                value:'updatedAt'
            },
            {
                text:'Actions',
                value:'actions',
                sortable:false
            }
        ],
        brands:[
        ],
        dialog:false
    }),
    methods:{
        closeDelete(){
            this.dialogDelete = false
        },
        deleteItemConfirm(){},
        uplodadImage(){
            this.$refs.imageUpload.click();
        },
        imagetoupload(){
            this.uploadImage = this.$refs.imageUpload
            this.editedItem.image = URL.createObjectURL(this.uploadImage.files.item(0))
        },
        async saveBrand(){
            let formData = new FormData()
            formData.append("file",this.uploadImage==null ?null: this.uploadImage.files.item(0))
            formData.append("nameBrand",this.editedItem.name)
            var response = await this.$provider.saveBrand(formData)
            this.brands.push (response.data)
            this.dialog= false
            console.log(response);
        },
        initialize(){
            this.getAll()
        },
       async getAll(){
var getall = await this.$provider.getBrandsAll()
    this.brands = getall.data
        },
        editItem(item){
            this.editedIndex = this.brands.indexOf(item)
            this.editedItem =Object.assign({},item)
            this.dialog = true
        }
    }
    ,
    mounted: async function(){
    this.getAll()
    }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>