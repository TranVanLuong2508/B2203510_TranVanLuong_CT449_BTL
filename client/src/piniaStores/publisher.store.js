import {CustomAxios} from '../axios/customAxios'
import {defineStore} from 'pinia'

import { useUserStore } from './user.store'
import { Header } from 'element-plus/es/components/table-v2/src/components'

export const usePublisherStore = defineStore('publisher', {

    state:() => {
        return {
            publisher: [],
            fetching: false,
        }
    },
    actions: {
        async getAll() {
            const userStore = useUserStore()
            const token = userStore.token
            return await CustomAxios.get('/publisher',{headers: { Authorization: token}})
                .then((res) => {
                    this.publisher = [...this.publisher, ...res.data.publisher]
                    this.fetching = true
                    return res.data.message
                })
                .catch((error) =>{
                    console.log(error.response.data)
                    return error.response.data
                })
        },
         async add(data) {
            const userStore = useUserStore()
            const token = userStore.token
            return await CustomAxios.post('/publisher/add', data, {headers: {Authorization: token}})
                .then((res) =>{
                    this.publisher.push(res.data.publisher)
                    return res.data.message
                })
                .catch((error) =>{
                    console.log(error.response.data)
                    return error.response.data
                })
        },
        async update(data) {
            const userStore = useUserStore()
            const token = userStore.token
            return await CustomAxios.patch(`publisher/update/${data.MaNXB}`, data, {headers: {Authorization: token}})
                .then((res) =>{
                    this.publisher.forEach((nxb) => {
                        if(nxb.MaNXB == data.MaNXB) {
                            nxb = data
                        }
                    })
                    return res.data.message
                })
                .catch((error) =>{
                    console.log(error.response.data)
                    return error.response.data
                })
        },
        async delete(publisherCode) {
            const token = useUserStore().token;
            return await CustomAxios.delete(`publisher/delete/${publisherCode}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.publisher = this.publisher.filter((item) => item.MaNXB != publisherCode);
                    console.log(this.NXB.filter((item) => item.MaNXB != publisherCode));
                    return res.data.message;
                })
                .catch((error) => {
                    console.log(error.response.data);
                    return error.response.data;
                });
        },

    },
    getters: {
        getPublisher(state) {
            return (publisherCode) => state.publisher.find((item) => item.MaNXB == publisherCode);
        },
    }
})