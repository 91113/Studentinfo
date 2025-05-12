<template>
  <div class="welcome-container">
    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(stat, index) in statistics" :key="index">
          <el-card class="stat-card" :body-style="{ padding: '20px' }">
            <div class="stat-content">
              <el-icon class="stat-icon" :class="stat.color">
                <component :is="stat.icon" />
              </el-icon>
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <el-row :gutter="20">
        <!-- 左侧：公告和通知 -->
        <el-col :span="16">
          <el-card class="notice-card">
            <template #header>
              <div class="card-header">
                <span>最新公告</span>
                <el-button type="primary" text>查看全部</el-button>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="(notice, index) in notices"
                :key="index"
                :timestamp="notice.time"
                :type="notice.type"
              >
                {{ notice.content }}
              </el-timeline-item>
            </el-timeline>
          </el-card>

          <!-- 课程进度 -->
          <el-card class="progress-card">
            <template #header>
              <div class="card-header">
                <span>课程进度</span>
                <el-button type="primary" text>查看详情</el-button>
              </div>
            </template>
            <div v-for="(course, index) in courses" :key="index" class="course-item">
              <div class="course-info">
                <span class="course-name">{{ course.name }}</span>
                <span class="course-teacher">{{ course.teacher }}</span>
              </div>
              <el-progress 
                :percentage="course.progress" 
                :status="course.progress >= 100 ? 'success' : ''"
              />
            </div>
          </el-card>
        </el-col>

        <!-- 右侧：快捷入口和日历 -->
        <el-col :span="8">
          <el-card class="quick-access-card">
            <template #header>
              <div class="card-header">
                <span>快捷入口</span>
              </div>
            </template>
            <div class="quick-access-grid">
              <div 
                v-for="(item, index) in quickAccess" 
                :key="index"
                class="quick-access-item"
                @click="handleQuickAccess(item.route)"
              >
                <el-icon class="quick-access-icon">
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </el-card>

          <el-card class="calendar-card">
            <template #header>
              <div class="card-header">
                <span>校历</span>
              </div>
            </template>
            <el-calendar v-model="currentDate">
              <template #dateCell="{ data }">
                <div class="calendar-cell">
                  <span>{{ data.day.split('-').slice(2).join('') }}</span>
                  <div v-if="isEventDay(data.day)" class="event-dot"></div>
                </div>
              </template>
            </el-calendar>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Reading,
  Document,
  Bell,
  Calendar,
  Setting,
  Star,
  Trophy,
  School
} from '@element-plus/icons-vue'

const router = useRouter()
const currentDate = ref(new Date())

// 统计数据
const statistics = [
  { label: '总学生数', value: '2,345', icon: 'User', color: 'blue' },
  { label: '课程数量', value: '156', icon: 'Reading', color: 'green' },
  { label: '教师数量', value: '89', icon: 'School', color: 'orange' }
]

// 公告数据
const notices = [
  { content: '关于2024年春季学期选课通知', time: '2024-03-15', type: 'primary' },
  { content: '期末考试时间安排已发布', time: '2024-03-14', type: 'success' },
  { content: '学生证补办流程更新', time: '2024-03-13', type: 'warning' },
  { content: '校园招聘会通知', time: '2024-03-12', type: 'info' }
]

// 课程进度
const courses = [
  { name: '高等数学', teacher: '张教授', progress: 75 },
  { name: '大学英语', teacher: '李教授', progress: 60 },
  { name: '数据结构', teacher: '王教授', progress: 90 },
  { name: '计算机网络', teacher: '刘教授', progress: 45 }
]

// 快捷入口
const quickAccess = [
  { label: '成绩查询', icon: 'Document', route: '/home/grades' },
  { label: '课程表', icon: 'Calendar', route: '/home/courses' },
  { label: '通知公告', icon: 'Bell', route: '/home/notices' },
  { label: '个人设置', icon: 'Setting', route: '/home/settings' }
]

// 判断是否是事件日期
const isEventDay = (day: string) => {
  const eventDays = ['2024-03-20', '2024-03-25', '2024-04-01']
  return eventDays.includes(day)
}

// 处理快捷入口点击
const handleQuickAccess = (route: string) => {
  router.push(route)
}
</script>

<style scoped>
.welcome-container {
  padding: 20px;
}

/* 统计卡片样式 */
.stats-section {
  margin-bottom: 24px;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 24px;
  padding: 12px;
  border-radius: 8px;
}

.stat-icon.blue { background-color: rgba(64, 158, 255, 0.1); color: #409EFF; }
.stat-icon.green { background-color: rgba(103, 194, 123, 0.1); color: #67C23A; }
.stat-icon.orange { background-color: rgba(230, 162, 60, 0.1); color: #E6A23C; }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

/* 卡片通用样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 公告卡片样式 */
.notice-card {
  margin-bottom: 20px;
}

/* 课程进度样式 */
.progress-card {
  margin-bottom: 20px;
}

.course-item {
  margin-bottom: 16px;
}

.course-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.course-name {
  font-weight: 500;
}

.course-teacher {
  color: #909399;
  font-size: 14px;
}

/* 快捷入口样式 */
.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.quick-access-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-access-item:hover {
  background-color: #ecf5ff;
  transform: translateY(-2px);
}

.quick-access-icon {
  font-size: 24px;
  color: #409EFF;
}

/* 日历样式 */
.calendar-card {
  margin-top: 20px;
}

.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.event-dot {
  width: 6px;
  height: 6px;
  background-color: #409EFF;
  border-radius: 50%;
  position: absolute;
  bottom: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
  
  .quick-access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 