<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-xl">
                    <v-card-title>
                        <v-row justify="space-between">
                            <v-col cols="5">
                                <v-text-field outlined dense clearable hide-details label="Search brands" v-model="search"></v-text-field>
                            </v-col>
                            <v-col cols="3" class="d-flex justify-end">
                                <v-btn @click="dialog=true" depressed>
                                    <v-icon small class="pr-2">
                                        fas fa-plus
                                    </v-icon>
                                    New Brand
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="brands" class="elevation-0 mt-3" :search="search">
                        <template v-slot:[`item.image`]="{ item }">

                            <v-avatar height="40" min-width="40" width="40">
                                <v-img :src="`${$store.state.baseUrl}/${item.image}`" contain></v-img>
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
        <v-dialog v-model="dialogDelete" max-width="290px" @keydown.esc="close()" @click:outside="close()">
                                <v-card>
                                    <v-card-title class="text-h6">Are you sure you want to delete this item {{editedItem.name}}?
                                    </v-card-title>
                                    <v-card-text>
                                        <v-img :src="`${$store.state.baseUrl}/${editedItem.image.url}`"></v-img>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete()">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
        <v-dialog v-model="dialog" width="500" class="rounded-xl" @click:outside="close()" @keydown.esc="close()">
            <v-card elevation="0">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="6">


                            <v-card class="d-flex align-center justify-center" elevation="0">
                                <v-hover v-if="editedItem.image.file || editedItem.image.url" v-slot="{ hover }">
                                    <v-card height="200" width="200" outlined>
                                        <v-img :src="editedItem.image.url" contain aspect-ratio="1"
                                            v-if="editedItem.image.file"></v-img>
                                        <v-img :src="`${$store.state.baseUrl}/${editedItem.image.url}`" contain
                                            aspect-ratio="1" v-else></v-img>

                                        <v-expand-transition>
                                            <div v-if="hover"
                                                class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal text-h2 white--text">
                                                <v-row no-gutters>
                                                    <v-col>
                                                        <v-btn block depressed tile @click="openFileSystem()">
                                                            <v-icon>
                                                                fas fa-image
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn block depressed tile @click="setDefaultImage()">
                                                            <v-icon>
                                                                fas fa-times-circle
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-expand-transition>

                                    </v-card>
                                </v-hover>
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
                                <v-file-input accept="image/*" style="display:none" v-model="editedItem.image.file" ref="fileSystem"></v-file-input>
                            </v-card>


                        </v-col>
                        <v-col cols="6">
                            <v-container fill-height class="d-flex align-start">
                                <v-row no-gutters style="height:inherit!important;">
                                    <v-col cols="12" class="d-flex align-center">
                                        <div class="mx-2">
                                            <v-row>
                                                <v-card-title>
                                                    {{editedIndex}}
                                                    {{editedIndex > -1 ? 'Edit Brand':'New Brand'}}
                                                </v-card-title>
                                                <v-col cols="12" class="d-flex align-center">
                                                    <v-text-field outlined dense hide-details="auto" label="Brand name"
                                                        v-model="editedItem.name"></v-text-field>
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
                            <v-btn text class="mx-1" color="error" @click="close()">
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
    data: () => ({
        search: null,
        editedIndex: -1,
        editedItem: {
            name: null,
            uuid: null,
            image: {
                file: null,
                url: null
            }
        },
        defaultItem: {
            name: null,
            uuid: null,
            image: {
                file: null,
                url: null
            }
        },
        dialogDelete: false,
        uploadImage: null,
        previewImage: null,
        brandName: null,
        headers: [{
                text: 'Avatar',
                value: 'image',
                sortable: false
            },
            {
                text: 'Uuid',
                value: 'uuid'
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Created At',
                value: 'createdAt'
            },
            {
                text: 'Updated At',
                value: 'updatedAt'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            }
        ],
        brands: [],
        dialog: false
    }),
    methods: {
        returnPreview() {
            if (!this.uploadImage) {
                return `${this.$store.state.baseUrl}/${this.editedItem.image}`
            } else {
                return this.editedItem.image
            }
        },
        closeDelete() {
            this.close()
        },
        deleteItem(item){
            this.editedIndex = this.brands.indexOf(item)
            this.editedItem.name = this.brands[this.editedIndex].name
            this.editedItem.image.url = this.brands[this.editedIndex].image
            this.editedItem.uuid = this.brands[this.editedIndex].uuid
            this.dialogDelete = true
        },
        async deleteItemConfirm() {
            var response = await this.$provider.deleteBrand(this.editedItem.uuid)
            if (response.data.delete) {
                this.brands.splice(this.editedIndex, 1)
            }
            this.close()
        },
        openFileSystem() {
            this.$refs.fileSystem.$el.lastChild.firstChild.firstChild.lastChild.click()
        },
        async saveBrand() {
            let formData = new FormData()

            if (this.editedItem.image.file) {
                formData.append("file", this.editedItem.image.file)
            } else {
                if (!this.editedItem.image.url) {
                    formData.append("file", null)
                } else {
                    formData.append("file", this.editedItem.image.url)
                }
            }

            formData.append("nameBrand", this.editedItem.name)

            if (!this.editedItem.uuid) {
                let response = await this.$provider.saveBrandPost(formData)
                if (response.data.created) {
                    this.brands.unshift(response.data.brand)
                }
            } else {
                let response = await this.$provider.saveBrandPut(this.editedItem.uuid, formData)
                if (response.data.update) {
                    console.log(response.data);
                    this.brands.splice(this.editedIndex,1, response.data.brand)
                }
                console.log(response);
            }
            this.close()
        },
        initialize() {
            this.getAll()
        },
        close() {
            this.dialog = false
            this.dialogDelete = false
            this.uploadImage = null
            this.editedItem.name = null
            this.editedItem.image.url = null
            this.editedItem.image.file = null
            this.editedItem.uuid = null
            this.editedIndex = -1
        },
        async getAll() {
            var getall = await this.$provider.getBrandsAll()
            this.brands = getall.data
        },
        setDefaultImage() {
            this.editedItem.image.file = null
            this.editedItem.image.url = null
        },
        editItem(item) {
            this.editedIndex = this.brands.indexOf(item)
            this.editedItem.name = this.brands[this.editedIndex].name
            this.editedItem.image.url = this.brands[this.editedIndex].image
            this.editedItem.uuid = this.brands[this.editedIndex].uuid
            this.dialog = true
        }
    },
    mounted: async function () {
        this.getAll()
    },
    watch:{
        'editedItem.image.file'(newVal){
            if(newVal){
                this.editedItem.image.url = URL.createObjectURL(newVal)
            }
        }
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