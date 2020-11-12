import axios from 'axios';

// axios 객체 생성
export default axios.create({
  baseURL: 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/',
  headers: {
    'X-NCP-APIGW-API-KEY-ID': 'x8fabr9dl5',
    'X-NCP-APIGW-API-KEY': '4zzrfP3QFS9Nz6jYgatAqej65auXGc4ExHQjGe1B'
    // 'Content-type': 'application/json',
  },
});