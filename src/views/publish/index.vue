<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
     <!-- /面包屑导航 -->
      </div>
      <!-- 主体部分 -->
      <div class="text item">
        <!-- 提交表单的时候必须调用验证方法去调用,表单验证必须用ref绑定事件 -->
        <el-form ref="publish-form" :model="article" label-width="60px" :rules="formRules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap>
              <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            </el-form-item>
            <el-form-item label="封面">
              <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
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
              <el-button type="primary" @click="onPublish(false)">发表</el-button>
              <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /主体部分 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {

      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        }, // 封面
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象,要把结果返回给file这个参数
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // console.log(res)
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {},
  created () {
    // 加载频道获取请求数据
    this.loadChannels()
    // 如果路由路径参数中有 id，则请求展示文章内容
    if (this.$route.query.id) {
      // 加载获取文章
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      // 验证表单
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过，提交表单
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单
        // 处理响应结果
        // 如果是修改文章，则执行修改操作，否则执行添加操作
        // 如果路径中有id就执行修改操作
        const articleId = this.$route.query.id
        if (articleId) {
          // 修改文章
          updateArticle(articleId, this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              // 如果draft是true存入草稿,如果draft是false是发布成功
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        } else {
          // 执行添加操作
          addArticle(this.article, draft).then(res => {
          // 处理响应结果
          // console.log(res)
            this.$message({
              // 如果draft是true存入草稿,如果draft是false是发布成功
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })
    },
    // 修改文章,加载文章内容
    loadArticle () {
      console.log('loadArticle')
      // 找到数据接口
      // 封装请求方法
      // 请求获取数据(请求调用)
      // 模板绑定展示
      getArticle(this.$route.query.id).then(res => {
        // 传到article里
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
