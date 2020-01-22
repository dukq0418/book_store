<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)" >
        <el-menu
          :default-active="this.$route.path"
          router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-reading"></i>书籍管理</template>
            <el-menu-item index="/book/list">查看所有书籍</el-menu-item>
            <el-menu-item index="/book/add_book">添加书籍</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-reading"></i>书籍分类管理</template>
            <el-menu-item index="/book_class/Book_class">查看所有书籍分类</el-menu-item>
            <el-menu-item index="/book_class/Add_book_class">添加书籍分类</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-reading"></i>会员管理</template>
            <el-menu-item index="/user/user_list">查看所有会员</el-menu-item>
          </el-submenu>
          <el-submenu index="4">

            <template slot="title"><i class="el-icon-reading"></i>订单管理</template>
            <el-menu-item index="/order/order">查看订单</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px" >
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style>
  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    text-align: left;
  }

  .menu-right{
    margin-left:200px;
  }
</style>



<script>
    export default {
        methods: {
            goBack() {
                console.log('go back');
            }
        }
    }
</script>
