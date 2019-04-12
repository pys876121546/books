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
//上传文件等
export const uoloadFile = p => post('/api/uoloadFile',p);
//添加图书
export const add_book = p => post('/api/add_book',p);

//获得用户信息
export const userInfo = p => get('/api/getuserinfo?sessionId='+p);
//获得交易记录
export const trading_list = p => get('/api/trading_list?sessionId='+p);
//获得消息记录
export const message_list = p => get('/api/message_list?sessionId='+p);
//发送验证码
export const send_sms = p => get('/api/sendsms?newphone='+p);
//获取轮播
export const get_shuffling = p => get('/api/get_shuffling');
//获取热门书籍
export const get_hot_book = p => get('/api/get_hot_book');
export const get_book = p => get('/api/get_book?id='+p);