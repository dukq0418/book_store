<template>
  <el-container>
    <el-main>
      <!--  根据名字查找  -->
      <el-table
        :data="userList"
        style="width: 100%">
        <el-table-column
          label="序号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="密码"
          prop="psw">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="phone">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>

    </el-footer>
    <el-dialog
      title="修改书籍信息"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="editForm.psw" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input  v-model="editForm.address" ></el-input>
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
        name: "User_list"
    }
</script>
<script>
    export default {
        data() {
            return {
                userList:[],
                editForm:[],
                editDialogVisible: false,
                editFormRules:{
                    phone: [
                        {required: true, message: '请输入用户电话',trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入用户邮箱',trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入用户地址',trigger: 'blur'},
                    ]
                }
            }
        },
        created(){
          this.getUserList()
        },
        methods: {
            async getUserList(){
             const {data: res} = await this.$http.get('/customer/queryAll')
                this.userList = res
            },
            async handleEdit(id) {
                const {data:res} = await this.$http.get('/customer/queryAllById?id=' + id)
                this.editForm = res
                this.editDialogVisible = true
                console.log();
            },
            editBookInfo(){
                this.$refs.editFormRef.validate(valid=>{
                    console.log(valid)
                    if(!valid) return
                    //发起修改用户信息的数据请求
                    this.$http.get('/customer/edit?id=' + this.editForm.id
                        +'&phone=' + this.editForm.phone
                        +'&email=' + this.editForm.email
                        +'&address=' + this.editForm.address)
                        .then(resp => {
                            if(resp.data == "success"){
                                // 1.关闭对话框
                                this.editDialogVisible = false
                                // 2.刷新数据列表
                                this.getUserList()
                                // 3.提示修改成功
                                this.$message.success('更新用户成功！')
                            }else{
                                return this.$message.error('更新用户信息失败！')
                            }
                        })
                })

            },
            handleDelete(id) {
                console.log();
            }
        },
    }
</script>
<style scoped>

</style>
