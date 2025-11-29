import axios from 'axios';
import { useContent } from './context';
const apiUrl = 'https://api.x402.com'; // 这里使用您具体的 API 地址



export function useX402Request(endpoint, data) {
  const { setX402Response } = useContent(); 

  const request = async () => {
    try {
      const response = await axios.post(`${apiUrl}/${endpoint}`, data); // 发送 POST 请求
      console.log('Response:', response.data);
      setX402Response(response.data); // 设置返回的响应
    } catch (error) {
      console.error('Error calling API:', error);
      setX402Response(error); // 如果出错，设置错误信息
    }
  };

  return request; // 返回请求函数，方便在其他地方调用
}
