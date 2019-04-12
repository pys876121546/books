<template>
    <div id="my">
        <Spin fix v-show="spin"></Spin>
        <Row class="head">
            <Col span="24" class="img-col1">
                <router-link to="#">
                    <img src="../assets/my_bg.jpg" class="headimg1">
                </router-link>

            </Col>
        </Row>
        <Row class="name">
            <Col span="24" class="username">
                <span></span>
            </Col>
        </Row>

        <Row class="my-btn">
            <Col span="24" class="">
                <input v-model="userdata.username" placeholder="请输入用户名"></input>
            </Col>

        </Row>
        <Row class="my-btn">
            <Col span="24" class="">
                <input v-model="userdata.password" type="password" placeholder="请输入密码"></input>
            </Col>

        </Row>

        <Row class="my-btn">
            <Col span="24" class="">


                <Button @click="handleSubmit">登录</Button>
            </Col>
        </Row>
        <Row class="my-btn">

            <Col span="12" class="btn-label" style="text-align: left;">
                <router-link to="/reg">立即注册</router-link>
            </Col>
            <Col span="12" class="btn-label">
                <router-link to="#">忘记密码</router-link>
            </Col>

        </Row>
    </div>
</template>

<script>
    import crypto from 'crypto'
    import {userInfo, trading_list,message_list,Login} from '@/request/api';// 导入我们的api接口
    export default {

        data() {

            return {
                spin:true,
                userdata: {
                    username: '',
                    password: '',
                },
                ruleValidate: {
                    username: [
                        {required: true, message: '输入用户名，长度为5-15位', trigger: 'blur'},
                        {type: 'string', min: 5, max: 15, message: '用户名长度不符合规范', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '输入密码，长度为5-15位', trigger: 'blur'},
                        {type: 'string', min: 5, max: 15, message: '用密码长度不符合规范', trigger: 'blur'}
                    ]
                },

            }
        },
        created() {
            this.$store.commit('hidetabShow');
            this.spin =false;
        },
        methods: {
            handleSubmit() {
                this.spin =true;
                if (5 <= this.userdata.username.length <= 15 && 5 <= this.userdata.username.length <= 15) {
                    this.$Loading.start();
                    this.setMd5()
                    Login(this.userdata).then(res => {

                        if (res.status == 0) {
                            //处理
                            this.spin =false;
                            this.$Loading.finish();
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


                        } else {
                            this.$Message.error(res.msg);
                            setTimeout(()=>{
                                this.spin =false;
                                this.$Loading.finish();
                            },1000)

                        }
                    })
                } else {
                    this.$Message.error('检查下用户名和密码行不！');
                }
                // 调用api接口，并且提供了两个参数


            },
            setMd5(){
                var md5 = crypto.createHash("md5")
                md5.update(this.userdata.password)//this.pw2这是你要加密的密码
                this.userdata.password = md5.digest('hex')//this.pw这就是你加密完的密码，这个往后台传就行了

            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/common/base.scss";

    #my {
        .head {
            background-image: url("../assets/my_bg.jpg");
            background-size: cover;

            .img-col1 {

                text-align: center;
                padding-top: 4rem;
                height: 10rem;

                .headimg1 {
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
                width: 80%;
                font-size: 25px;
                padding: 0 5px;
                text-align: center;
                margin-bottom: 20px;
            }

            button {
                background-color: $ThemColor;
                color: #fff;
                font-size: 20px;
                width: 80vw;
                margin: 10px 0;
            }

            .btn-label {
                text-align: right;
               padding:10px 10vw;

                a {
                    font-weight: 600;
                    font-size: 18px;
                }
            }

        }
    }
</style>