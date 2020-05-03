<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="text item">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="粉丝列表" name="first">
               <el-row :gutter="10">
                  <el-col
                  :xs="12"
                  :sm="6"
                  :md="3"
                  :lg="3"
                  v-for="(item,index) in fansList"
                  :key="index"
                  >
                  <div class="fans-list">
                    <img :src="item.photo">
                    <p>{{item.name}}</p>
                  </div>
                  </el-col>
              </el-row>
              <!-- 分页 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                :page-size="pageSize"
                :current-page.sync="page"
                @current-change="request"
                >
              </el-pagination>
              <!-- /分页 -->
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="second">
                <!-- 1. 为 ECharts 准备一个具备大小（宽高）的画布容器 DOM -->
                <div ref="main" style="width: 600px;height:400px;"></div>
            </el-tab-pane>
          </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/user'
// 2. 加载 echarts
import echarts from 'echarts'
export default {
  name: 'FansIndex',
  components: {},
  props: {},
  data () {
    return {
      activeName: 'first',
      fansList: [],
      totalCount: 0, // 默认总条数为0
      page: 1, // 当前页数
      pageSize: 24 // 每页大小是10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.request(1)
  },
  mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫123', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {
    request (page) {
      getFansList(
        {
          page,
          per_page: this.pageSize
        }
      ).then(res => {
        console.log(res)
        this.fansList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    }
  }
}
</script>

<style scoped lang="less">
.fans-list {
  width: 100px;
  height: 150px;
  border: 1px dashed #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}
img {
  width: 70px;
  border-radius: 50%;
}
</style>
