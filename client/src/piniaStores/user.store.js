import {axiosInstance} from '../axios/axiosInstance'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        token: localStorage.getItem('token') || '',
        userInfor:{},
        staffInfor:{},
        staffToken: localStorage.getItem('staffToken') || ''
      }
    },
    actions: {
        //for user
      SignUp:  async function(data) {
        return await axiosInstance.post('/authen/signup', data)
            .then((res) => {return res.data.message})
            .catch((error) => {
                console.log(error)
                return false
            })
      },
      SignIn:  async function(data) {
        return await axiosInstance.post('/authen/signin', data)
            .then((res) => {
                this.token = res.data.data?.token
                localStorage.setItem('token', this.token)
                this.userInfor = res.data.data?.user
                return res.data.message
            })
            .catch((error) => {
                console.log(error)
                return false
            })
      },
      //for staff
      staffSignIn:  async function(data) {
        return await axiosInstance.post('/authen/staffsignin', data)
            .then((res) => {
                this.staffToken = res.data.data?.token
                localStorage.setItem('staffToken', this.staffToken)
                this.staffInfor = res.data.data?.staff
                return res.data.message
            })
            .catch((error) => {
                console.log(error)
                return false
            })
      },
      //all
      SignOut: function() {
        this.token = '',
        this.userInfor = {}
        localStorage.removeItem('token')
      },

      staffSignOut: function(){
        this.staffToken=''
        this.staffInfor={}
        localStorage.removeItem('staffToken')
      }
    },
  })