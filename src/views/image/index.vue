<template>
    <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
          <el-radio-button
          :label="false"
          >全部</el-radio-button>
          <el-radio-button
          :label="true"
          >收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="image-item"
        >
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
           <div class="image-action">
             <!-- is_collected是true就是收藏 -->
            <i
            :class="{
              'el-icon-star-on':img.is_collected,
              'el-icon-star-off':!img.is_collected
              }"
            ></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>

      </el-row>
      <!-- /素材列表 -->
      <!-- 分页列表 -->

   <!-- total设定总数据的条数,默认按照10条每页计算总页码
   page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条
   -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="onCurrentChange"
          :current-page.sync="page"
        >
        </el-pagination>
      <!-- /分页列表 -->
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
        <!-- upload拖拽上传组件,action必须是完整路径 -->
        <el-upload
            class="upload-demo"
            drag
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadHeaders"
            name="image"
            :on-success="onUploadSuccess"
            :show-file-list="false"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 加载请求接口
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部素材列表
      images: [], // 图片素材列表
      // dialogUploadVisible   控制上传的可行性
      dialogUploadVisible: false, // 默认是看不到的
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0, // 默认总数据条数为0
      pageSize: 12, // 每页大小
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化加载数据
    this.loadImages(1)
    // 默认是全部图片,所以默认是false,
  },
  mounted () {},
  methods: {
    // 同学,参数1默认值不能省略的哦
    // 如果想要省略,要把有默认值的参数作为最后一个参数
    loadImages (page, collect = false) {
      // 重置高亮页码
      this.page = page
      //  results中没有 images 所以要到data中去声明出来一个空数组
      getImages({
        collect,
        page,
        per_page: this.pageSize // 分页组件的每页大小要和你的实际每页数据大小一致!!!,否则页码计算就会出现错误
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollectChange (value) {
    //   console.log(value) value是布尔值,可以把布尔值传给loadImages
      this.loadImages(1, value)
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false

      // 更新素材列表
      this.loadImages(this.page, false)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onCurrentChange (page) {
      this.loadImages(page, this.collect)
    }
  }
}
</script>

<style scoped lang="less">
.action-head{
  padding-bottom: 20px;
  display: flex;
 // 左右撑开
  justify-content: space-between;
}
.image-item{
  position: relative;
}
.image-action{
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}

</style>
