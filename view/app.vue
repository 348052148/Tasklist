<template>

    <div  >
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="13">
                        <b>
                            任务清单
                        </b>
                    </el-col>
                    <el-col :span="8">
                        <el-input
                                style="width: 100%"
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                @input="searchTask"
                                v-model="searchItem">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <AddTask @EaddTask="addTask" ></AddTask>
                    </el-col>
                </el-row>

            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>

    </div>

</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";

    import AddTask from "./addTask.vue";

    export default {
        components: {
            ElCol,
            AddTask,
            ElRow},
        name: 'app',
        data:function(){
          return {
              searchItem: ''
          };
        },
        methods: {
            addTask:function (data) {

                let taskList = JSON.parse(localStorage.getItem('progress'));

                if(!taskList){
                    taskList = [];
                }

                taskList.push(data.data);


                localStorage.setItem('progress',JSON.stringify(taskList))
            },
            searchTask:function(){
                let completeTask = JSON.parse(localStorage.getItem('finish'));
                for(let i=0;i < completeTask.length;i++){
                    if( this.searchItem !='' && completeTask[i].taskName.search(this.searchItem) >=0 ){
                        completeTask[i].status = 'search';
                    }else{
                        completeTask[i].status = '';
                    }
                }
                localStorage.setItem('finish',JSON.stringify(completeTask));

                let progressTask = JSON.parse(localStorage.getItem('progress'));
                for(let i=0;i < progressTask.length;i++){
                    if( this.searchItem !='' && progressTask[i].taskName.search(this.searchItem) >=0 ){
                        progressTask[i].status = 'search';
                    }else{
                        progressTask[i].status = '';
                    }
                }
                localStorage.setItem('progress',JSON.stringify(progressTask));
            }
        }
    }

</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        width: 1200px;
        margin: 0 auto;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        width: 1200px;
        margin: 0 auto;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
    }

    .el-container:nth-child(7) .el-aside {
    }
</style>