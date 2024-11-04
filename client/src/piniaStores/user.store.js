import {CustomAxios} from '../axios/customAxios'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        token: '',
        userInfor:{},
      }
    },
    actions: {
        //for user
      SignUp:  async function(data) {
        return await CustomAxios.post('/authen/signup', data)
            .then((res) => {return res.data.message})
            .catch((error) => {
                console.log(error)
                return false
            })
      },
      SignIn:  async function(data) {
        return await CustomAxios.post('/authen/signin', data)
            .then((res) => {
                this.token = res.data.data?.token
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
        return await CustomAxios.post('/authen/staffsignin', data)
            .then((res) => {
                this.token = res.data.data?.token
                this.userInfor = res.data.data?.staff
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
      }
    },
  })