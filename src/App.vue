<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created:function(){
     console.log(process.env);
    this.$vuetify.theme.dark= true
  }
};
</script>
