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
          label="false"
          >全部</el-radio-button>
          <el-radio-button
          label="true"
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
        >
          <el-image
            style="height: 100px"
            src="img.url"
            fit="cover"
          ></el-image>
        </el-col>

      </el-row>
      <!-- /素材列表 -->
    </el-card>
    <el-dialog
    title="上传素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body="true"
    >
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
    return {
      collect: false, // 默认查询全部素材列表
      images: [], // 图片素材列表
      // dialogUploadVisible   控制上传的可行性
      dialogUploadVisible: false // 默认是看不到的
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始化加载数据
    this.loadImages(false)
    // 默认是全部图片,所以默认是false,
  },
  mounted () {},
  methods: {
    loadImages (collect = false) {
      //  results中没有 images 所以要到data中去声明出来一个空数组
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
    //   console.log(value) value是布尔值,可以把布尔值传给loadImages
      this.loadImages(value)
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
</style>
