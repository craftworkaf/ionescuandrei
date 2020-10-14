var app = new Vue({
    el:"#registerPanel",
    data:{
        user:"",
        pass:"",
        confirmPass:"",
    },
    methods:{
        checkFields(){
            if(this.user == ''|| this.pass == '' || this.confirmPass !== this.pass){
                alert('please check details');
                return false;
            }

            return true
        },
        registerDetails(){
            if(this.checkFields()){
                axios.post('https://upster.co.uk/shopping-list-manager/admin/register',{name: this.user, password: this.pass}).then(result =>{
                if(result.data.status == 200){    
                    localStorage.setItem('token', result.data.token);
                    window.location.assign('task-manager.html')
                }else{
                    alert(result.data)
                 }
            })

            }
        }
    }

})