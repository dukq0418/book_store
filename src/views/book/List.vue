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
          label="封面"
          prop="name">
        </el-table-column>
        <el-table-column
          label="书名"
          prop="address">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="">
        </el-table-column>
        <el-table-column
          label="分类"
          prop="">
        </el-table-column>
        <el-table-column
          label="说明"
          prop="">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
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
        name: "List"
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

