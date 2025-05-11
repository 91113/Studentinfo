<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <div class="header-left">
          <h2>学生信息管理系统</h2>
        </div>
        <div class="header-center">
          <el-menu
            mode="horizontal"
            :router="true"
            :default-active="$route.path"
          >
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/home/courses">课程管理</el-menu-item>
            <el-menu-item index="/home/grades">成绩管理</el-menu-item>
          </el-menu>
        </div>
        <div class="header-right">
          <el-button
            v-if="userStore.role === 'admin'"
            type="primary"
            @click="$router.push('/home/admin')"
          >
            进入管理后台
          </el-button>
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              {{ userStore.username }}
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
}

.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.el-main {
  background-color: #f5f7fa;
  padding: 20px;
}
</style> 