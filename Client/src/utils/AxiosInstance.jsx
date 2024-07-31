import axios from 'axios';

const axiousInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
})

export default axiousInstance;
