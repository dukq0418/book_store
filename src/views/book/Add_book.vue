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
      <el-select v-model="form.class.name" @change="selectChange" clearable placeholder="请选择">
        <el-option
          v-for="item in selectList"
          :key="item.id"
          :label="item.id"
          :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item align="center">
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
                form: {
                    bookname: '',
                    author: '',
                    price: 0,
                    classid: 0,
                    descr: ''
                },
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
            },
            selectChange(val){
                var obj = {};
                obj = this.selectList.find(function(item){
                    return item.name === val;
                })
                this.editForm.id = obj.id;
                this.edit.name = obj.name;
            }
        },
        computed: {
            selectList(){
                let obj = [];
                this.axios.get("/class/queryAll")
                    .then(resp => {
                        resp.data.forEach((item, index) => {
                            obj.push({
                                id: item.id,
                                name: item.name
                            });
                        });
                    });
                return obj;
            },
        },
    }

</script>



<style scoped>

</style>
