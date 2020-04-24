<template>
  <div class="article-container">
   <el-card class="filter-card">
        <div slot="header" class="clearfix">
      <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
     <!-- /面包屑导航 -->
        </div>
        <div class="text item">
   <!-- 数据筛选表单 -->
   <el-form ref="form" :model="form" label-width="40px" size="mini">
    <el-form-item label="特殊资源">
        <el-radio-group v-model="status">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
        <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="日期">
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
            <!--
            button 按钮的 click 事件有个默认参数
            当你没有指定参数的时候，它会默认传递一个没用的数据
           -->
        <el-button type="primary" @click="loadArticles(1)">筛选</el-button>
    </el-form-item>
   </el-form>
   <!-- /数据筛选表单 -->
        </div>
   </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
       根据筛选条件共查询到 {{ totalCount }} 条结果：
        </div>
        <div class="text item">
   <!-- 数据列表 -->
   <!-- label 可以设定列的标题, prop  用来设定要渲染的列表项数据字段，只能展示文本 -->
   <!-- 把需要展示的数组列表数据绑定给 table 组件的 data 属性-->
     <el-table
      :data="articles"
      stripe
      size="mini"
      class="list-table"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面">
        <template slot-scope="scope">
          <img  v-if="scope.row.cover.images[0]"
          class="article-cover"
          :src="scope.row.cover.images[0]" alt="">
          <img v-else class="article-cover" src="./no-cover.gif" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag articleStatus[scope.row.status].type>{{articleStatus[scope.row.status].text}}</el-tag>
          <!-- <el-tag v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3" type="danger">审核失败</el-tag>
          <el-tag v-if="scope.row.status === 4" type="info">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
        <!-- 自定义表格列 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            circle
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            size="mini"
            circle
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
      </el-table-column>
    </el-table>
   <!-- 数据列表 -->
   <!-- 分页列表 -->
   <!-- total设定总数据的条数,默认按照10条每页计算总页码
   page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条
   -->
    <el-pagination
      layout="prev, pager, next"
      background
      :total="totalCount"
      @current-change="onCurrentChange"
      :page-size="pageSize">
    </el-pagination>
   <!-- /分页列表 -->
        </div>
   </el-card>

  </div>
</template>

<script>
// 组件中加载请求方法
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
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

      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      totalCount: 0, // 默认总数据条数为0
      pageSize: 10, // 每页大小
      status: null // 查询文章的状态，不传就是全部
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取请求数据
    // 初始的时候要获取第一页的数据,所以要传个1
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // page = 1是给他一个默认值,如果没传参,那默认值是1,传了默认值就是传的那个数
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
    margin-bottom: 20px;
}
.list-table {
    margin-bottom: 20px;
}
.article-cover {
  width: 60px;
  background-size: cover;
}
</style>
