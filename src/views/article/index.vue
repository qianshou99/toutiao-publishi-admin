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
        <el-radio-group v-model="form.resource">
        <el-radio label="全部"></el-radio>
        <el-radio label="草稿"></el-radio>
        <el-radio label="待审核"></el-radio>
        <el-radio label="审核通过"></el-radio>
        <el-radio label="审核失败"></el-radio>
        <el-radio label="已删除"></el-radio>
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
        <el-button type="primary" @click="onSubmit">筛选</el-button>
    </el-form-item>
   </el-form>
   <!-- /数据筛选表单 -->
        </div>
   </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
       根据筛选条件共查询到 46147 条结果：
        </div>
        <div class="text item">
   <!-- 数据列表 -->
     <el-table
      :data="tableData"
      stripe
      size="mini"
      class="list-table"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
   <!-- 数据列表 -->
   <!-- 分页列表 -->
    <el-pagination
      layout="prev, pager, next"
      background
      :total="1000">
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    // 生命周期
    this.loadArticles()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
      })
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
</style>
