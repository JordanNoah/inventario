<template>
    <v-container fuild fill-height>
     <v-app-bar dense flat app >
        <v-btn icon @click="openNavigation()">
            <v-icon small>
                fa-solid fa-bars
            </v-icon>
        </v-btn>
            <v-spacer></v-spacer>
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar color="primary" size="35" class="white--text" v-bind="attrs" v-on="on">
                        BB
                    </v-avatar>
                </template>

                <v-card>
                    <v-list >
                        <v-list-item link @click="changeTheme()">
                            <v-list-item-avatar>
                                <v-avatar >
                                    <v-icon v-if="$vuetify.theme.isDark" > fa-solid fa-moon</v-icon>
                                    <v-icon v-else>fa-regular fa-sun</v-icon>
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content >
                                <v-list-item-title v-if="$vuetify.theme.isDark" >
                                    darkmode
                                </v-list-item-title>
                                <v-list-item-title v-else>
                                    lightmode
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text block @click="closeSession">Cerrar sesion</v-btn>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>

        </v-app-bar>
        <v-navigation-drawer permanet app :mini-variant="openNavigationDrawer"  :expand-on-hover="openNavigationDrawer" >
            <v-list >
                
                <v-list-item-group  color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.path">
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
            
      items: [
        { text: 'Home', icon: 'fas fa-home' ,path: '/main/home' },
        { text: 'Posts', icon: 'fa-shopping-cart', path:'/main/posts' },
        { text: 'Branch offices', icon: 'fas fa-city', path:'/main/branchOffice' },
        {text: 'Products', icon: 'fab fa-product-hunt', path:'/main/products'},
        {text:'InternalProducts', icon:'fab fa-sketch', path:'/main/internalProducts'} ],
        openNavigationDrawer:false
        }),
        methods: {
            closeSession() {
                console.log("aqui va la peticion de cerrar sesion axios");
                this.$router.push({
                    name: 'Login'
                })
            },changeTheme(){
               this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            },
            openNavigation(){
            this.openNavigationDrawer= !this.openNavigationDrawer
            }

        }
    }
</script>