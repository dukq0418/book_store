<template>
  <el-container>
    <el-main>
      <!--  根据名字查找  -->
      <el-table
        :data="bookList"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
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
    <el-button type="primary" @click="editBookInfo">确 定</el-button>
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
                //获取用户列表的参数对象
                queryInfo:{
                  query:'',
                    //当前页数
                  pageNum: 1,
                    //当前每页显示多少条
                  pageSize: 2
                },
                bookList:[],
                total: 0,
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
                        {required: true, message: '请输入电话号码',trigger: 'blur'},
                    ]
                }
            }
        },
        created(){
            this.getBookList()
        },
        methods: {
            async getBookList(){
              const { data: res } = await this.$http.get('/book/queryAll', {
                  params:this.queryInfo
              })
                console.log(res);
                this.bookList = res.list,
                this.total = res.total

            },
            //监听 pageSize 改变的事件
            handleSizeChange(newSize){
                console.log(newSize)
                this.queryInfo.pageSize = newSize
                this.getBookList()
            },
            //监听页码值改变的事件
            handleCurrentChange(newPage){
                console.log(newPage)
                this.queryInfo.pageNum = newPage
                this.getBookList()
            },

            async handleDelete(id){
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

                const {data: res} = await this.$http.get('/book/delete?id=' + id)
                if(res == 'success'){
                    this.$message.success('删除成功！')
                    this.getBookList()
                }else{
                    return this.$message.error('删除用户成功！')
                }
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
            },
            //修改用户信息并提交
            editBookInfo(){
                this.$refs.editFormRef.validate(valid=>{
                    console.log(valid)
                    if(!valid) return
                //发起修改用户信息的数据请求
                    this.$http.get('/book/edit?id=' + this.editForm.id
                        +'&author=' + this.editForm.author
                        +'&price=' + this.editForm.price
                        +'&descr=' + this.editForm.descr)
                        .then(resp => {
                            if(resp.data == "success"){
                               // 1.关闭对话框
                                this.editDialogVisible = false
                               // 2.刷新数据列表
                                this.getBookList()
                               // 3.提示修改成功
                                this.$message.success('更新用户成功！')
                            }else{
                                return this.$message.error('更新用户信息失败！')
                            }
                        })
                })

            }
        }
    }
</script>


