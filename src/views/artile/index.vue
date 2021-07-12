<template>
  <div class="article-container transition-box">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form
      ref="form"
      :model="form"
      label-width="40px"
      size="mini"
      v-loading="loding"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- el-radio的 value值是通过label来绑定的值，我们想要得到状态就得换成0.1..2....
            注意：这里的label绑定的数据是字符串类型的，我们得让他变成数据所以我们要写成 :label
            -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channel_id" placeholder="请选择频道">
            <el-option
             label="全部"
            :value= null
            ></el-option>
            <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="(channel,index) in channels"
            :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
          :disabled="loding"
          @click="onLoadgetArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <!-- 数据表格-->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
        v-loading="loding"
      >
        <el-table-column
          label="封面"
          width="350">
          <template slot-scope="scope">
            <el-image
            style="width: 130px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover"></el-image>
            <!-- <img :src="scope.row.cover.images[0]" class="photo"> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="350">
        </el-table-column>
        <el-table-column
          label="状态"
          width="350">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          width="350">
        </el-table-column>
       <el-table-column
          label="操作">
          <template slot-scope="scope">
          <el-button
          size="mini"
          circle
          icon="el-icon-edit"
          type="primary"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="onDeletelArticles(scope.row.id)"
          ></el-button>
          </template>
      </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total_count"
        @current-change='onCurrentChange'
        :page-size="per_page"
        :disabled="loding"
        >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getChannels, deleteArticles } from '@/api/artile'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      total_count: 0,
      per_page: 0,
      status: null,
      channels: [],
      channel_id: null,
      // begin_pubdate: ''
      rangeDate: null,
      loding: true,
      show3: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoadgetArticles(1)
    this.onloadgetChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onLoadgetArticles (page = 1) {
      this.loding = true
      getArticles({
        page,
        per_page: 10,
        status: this.status,
        channel_id: this.channel_id,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then((result) => {
        // console.log(result.data)
        this.articles = result.data.data.results
        this.total_count = result.data.data.total_count
        this.per_page = result.data.data.per_page
        this.loding = false
        this.show3 = false
      })
    },
    onCurrentChange (page) {
      this.onLoadgetArticles(page)
    },
    onloadgetChannels () {
      getChannels({}).then((result) => {
        console.log(result.data)
        this.channels = result.data.data.channels
      })
    },
    onDeletelArticles (articlesId) {
      this.$confirm('确认删除', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticles(articlesId).then((res) => {
          console.log(res)
          this.$router.go(0)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
.photo{
  width: 120px;
  height: 120px;
}
</style>
