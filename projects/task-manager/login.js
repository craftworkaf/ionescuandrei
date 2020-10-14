const app = new Vue({

    el:'#loginPanel',
    data:{
        user:'',
        password:'',
    },
    methods:{

        getLoginData(){
           if(this.validateLogin){
               axios.post('https://upster.co.uk/shopping-list-manager/admin/login',{user: this.user,password: this.password}).then(
                   result => {
                       
                       if(result.data.status == 200){
                       localStorage.setItem('token', result.data.token)
                       window.location.assign('task-manager.html')
                        }
                        else if(result.data.status == 401){
                            alert('bad results.')
                        }                     
                        
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