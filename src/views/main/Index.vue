<template>
    <v-container fuild fill-height>
     <v-app-bar dense flat app clipped-left>
            <v-spacer></v-spacer>
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar color="primary" size="35" class="white--text" v-bind="attrs" v-on="on">
                        BB
                    </v-avatar>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-btn text block @click="closeSession">Cerrar sesion</v-btn>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>

        </v-app-bar>
        <v-navigation-drawer permanet app clipped>
            <v-list >
                
                <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i" @click="$router.push({name:item.path})">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    <v-main>
        <router-view/>
    </v-main>
    </v-container>


</template>


<script>
    export default {
        data: () => ({
            menu: false,
            selectedItem: 1,
      items: [
        { text: 'Home', icon: 'fas fa-home' ,path: 'Home' },
        { text: 'Posts', icon: 'fa-shopping-cart', path:'Posts' },
        { text: 'Branch offices', icon: 'fas fa-city', path:'BranchOffice' },
        {text: 'Products', icon: 'fab fa-product-hunt', path:'Products'},
        {text:'InternalProducts', icon:'fab fa-sketch', path:'InternalProducts'} ]
        }),
        methods: {
            closeSession() {
                console.log("aqui va la peticion de cerrar sesion axios");
                this.$router.push({
                    name: 'Login'
                })
            }
        }
    }
</script>