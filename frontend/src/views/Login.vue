<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>学生信息管理系统</h2>
      </template>
      
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" native-type="submit" block>登录</el-button>
        </el-form-item>
        
        <div class="login-links">
          <router-link to="/register">注册账号</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', form)
    if (response.data.success) {
      userStore.setUser(response.data.user)
      ElMessage.success('登录成功')
      router.push('/home')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('登录失败，请稍后重试')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
}

.login-card :deep(.el-card__header) {
  text-align: center;
}

.login-links {
  text-align: center;
  margin-top: 16px;
}

.login-links a {
  color: #409eff;
  text-decoration: none;
}

.login-links a:hover {
  color: #66b1ff;
}
</style> 