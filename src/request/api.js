/**
 * api接口统一管理
 */
import { get, post } from './http'

//注册接口
export const register = p => post('http://127.0.0.1:3000/regin', p);
export const Login = p => post('http://127.0.0.1:3000/signin', p);