var app = new Vue({
    el: '#app',
    data: {    
        tasks: [],
        storeStatus:'',
        task: {
            name:'',
            comments: '',
            priority: '',
            deadline: '',
            due_date: '',
            completed_at: '',
            completed: false

        }
    },
    methods:{
        /**
         * Retrieving data
         */
        getData(){
              this.tasks.push(this.task);
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
                completed_at: '',
                completed: false
    
            }
        },
        /**
         * Changes the task status
         * @param {*} index 
         */
        toggleTask(index){
            this.tasks[index].completed = !this.tasks[index].completed
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
           this.tasks.splice(index,1);
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
    }


  })