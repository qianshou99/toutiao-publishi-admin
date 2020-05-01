<template>
  <div class="upload-cover">
      <div class="cover-wrap" @click="showCoverSelect">
        <img
          class="cover-image"
          ref="cover-image"
          :src="value"
        >
      </div>
        <!-- 弹出层 -->
        <el-dialog
        title="选择封面"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
        >
        <!-- tab栏 -->
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="first">
                <image-list
                    :is-show-add="false"
                    :is-show-action="false"
                />
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
                <input
                    type="file"
                    ref="file"
                    @change="onFileChange"
                >
                <img
                src=""
                ref="preview-image"
                >
            </el-tab-pane>
        </el-tabs>
        <!-- /tab栏 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
            type="primary"
            @click="onCoverConfirm">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /弹出层 -->
    </div>
</template>

<script>
// 上传图片接口
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'
export default {
  name: 'UploadCove',
  components: {
    ImageList
  },
  props: ['value'],
  //   props: ['cover-image'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      //   console.log('onfilechenge')
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // 防止用户选择同一个文件不触发 change 事件
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 执行上传文件的操作FormData类型的
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          //   console.log(res)
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的图片
          this.$refs['cover-image'].src = res.data.data.url
          // 将图片地址发送给父组件
          this.$emit('input', res.data.data.url)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-image {
    height: 120px;
    max-width: 100%;
  }
}
</style>
