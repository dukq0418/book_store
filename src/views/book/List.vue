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
          align="right">
          <!--          <template slot="header" slot-scope="scope">-->
          <!--            <el-input-->
          <!--              v-model="search"-->
          <!--              size="mini"-->
          <!--              placeholder="输入关键字搜索"/>-->
          <!--          </template>-->
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
                books:[],
            }
        },
        mounted(){
            this.axios.get('/book/queryAll')
                .then(resp => {
                    this.books = resp.data;
                })
        }

    }
</script>

