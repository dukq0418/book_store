<template>
  <el-container>
    <el-main>
      <!--  根据名字查找  -->
      <el-table
        :data="bookClassList"
        style="width: 100%">
        <el-table-column
          label="序号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="分类说明"
          prop="descr">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
<!--            <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "Book_class"
    }
</script>

<script>
    export default {
        data() {
            return {
                bookClassList: []
            }
        },
        created(){
            this.getBookClass()
        },
        methods: {
            // handleEdit(index, row) {
            //     console.log(index, row);
            // },
            async handleDelete(id) {
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该条信息, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)
                if(confirmResult !== 'confirm'){
                    return this.$message.info('已取消删除')
                }

                const {data: res} = await this.$http.get('/bookClass/delete?id=' + id)
                if(res == 'success'){
                    this.$message.success('删除成功！')
                    this.getBookClass()
                }else{
                    return this.$message.error('删除用户成功！')
                }
                console.log();
            },
            async getBookClass(){
                const {data: res} = await this.$http.get("/bookClass/queryAll")
                console.log(res)
                this.bookClassList = res
            }
        },
    }
</script>
<style scoped>

</style>
