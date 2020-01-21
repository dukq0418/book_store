<template>
  <el-container>
    <el-main>
      <!--  根据名字查找  -->
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="序号"
          prop="date">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="密码"
          prop="address">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="">
        </el-table-column>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '张晓明',
                    address: '普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '徐晓燕',
                    address: '普陀区金沙江路 1516 弄'
                }],
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>
<style scoped>

</style>
