import { defineStore } from 'pinia'

interface UserState {
  id: number | null
  username: string
  role: 'student' | 'admin' | null
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    username: '',
    role: null,
    isLoggedIn: false
  }),
  
  actions: {
    setUser(user: { id: number, username: string, role: 'student' | 'admin' }) {
      this.id = user.id
      this.username = user.username
      this.role = user.role
      this.isLoggedIn = true
    },
    
    logout() {
      this.id = null
      this.username = ''
      this.role = null
      this.isLoggedIn = false
    }
  }
}) 