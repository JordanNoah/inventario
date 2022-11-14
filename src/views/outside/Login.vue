<template>
    <v-container fluid fill-height>
        <v-row justify="center">
            <v-col md= "5" sm="12" xl="3">
                <v-card>
                    <v-card-title>
                        Login
                    </v-card-title>
                   
                        <v-container>
                            <v-form ref="form" v-model="valid">
                                <v-text-field v-model="username" :rules="username_rule" outlined dense label=User>
                            </v-text-field>
                            <v-text-field v-model="password" :rules="password_rule" dense outlined label=Password></v-text-field>
                            </v-form>
                        </v-container>
                    
                    <v-card-actions class="d-flex justify-end">
                        <v-btn depressed color ="success" @click="startSession">
                            Log in
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    data: ()=>({
            username: null,
            password: null,
            username_rule: [
                v => !!v || 'Username is required'
            ],
            password_rule: [
                v=> !!v || 'Password is required',
                v=> (v && v.length >4 ) || 'Password is to short' //if else one line
            ],
            valid:true
        }
    ),
    methods:{
       startSession(){
        
         if(this.$refs.form.validate()){
            console.log("debe ir una peticion axios");
            this.$router.push({name:'Dashboard'})
         }
       }     
    }
}
</script>