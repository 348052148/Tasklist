<template>
    <div>
        <div class="propress">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>正在进行</span>

                </div>
                <div v-for="(task,index) in progressTask" :style="status(task.status)" :key="index" class="text item">
                    <span >{{'任务项 ' + task.taskName }}  </span>  <el-checkbox :checked="isChecked" :key="index+task.id" @change="finishTask(index,task)"  class="select" label="完成" :name="index+task.taskName"></el-checkbox>


                </div>
            </el-card>
        </div>

        <div class="propress">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>已完成</span>

                </div>
                <div v-for="(task,index) in completeTask" :style="status(task.status)" :key="index" class="text item">
                    <span >{{task.taskName }}  </span>
                    <span style="float: right;" >
                        {{'  描述：'+ task.taskDesc}}
                        &nbsp;&nbsp;&nbsp;
                        <i @click="reducingTask(index,task)" style="cursor: pointer;color: #67C23A;" title="驳回" class="el-icon-back"></i>
                        &nbsp;
                        <i @click="reducingTask(index,task)" style="cursor: pointer;color: #F56C6C;" title="删除" class="el-icon-delete"></i>
                    </span>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    export default {
        name:'taskList',
        created:function () {
          this.initData();

          setInterval(this.initData,500);
        },
        data() {
            return {
                progressTask:[],
                completeTask:[],
                isChecked:false
            };
        },
        methods: {
            finishTask:function(index,task){
                setTimeout(() =>{
                    this.progressTask.splice(index,1);
                    localStorage.setItem('progress',JSON.stringify(this.progressTask));

                    this.completeTask.push(task);
                    localStorage.setItem('finish',JSON.stringify(this.completeTask));
                },500);
            },
            initData:function () {
                this.progressTask = JSON.parse(localStorage.getItem('progress'));
                this.completeTask = (JSON.parse(localStorage.getItem('finish')))?JSON.parse(localStorage.getItem('finish')):[];
            },
            status:function (status) {
                let styleStr = '';
                if(status == 'search'){
                    styleStr = 'color:#409EFF;';
                }
              return styleStr;
            },
            reducingTask:function (index,task) {
                setTimeout(() =>{
                    this.completeTask.splice(index,1);
                    localStorage.setItem('finish',JSON.stringify(this.completeTask));
                },200);
            }

        }
    };
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }
    .item .select {
        float: right;
    }

    .propress {
        width: 50%;
        float: left;
        display: inline-block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 500px;
        margin-left: 40px;
    }
</style>