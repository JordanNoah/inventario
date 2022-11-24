<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-xl">
          <v-card-title>
            <v-row justify="space-between">
              <v-col cols="5">
                <v-text-field label="Search" outlined dense hide-details append-icon='fas fa-search' v-model="search">
                </v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex justify-end">
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2 text-none" v-bind="attrs" v-on="on">
                      <v-icon small class="pr-2">
                        fas fa-plus
                      </v-icon>
                      New Product
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-form ref="form" v-model="valid">
                              <v-autocomplete v-if="autocomplete" dense outlined :items="brandsEntries" label="Brand" v-model="autocompleteBrand" :search-input.sync="searchBrand" item-text="name" @keyup="brandmodel"></v-autocomplete>
                              <v-text-field v-model="editedItem.brand"></v-text-field>
                              <v-text-field v-model="editedItem.name" label="Name" outlined dense hide-details="auto"
                                :rules="name_rule"></v-text-field>
                            </v-form>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" class="elevation-0 mt-3"
            :search="search">
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
  </v-container>
</template>

<script>
 
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [{
          text: 'Uuid',
          align: 'start',
          sortable: false,
          value: 'uuid',
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Updated At',
          value: 'updatedAt'
        },
        {
          text: 'Created At',
          value: 'createdAt'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        brand:null,
        name: '',
        uuid: ''
      },
      defaultItem: {
        brand:null,
        name: '',
        uuid: ''
      },
      name_rule: [
        v => !!v || 'Name is required',

      ],
      valid: true,
      search: '',
      //todo lo del auto complete
      autocomplete:true,
      searchBrand:null,
      brandsEntries:[],
      autocompleteBrand:null
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
      async searchBrand(val){

        if(val.length == 0) return

        var response = await this.$provider.getBrandByParam(val)
        this.brandsEntries = response.data
        if (response.data.length == 0) {
          this.autocomplete = false
        }else{
          this.autocomplete = true
        }
      },
      autocompleteBrand(val){
        console.log(val);
      }
    },

    async created() {
      await this.initialize()
    },

    methods: {
      brandmodel(){
        this.editedItem.brand = this.searchBrand
        console.log(this.searchBrand);
      },
      async initialize() {
        var getall = await this.$provider.getProductsAll()
        console.log(getall);
        this.desserts = getall.data //
      },

      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm() {
        var del = await  this.$provider.deleteProducts(this.editedItem.uuid) 
        if (del.data.delete) {
          this.desserts.splice(this.editedIndex, 1)
        }

        this.closeDelete()
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save() {

        console.log(this.editedItem);

      },
    },
  }
</script>