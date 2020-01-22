<template>
  <el-container>
    <el-main>
      <!--  根据名字查找  -->
      <el-table
        :data="books"
        style="width: 100%">
        <el-table-column
          label="序号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="封面"
          prop="path" >
          <template slot-scope="scope">
            <img :src="scope.row.path">
          </template>
        </el-table-column>
        <el-table-column
          label="书名"
          prop="bookname">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="author">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price">
        </el-table-column>
        <el-table-column
          label="分类"
          prop="bookClass.name">
        </el-table-column>
        <el-table-column
          label="说明"
          prop="descr">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <!--          <template slot="header" slot-scope="scope">-->
          <!--            <el-input-->
          <!--              v-model="search"-->
          <!--              size="mini"-->
          <!--              placeholder="输入关键字搜索"/>-->
          <!--          </template>-->

          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)">修改</el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </el-footer>
<!--    修改用户的对话框  -->
    <el-dialog
      title="修改书籍信息"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="书名">
          <el-input v-model="editForm.bookname" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editForm.author" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editForm.price" ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editForm.descr" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible  = false">取 消</el-button>
    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
       </span>
    </el-dialog>
  </el-container>
</template>

<script>
    export default {
        name: "List"
    }
</script>
<script>
    export default {
        data() {
            return {
                books:[],
                //控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                //查询到的用户信息对象
                editForm:{},
                //修改表单的验证规则对象
                editFormRules:{
                    author: [
                        {required: true, message: '请输入作者信息',trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入作者信息',trigger: 'blur'},
                    ]
                }
            }
        },
        mounted(){
            this.axios.get('/book/queryAll')
                .then(resp => {
                    this.books = resp.data;
                })
        },

        methods: {
            handleDelete(id){
                this.$confirm('此操作将永久删除该条信息, 是否继续?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.axios.get('/book/delete?id=' + id)
                        .then(resp => {
                            if (resp.data == 'success') {
                                this.$router.push("/book/list")
                            }else {
                                this.$notify({
                                    title: '提示',
                                    message: '删除失败，请联系管理员'
                                });
                            }
                        })
                    this.$message({
                        type: "success",
                        message: '删除成功'
                    })
                })
            },
            async showEditDialog(id){
                // console.log(id)
                this.$http.get('/book/queryById?id='+id)
                    .then(resp => {
                        if (resp.data){
                            this.editForm = resp.data
                        }
                    })
                this.editDialogVisible = true;
            }
        }
    }
</script>


