
var app = new Vue({
    el: '#app',
    data: {
        checked: true,   
        tasks: [],
        storeStatus:'',
        temptask : '',
        filterBy :{
            date:'',
            taskName:'',
            taskComment:'',
        },
        task: {
            name:'',
            comments: '',
            priority: '',
            deadline: '',
            due_date: '',
            completed: false,
            token:localStorage.getItem('token'),
        },
        
    },
    methods:{

        /**
         * Get the working task and set its details to temptask
         * @param {*} taskId 
         */
         editTask(taskId)
        {
            this.temptask = this.tasks[taskId]                 
        },

        /**
         * 
         */
        saveTaskChanges(){
            axios.post('https://upster.co.uk/tasks-manager/update', this.temptask).then((response)=>{
               if(response.data){
                   this.getTasks()
               }
            })
        },

        /**
         * Retrieving data
         */
        getData(){
            
              axios.post('https://upster.co.uk/tasks-manager/create',this.task).then(result => {
                if(result.data.status==200){
                    this.tasks.push(result.data.task);
                }
              });
              this.storeStatus = this.task.priority;
              this.clearData()
              $('.bd-example-modal-lg').modal('hide')
        },
        /**
         * Clears the form
         */
        clearData(){

            this.task= {
                name:'',
                comments: '',
                priority: '',
                deadline: '',
                due_date: '',
                completed: false,
                token : localStorage.getItem('token'),
    
            }
        },
        /**
         * Changes the task status
         * @param {*} index 
         */
        toggleTask(index){
            this.tasks[index].completed = !this.tasks[index].completed
           
            axios.post('https://upster.co.uk/tasks-manager/update',this.tasks[index]).then(result => console.log(result))
            

        },
        getPriorityLevel(index){
            if(this.tasks[index].priority == 'high'){
                return 'border-danger'
            }else if(this.tasks[index].priority == 'med'){
                return 'border-warning'
            }else if(this.tasks[index].priority == 'low'){
                return 'border-success'
            }
        },
        deleteTask(index){
            var confirmation = confirm('Are you sure ?');
            if(confirmation == false){
                return false
            }
            axios.post( 'https://upster.co.uk/tasks-manager/delete',this.tasks[index] ).then(result => {
                    if(result.data.status == 200){
                        this.tasks.splice(index,1);
                    }
               }
           )
          
        
        },
        getAllTasks(){
            axios.post('https://upster.co.uk/tasks-manager/allTasks',{token: localStorage.getItem('token')}).then(result => {
             this.tasks=result.data}
        )
        },

        getTasks(){
            axios.post('https://upster.co.uk/tasks-manager/tasks',{token: localStorage.getItem('token'),date: this.filterBy.date}).then(result => {
             this.tasks=result.data
            })
        },
        logOut(){
            localStorage.clear();
            window.location.assign('index.html')
        },


    },
    computed:{

        danger(){
            return this.storeStatus == 'high'
        },
        warning(){
            return this.storeStatus == 'med'
        },
        success(){
            return this.storeStatus == 'low'
        },
    },
    mounted(){
        this.getTasks()
    },
    created(){
        if(!localStorage.getItem('token')){
            window.location.assign('index.html')
        }
    }


  })


