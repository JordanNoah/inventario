<template>
    <v-container fluid fill-height>
        <v-app-bar  flat app>
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
                    <v-list>
                        <v-list-item link @click="changeTheme()">
                            <v-list-item-avatar>
                                <v-avatar>
                                    <v-icon v-if="$vuetify.theme.isDark" small> fa-solid fa-moon</v-icon>
                                    <v-icon v-else small>fa-regular fa-sun</v-icon>
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-if="$vuetify.theme.isDark">
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
        <v-navigation-drawer app :mini-variant="openNavigationDrawer"
            :expand-on-hover="openNavigationDrawer" class="navigationmain" floating>
            <div class="pa-4">
                <div v-if="$vuetify.theme.isDark" style="height:35px">
                    <img src="@/assets/logodashboard.svg" style='height:inherit' />
                </div>
                <div v-else style="height:35px">
                    <img src="@/assets/logodashboarddark.svg" style='height:inherit' />
                </div>
            </div>
            <v-list nav dense >
                <v-list-item link v-for="(item,i) in items" :key="i" :to="item.path" color="primary">
                    <v-list-item-icon class="d-flex justify-center">
                        <v-icon small>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main style="height:inherit;">
            
                <router-view />
            
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
        { text: 'Products', icon: 'fab fa-product-hunt', path:'/main/products' },
        { text:'Internal Products', icon:'fab fa-sketch', path:'/main/internalProducts' },
        { text: 'Brands', icon:'fas fa-copyright', path:'/main/brands' }
        ],
        openNavigationDrawer:true
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

<style>
.logomain{
    height:30px;
    overflow: hidden;
}


</style>