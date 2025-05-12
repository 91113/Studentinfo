<template>
  <div class="home-container">
    <el-container>
      <el-header class="animated-header">
        <div class="header-left">
          <h2 class="logo-text">
            <span class="logo-icon">🎓</span>
            学生信息管理系统
          </h2>
        </div>
        <div class="header-center">
          <el-menu
            mode="horizontal"
            :router="true"
            :default-active="$route.path"
            class="custom-menu"
          >
            <el-menu-item index="/home" class="menu-item">
              <el-icon><HomeFilled /></el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="/home/courses" class="menu-item">
              <el-icon><Reading /></el-icon>
              课程管理
            </el-menu-item>
            <el-menu-item index="/home/grades" class="menu-item">
              <el-icon><Document /></el-icon>
              成绩管理
            </el-menu-item>
          </el-menu>
        </div>
        <div class="header-right">
          <el-button
            v-if="userStore.role === 'admin'"
            type="primary"
            class="admin-btn"
            @click="$router.push('/home/admin')"
          >
            <el-icon><Setting /></el-icon>
            进入管理后台
          </el-button>
          <el-dropdown @command="handleCommand" trigger="click">
            <div class="user-profile">
              <el-avatar :size="32" class="user-avatar">
                {{ userStore.username.charAt(0).toUpperCase() }}
              </el-avatar>
              <span class="username">{{ userStore.username }}</span>
              <el-icon><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu class="custom-dropdown">
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { 
  ArrowDown, 
  HomeFilled, 
  Reading, 
  Document, 
  Setting,
  User,
  SwitchButton
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      userStore.logout()
      router.push('/login')
      break
    case 'profile':
      // 处理个人信息
      break
    case 'settings':
      // 处理设置
      break
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}

.el-container {
  height: 100%;
}

.animated-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 0 24px;
  transition: all 0.3s ease;
}

.header-left h2 {
  margin: 0;
  font-size: 22px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 24px;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.custom-menu {
  background: transparent;
  border: none;
}

.menu-item {
  font-size: 15px;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-profile:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.user-avatar {
  background: linear-gradient(135deg, #409EFF 0%, #36D1DC 100%);
  color: white;
  font-weight: bold;
}

.username {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.custom-dropdown {
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-dropdown :deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-dropdown :deep(.el-dropdown-menu__item:hover) {
  background-color: rgba(64, 158, 255, 0.1);
}

.main-content {
  background-color: transparent;
  padding: 24px;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-center {
    display: none;
  }
  
  .header-left h2 {
    font-size: 18px;
  }
  
  .username {
    display: none;
  }
}
</style> 