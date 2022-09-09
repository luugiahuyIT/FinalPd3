import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/'
// const TOKEN =  JSON.parse(localStorage.getItem("persist:root")) ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken : ''
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
const TOKEN = localStorage.getItem("USER_TOKEN")

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken)


export const publicRequest = axios.create({
     headers: {
      'Content-Type': 'application/json',
    },
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${TOKEN}`
    }
})
