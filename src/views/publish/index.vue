<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
     <!-- /面包屑导航 -->
      </div>
      <!-- 主体部分 -->
      <div class="text item">
        <el-form ref="form" :model="article" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="article.content"></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
              <el-select v-model="article.channel_id" placeholder="请选择频道">
                <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel, index) in channels"
                :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">发表</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /主体部分 -->
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
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
      },
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        }, // 封面
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取请求数据
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less"></style>