const app = new Vue({

    el:'#loginPanel',
    data:{
        user:'',
        password:'',
        token:'',
    },
    methods:{

        getLoginData(){
           if(this.validateLogin){
               axios.post('https://upster.co.uk/shopping-list-manager/admin/login',{user: this.user,password: this.password}).then(
                   result => {
                       console.log(result)
                   }
               )
           }
        },



    },
    computed:{
        validateLogin(){
            return  !this.user == "" && !this.password == "";
        }
    },

})