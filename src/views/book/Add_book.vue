<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书名">
      <el-input v-model="form.bookname"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.author"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" v-model="form.descr"></el-input>
    </el-form-item>
    <el-form-item label="书籍分类">
      <el-select v-model="form.classid" @change="selectChange" clearable placeholder="请选择">
        <el-option
          v-for="item in bookClassList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上传图片" align="center">

      <el-upload
        name="multipartFile"
        action="http://localhost:8081/book/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        v-model="form.path"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
                bookClassList: [],
                form: {
                    bookname: '',
                    author: '',
                    price: 0,
                    classid: 0,
                    descr: '',
                    path: ''
                },
            };
        },
        created(){
          this.getBookClassList()
        },
        methods: {
            //获取所有商品分类数据
            async getBookClassList(){
             const {data: res} = await this.$http.get('/bookClass/queryAll')
                this.bookClassList = res;
             console.log(res)
            },
            //处理移除图片的操作
            handleRemove(file) {
            },
            //处理图片预览效果
            handlePreview(file) {
            },
            handleSuccess(response){
                this.form.path = response
              console.log(this.form.path)
            },
            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //     return this.$confirm('确定移除 ${ file.name }？');
            // },
            async onSubmit(){
             const {data: res} = await this.$http.get('/book/add?bookname=' + this.form.bookname
                 + '&author=' + this.form.author
                 + '&price=' + this.form.price
                 + '&classid=' + this.form.classid
                 + '&descr=' + this.form.descr
                 + '&path=' + this.form.path
             )
                if (res == 1){
                    this.$message.success("添加成功！")
                }
                console.log(this.form)
            },
            selectChange(val){
                // var obj = {};
                // obj = this.selectList.find(function(item){
                //     return item.name === val;
                // })
                // this.editForm.id = obj.id;
                // this.editForm.name = obj.name;
            }
        },
        computed: {
        },
    }

</script>



<style scoped>

</style>
