<template>
    <div id="my">
        <Row class="step1" v-if="step==1">

            <Row class="nav">
                <Col span="24">
                    <Button @click="$router.back()">
                        <Icon type="ios-arrow-back" class=""></Icon>
                    </Button>


                </Col>
            </Row>
            <Row class="head">
                <Col span="24" class="img-col">
                    <router-link to="#">
                        <img src="../assets/my_bg.jpg" class="headimg">
                    </router-link>

                </Col>
            </Row>
            <Row class="name">
                <Col span="24" class="username">
                    <span></span>
                </Col>
            </Row>

            <Row class="my-btn">
                <Col span="2">
                    &nbsp;
                </Col>
                <Col span="20" class="">
                    <input v-model="userdata.username" placeholder="请输入5-15位用户名" ></input>
                </Col>
                <Col span="2">
                    &nbsp;
                </Col>

            </Row>
            <Row class="my-btn">
                <Col span="2">
                    &nbsp;
                </Col>
                <Col span="20" class="">
                    <input v-model="userdata.password" type="password" placeholder="请输入5-15位密码"></input>
                </Col>
                <Col span="2">
                    &nbsp;
                </Col>

            </Row>
            <Row class="my-btn">
                <Col span="2">
                    &nbsp;
                </Col>
                <Col span="20" class="">
                    <input v-model="repassword" type="password" placeholder="请重复密码"></input>
                </Col>
                <Col span="2">
                    &nbsp;
                </Col>

            </Row>
            <Row class="my-btn">
                <Col span="2">
                    &nbsp;
                </Col>
                <Col span="20" class="">
                    <input v-model="userdata.phone" placeholder="请输入手机号" type="number"></input>
                </Col>
                <Col span="2">
                    &nbsp;
                </Col>

            </Row>
            <Row class="my-btn">
                <Col span="2">
                    &nbsp;
                </Col>
                <Col span="12">
                    <input placeholder="输入验证码" v-model="code"></input>
                </Col>
                <Col span="8" class="sms-btn">
                    <Button :disabled="disabled" @click="sendcode" :class="normal">{{btnText}}</Button>
                </Col>
                <Col span="2">
                    &nbsp;
                </Col>

            </Row>


            <Row class="my-btn">
                <Col span="24" class="">


                    <Button @click="handleSubmit" class="submit">下一步</Button>
                </Col>
            </Row>
            <Row class="my-btn">


                <Col span="24" class="btn-label">
                    <router-link to="/login">已有账号 立即登录</router-link>
                </Col>

            </Row>
        </Row>
        <Row class="step2" v-if="step==2">

            <Row class="nav">
                <Col span="24">
                    <Button @click="submit">
                       跳过
                    </Button>


                </Col>
            </Row>

            <Row class="main">
                <Row class="my-btn">
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="20" class="">
                        <input v-model="userdata.name" placeholder="请输入昵称" style="width: 100%"></input>


                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>
                <Row class="my-btn">
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="20" class="">
                        <input v-model="userdata.qq" placeholder="请输入qq" style="width: 100%"></input>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>
                <Row class="my-btn">
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="20" class="">
                        <input v-model="userdata.birthday" placeholder="请输入城市" type=""></input>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>
                <Row class="my-btn">
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="20" class="">
                        <input v-model="userdata.birthday" placeholder="请输入生日 如1997-07-08" type=""></input>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>



                <Row class="my-btn">
                    <Col span="24" class="">


                        <Button @click="submit" class="submit">确定</Button>
                    </Col>
                </Row>

            </Row>

        </Row>
    </div>
</template>

<script>
    import crypto from 'crypto'
    import {userInfo, trading_list,message_list,Login,send_sms,register} from '@/request/api';// 导入我们的api接口
    export default {

        data() {

            return {
                spin: true,
                step: 1,
                userdata: {
                    phone: '',
                    username: '',
                    password: '',
                    city:'',
                    name:'',
                    qq:'',
                    birthday:''
                },
                repassword:'',
                code: '',
                sercode: '',
                disabled: false,
                btnText: '发送验证码',
                normal: '',
                cityList: [
                    {
                        value: '',
                        label: '请选择城市'
                    },
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],


            }
        },
        created() {
            this.$store.commit('hidetabShow');
        },
        methods: {
            handleSubmit() {
                this.spin = true
                if(5 <= this.userdata.username.length <= 15){
                    Login(this.formValidate).then(res => {

                        if (res.status == 2) {
                            //处理
                            if(5 <= this.userdata.password.length <= 15){
                                if(this.userdata.password == this.repassword){
                                    if(this.code == this.sercode){
                                        this.setMd5()

                                        this.spin = false;
                                        //处理
                                        this.step = 2;


                                    }else{
                                        this.$Message.error('验证码不正确');
                                    }
                                }else{
                                    this.$Message.error('两次密码不一致');
                                }
                            }else{
                                this.$Message.error('密码长度不出正确');
                            }

                        } else {
                            this.$Message.error('用户已存在');
                        }
                    })

                }else{
                    this.$Message.error('用户名长度不出正确');
                }
                // 调用api接口，并且提供了两个参数


            },
            setMd5(){
                var md5 = crypto.createHash("md5")
                md5.update(this.userdata.password)//this.pw2这是你要加密的密码
                this.userdata.password = md5.digest('hex')//this.pw这就是你加密完的密码，这个往后台传就行了

            },
            sendcode(){
                send_sms((this.userdata.phone)).then(res=>{
                    this.spin=true
                    if(res.status ==0){
                        this.sercode = res.code;
                        this.$Message.success(res.msg)
                        var i=60;
                        this.disabled=true;
                        this.normal='disabled'
                        this.btnText ='发送成功('+i+'s）';
                        this.spin=false
                        var intervalID = setInterval(()=>{
                            i--
                            this.btnText ='发送成功('+i+'s）';
                            if(i == 0){
                                clearInterval(intervalID)
                                this.btnText ='发送验证码';
                                this.disabled=false
                                this.normal=''
                            }
                        },1000)
                    }else{
                        this.$Message.error(res.msg)
                    }
                })
            },
            submit(){
                this.spin = true
                if(this.userdata.name == ''){
                    this.userdata.name = '新晋潜力股';
                    this.userdata.money = '0'
                    this.userdata.viplevel = '0'
                    this.userdata.viptime = ''
                    this.userdata.lasttime = ''
                }
                register(this.userdata).then(res => {

                    if (res.status == 0) {
                        //处理
                        this.spin =false;
                        this.$Message.success(res.msg);
                        this.$lf.setItem('sessionId',res.sessionId).then(value=>{
                            console.log(res)
                            userInfo(value).then(res=>{
                                this.$lf.setItem('userdata',res.data).then(res=>{
                                    console.log('用户数据已储存')
                                }).catch(err=>{
                                    console.log('用户数据储存失败')
                                });
                            })
                            trading_list(value).then(res=>{
                                this.$lf.setItem('trading_list',res.data).then(res=>{
                                    console.log('订单数据已储存')
                                }).catch(err=>{
                                    console.log('订单数据储存失败')
                                });
                            })
                            message_list(value).then(res=>{
                                this.$lf.setItem('message_list',res.data).then(res=>{
                                    console.log('消息数据已储存')
                                }).catch(err=>{
                                    console.log('消息数据储存失败')
                                });
                            })
                            this.$router.push({path:'/',replace:true});
                        });
                        this.$router.push({path:'/',replace:true});

                    } else {
                        this.$Message.error(res.msg);
                    }
                })

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/common/base.scss";

    #my {
        .nav {
            height: 50px;

            line-height: 50px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 999;

            button {
                border: none;
                position: absolute;

                background-color: transparent;
                padding-left: 10px;
                height: 5vh;

                i {
                    color: #fff;
                    font-size: 30px;
                }
            }
        }

        .head {
            background-image: url("../assets/my_bg.jpg");
            background-size: cover;

            .img-col {

                text-align: center;
                padding-top: 4rem;
                height: 10rem;

                .headimg {
                    width: 8rem;
                    height: 8rem;
                    //margin-bottom: -4rem;
                    border-radius: 50%;
                    position: absolute;
                    margin-left: -4rem;
                    z-index: 999;
                    border: 20px solid #fff;
                }
            }
        }

        .name {
            .username {
                margin-top: -3rem;
                border-radius: 40%;
                background-color: #fff;
                height: 7rem;
                padding-top: 5rem;

                span {
                    font-size: 1.5rem;
                    font-weight: 800;

                }
            }
        }

        .my-btn {
            input {
                height: 55px;
                border: none;
                border-bottom: 2px solid #ccc;
                outline: none;
                width: 100%;
                font-size: 25px;
                padding: 0 5px;
                text-align: center;
                margin-bottom: 20px;
            }

            .submit {
                background-color: $ThemColor;
                color: #fff;
                font-size: 20px;
                width: 80vw;
                margin: 10px 0;
            }

            .btn-label {
                text-align: right;
                padding: 10px 10vw;

                a {
                    font-weight: 600;
                    font-size: 18px;
                }
            }

        }
        .step1{
            .nav{
                background-color: transparent;
                button{
                    left: 0;
                }
            }
            .sms-btn{
                button{

                    background-color: $ThemColor;
                    color: #fff;
                    font-size: 15px;
                    width: 100%;
                    height: 50px;

                }
                .disabled{
                    background-color: #ccc;
                }
            }
        }
        .step2{
            .nav{
                background-color: $ThemColor;
                button{
                    right:0;
                    color: #fff;
                    font-size: 20px;
                }
            }
            .main {
                margin-top: 41px;
                padding-top: 20px;

                select {
                    text-align-last: center;
                    height: 55px;
                    border: none;
                    border-bottom: 2px solid #ccc;
                    outline: none;
                    width: 100%;
                    font-size: 25px;
                    padding: 0 5px;
                    text-align: center;
                    margin-bottom: 20px;
                }

            }
        }
    }
</style>