<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="说明">
      <el-input v-model="form.descr"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Add_book_class"
    }
</script>

<script>
    export default {
        data() {
            return {
                form: {
                   id:'',
                    name:'',
                    descr:''
                }
            }
        },
        methods: {
            async onSubmit() {
               const {data:res} = await this.$http.get('/bookClass/add?name=' + this.form.name + '&descr=' + this.form.descr)
                if(res == 1){
                    this.$message.success("添加成功！")
                }
            }
        }
    }
</script>

<style scoped>

</style>
