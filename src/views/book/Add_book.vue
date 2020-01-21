<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" style="width: 125px" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item align="left">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "add_book"
    }
</script>
<!--上传jsp-->
<script>
    export default {
        data() {
            return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>


<style scoped>

</style>
