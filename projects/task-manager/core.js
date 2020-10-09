
var app = new Vue({
    el: '#app',
    data: {
        checked: true,   
        tasks: [],
        storeStatus:'',
        task: {
            name:'',
            comments: '',
            priority: '',
            deadline: '',
            due_date: '',
            completed: false

        }
    },
    methods:{
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
        },
        clearData(){

            this.task= {
                name:'',
                comments: '',
                priority: '',
                deadline: '',
                due_date: '',
                completed: false

    
            }
        },
        /**
         * Changes the task status
         * @param {*} index 
         */
        toggleTask(index){
            this.tasks[index].completed = !this.tasks[index].completed
           
            axios.post('https://upster.co.uk/tasks-manager/update',{
                taskId: this.tasks[index].id,
                name: this.tasks[index].name,
                comments: this.tasks[index].comments,
                priority: this.tasks[index].priority,
                dueDate: this.tasks[index].due_date,
                completed: this.tasks[index].completed,
            }).then(result => console.log(result))
            

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
            var confirmation = confirm('Are you suuure ?');
            if(confirmation == false){
                return false
            }
            axios.post('https://upster.co.uk/tasks-manager/delete',{taskId:this.tasks[index].id}).then(result => {
                    if(result.data.status == 200){
                        this.tasks.splice(index,1);
                    }
               }
           )
          
           

        },
        getTodayTasks(){
            axios.get('https://upster.co.uk/tasks-manager/today').then(result => {
                var x = result.data
                

            for(var i = 0; i<x.length;i++){
                this.tasks.push(x[i]);
                console.log(x[i])
            }
            })
        }


    },
    computed:{
        // border(){

        //     if(this.task.priority == 'high'){
        //         return 'border-danger'
        //     }else if(this.task.priority == 'med'){
        //         return 'border-warning'
        //     }else if(this.task.priority == 'low'){
        //         return 'border-success'
        //     }
        // },
        danger(){
            return this.storeStatus == 'high'
        },
        warning(){
            return this.storeStatus == 'med'
        },
        success(){
            return this.storeStatus == 'low'
        }
    },
    mounted(){

        this.getTodayTasks()

    }


  })


