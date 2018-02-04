<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit">新增</el-button>


        <el-dialog title="添加任务" :visible.sync="dialogVisible" class="add-task" width="35%">
            <el-form :model="form">
                <el-form-item label="任务标签" :label-width="formLabelWidth">
                   &nbsp; <el-input style="width: 80%;" v-model="form.taskName" auto-complete="off" placeholder="请输入标签名称" ></el-input>
                </el-form-item>
                <el-form-item   label="任务描述" :label-width="formLabelWidth">
                    &nbsp; <el-input style="width: 80%;"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="form.taskDesc">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTask">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>

    export default {
        name:'addTask',
        data() {
            return {
                dialogVisible: false,
                formLabelWidth: '100px',
                form:{}
            };
        },
        methods: {
            addTask:function () {
                let data = this.form;
                data.id = Date.now();

                this.$emit("EaddTask",{data:data});

                this.dialogVisible = false;

                this.form = {};
            }
        }
    };

</script>

<style>

</style>