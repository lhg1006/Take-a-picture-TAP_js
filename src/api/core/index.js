import axios from 'axios';

// create an axios instance
const request = axios.create({             // 👈 axios 인스턴스 생성
    baseURL: 'http://localhost:8000'
});

export default request;  // 👈 axios 인스턴스를 내보냅니다.