/**
 * api接口统一管理
 */
import { get, post } from './http'

//注册接口
export const register = p => post('/api/regin', p);
//登录
export const Login = p => post('/api/signin', p);
//更新用户信息
export const upuserInfo = p => post('/api/upuserinfo', p);
//删除消息
export const message_del = p => post('/api/message_del',p);

//获得用户信息
export const userInfo = p => get('/api/getuserinfo?sessionId='+p);
//获得交易记录
export const trading_list = p => get('/api/trading_list?sessionId='+p);
//获得消息记录
export const message_list = p => get('/api/message_list?sessionId='+p);
//发送验证码
export const send_sms = p => get('/api/sendsms?newphone='+p);