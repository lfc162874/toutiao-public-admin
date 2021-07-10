
<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside
      class="app-aside"
      :is-collapse='isCollpase'
       />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-container">
          <div>
            <i
              :class="{
                 'el-icon-s-fold': isCollpase,
                 'el-icon-s-unfold': ! isCollpase
                }"
              @click="isCollpase = ! isCollpase "
            ></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" :src="user.photo" alt="" />
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'layout',
  data () {
    return {
      user: {},
      isCollpase: false
    }
  },
  components: {
    AppAside
  },
  created () {
    //   組件初始化好，就調用這個方法
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile()
        .then(res => {
          // console.log(res)
          this.user = res.data.data
        })
    },
    onLogout () {
      this.$confirm('确认退出用户', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '已退出登录!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
}

.header {
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
}
.app-aside {
  height: 100%;
}
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
