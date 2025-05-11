<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <h2>注册账号</h2>
      </template>
      
      <el-form :model="form" @submit.prevent="handleRegister">
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
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="确认密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" native-type="submit" block>注册</el-button>
        </el-form-item>
        
        <div class="register-links">
          <router-link to="/login">返回登录</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      username: form.username,
      password: form.password
    })
    
    if (response.data.success) {
      ElMessage.success('注册成功')
      router.push('/login')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('注册失败，请稍后重试')
  }
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.register-card {
  width: 400px;
}

.register-card :deep(.el-card__header) {
  text-align: center;
}

.register-links {
  text-align: center;
  margin-top: 16px;
}

.register-links a {
  color: #409eff;
  text-decoration: none;
}

.register-links a:hover {
  color: #66b1ff;
}
</style> 