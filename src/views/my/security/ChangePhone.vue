<template>
    <div class="cp">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24">
                <Button @click="goback">
                    <Icon type="ios-arrow-back" class=""></Icon>
                </Button>

                <p>账户与安全</p>
            </Col>
        </Row>
        <Row class="main">
            <Col span="24" class="step1" v-if="step==1">

                <Row>
                    <Col span="24">
                        <h1>请先验证原密保手机</h1>
                    </Col>

                </Row>
                <Row>
                    <Col span="24">
                        <p>{{oldphone}}</p>
                    </Col>

                </Row>
                <Row>
                    <Col span="24">
                        <input placeholder="输入原手机号" v-model="newphone" type="number"></input>
                    </Col>

                </Row>
                <Row>
                    <Col span="24">
                        <Button @click="checkPhone">确定</Button>
                    </Col>

                </Row>

            </Col>
            <Col span="24" class="step2" v-if="step==2">

                <Row>
                    <Col span="2">
                    &nbsp;
                    </Col>

                    <Col span="20">
                        <input placeholder="输入新手机号" v-model="newphone" type="number"></input>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>
                <Row>
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="12">
                        <input placeholder="输入验证码" v-model="code"></input>
                    </Col>
                    <Col span="8">
                        <Button :disabled="disabled" @click="sendcode" :class="normal">{{btnText}}</Button>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>

                </Row>
                <Row>
                    <Col span="24" class="submit">
                        <Button @click="submit">确定</Button>
                    </Col>

                </Row>

            </Col>
        </Row>


    </div>
</template>

<script>
    import { userInfo ,upuserInfo,send_sms } from '@/request/api';// 导入我们的api接口
    export default {
        name: "changePhone",
        data () {
            return {
                spin:true,
                step:1,
                userdata: [],
                oldphone:'',
                newphone:'',
                code:'',
                sercode:'',
                disabled:false,
                btnText:'发送验证码',
                normal:''
            }
        },
        methods: {
            goback() {
                this.$router.back()
            },
            checkPhone(){
                if(this.newphone == this.userdata.phone){
                    this.step=2;
                    this.newphone=''
                }else{
                    this.$Message.error('请输入正确的原密保手机')
                }
            },
            sendcode(){
                send_sms((this.newphone)).then(res=>{
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
                this.userdata.phone = this.newphone;
                this.spin=true
                upuserInfo(this.userdata).then(res=>{
                    if(res.status ==0){
                        this.$router.back()
                        this.$Message.success(res.msg)

                    }else if(res.status == 1){
                        //未登录状态
                        this.spin =false;
                        this.$Message.error(res.msg)
                    }
                })
            }
        },
        created() {
            this.$store.commit('hidetabShow');
            userInfo(localStorage.getItem('sessionId')).then(res=>{
                if(res.status ==0){
                    this.spin=false
                    this.userdata = res.data
                    let test = this.userdata.phone.split('');
                    for(var i = 4;i<8;i++){
                        test.splice(i,i,'*');
                    }

                    this.oldphone = test.join('')+this.userdata.phone.substring(8,11);
                }else if(res.status == 1){
                    //未登录状态
                    this.spin =false;

                }
            })
        },
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

    .cp {
        .nav {
            height: 5vh;
            background-color: $ThemColor;
            line-height: 5vh;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 999;

            button {
                border: none;
                position: absolute;
                left: 0;
                background-color: transparent;
                padding-left: 10px;
                height: 5vh;

                i {
                    color: #fff;
                    font-size: 25px;
                }
            }

            p {
                color: #fff;
                font-size: 20px;
            }
        }

        .main {
            margin-top: 41px;
            height: (100 vh-5vh);
            overflow-y: scroll;
            .step1{
                h1{
                    margin: 10px;
                }
                p{
                    font-size: 23px;
                    margin: 10px;
                }
                input{
                    margin: 10px;
                    border: none;
                    border-bottom: 1px solid #ccc;
                    padding: 2px 10px;
                    width: 80%;
                    font-size: 20px;
                    text-align: center;
                }
                button{
                    margin: 10px;
                    background-color: $ThemColor;
                    color: #fff;
                    font-size: 20px;
                    width: 30vw;
                }
            }
            .step2{
                .ivu-row{
                    margin: 40px 0px;
                }
                input{

                    border: none;
                    border-bottom: 1px solid #ccc;
                    padding: 2px 10px;
                    width: 100%;
                    font-size: 20px;
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                }
                .disabled{
                    background-color: #ccc;
                }
                button{

                    background-color: $ThemColor;
                    color: #fff;
                    font-size: 15px;
                    width: 100%;
                    height: 50px;

                }
                .submit{
                    text-align: center;
                    margin: 10px;
                    button{
                        width: 50vw;
                    }
                }
            }

        }

    }
</style>