<template>
    <div class="info">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24" style="text-align: center">
                <Button @click="goback" class="back"> <Icon type="ios-arrow-back" ></Icon></Button>

                <p>个人信息</p>
                <Button @click="edit" class="edit" v-if="editValue===false"> 编辑</Button>
                <Button @click="submit" class="edit" v-if="editValue===true"> 完成</Button>
            </Col>
        </Row>
        <Row class="main">
            <Col span="24" style="text-align: center" v-if="editValue===false">
                <Row class="my-btn">

                        <Col span="10" class="btn-label">

                            <p>昵称</p>
                        </Col>
                        <Col span="14" class="btn-icon">
                            <p>{{userdata.name}}</p>
                        </Col>

                </Row>
                <Row class="my-btn">

                        <Col span="10" class="btn-label">

                            <p>QQ</p>
                        </Col>
                        <Col span="14" class="btn-icon">
                           <p>{{userdata.qq}}</p>
                        </Col>

                </Row>
                <Row class="my-btn">

                        <Col span="10" class="btn-label">

                            <p>城市</p>
                        </Col>
                        <Col span="14" class="btn-icon">
                            <p>{{userdata.city}}</p>
                        </Col>
                </Row>
                <Row class="my-btn">

                        <Col span="10" class="btn-label">

                            <p>生日</p>
                        </Col>
                        <Col span="14" class="btn-icon">
                            <p>{{userdata.birthday}}</p>
                        </Col>

                </Row>
            </Col>
            <Col span="24" style="text-align: center" v-if="editValue===true">
                <Row class="my-btn">

                    <Col span="10" class="btn-label">

                        <p>昵称</p>
                    </Col>
                    <Col span="14" class="btn-icon">
                        <input v-model="userdata.name"></input>
                    </Col>

                </Row>
                <Row class="my-btn">

                    <Col span="10" class="btn-label">

                        <p>QQ</p>
                    </Col>
                    <Col span="14" class="btn-icon">
                        <input v-model="userdata.qq" type="number"></input>
                    </Col>

                </Row>
                <Row class="my-btn">

                    <Col span="10" class="btn-label">

                        <p>城市</p>
                    </Col>
                    <Col span="14" class="btn-icon">
                        <input v-model="userdata.city"></input>
                    </Col>
                </Row>
                <Row class="my-btn">

                    <Col span="10" class="btn-label">

                        <p>生日</p>
                    </Col>
                    <Col span="14" class="btn-icon">
                        <input v-model="userdata.birthday"></input>
                    </Col>

                </Row>
            </Col>
        </Row>

    </div>
</template>

<script>

    import { userInfo ,upuserInfo } from '@/request/api';// 导入我们的api接口
    export default {
        data () {
            return {
                spin:true,
                editValue:false,
                userdata:[]
            }
        },
        methods:{
            goback(){
                this.$router.back()
            },
            edit(){
                this.editValue = true;
            },
            submit(){
                this.spin=true
                upuserInfo(this.userdata).then(res=>{
                    if(res.status ==0){
                        this.getinfo()
                        this.editValue = false;

                    }else if(res.status == 1){
                        //未登录状态
                        this.spin =false;
                        this.$Message.error(res.msg)
                    }
                }).catch(res=>{
                    this.spin=false
                    this.$Message.error('网络错误，修改失败')
                })
            },
            getinfo(){
                this.$lf.getItem('sessionId').then(value=> {
                    userInfo(value).then(res => {
                        this.$lf.setItem('userdata', res.data).then(value => {
                            console.log('用户数据已储存')
                            this.spin = false;
                        })

                    })
                })
            }
        },
        created() {
            this.$store.commit('hidetabShow');
            this.$lf.getItem('userdata').then(value=>{
                this.userdata =value
                this.spin = false;
            })
        }
    }
</script>
<style lang="scss">
    @import "@/common/base.scss";
    .info{
        text-align: left;
        .nav{
            height: 40px;
            background-color: $ThemColor;
            line-height: 40px;
            position: fixed;
            width: 100%;
            top:0;
            left: 0;
            z-index: 999;
            .back{
                border:none;
                position:absolute;
                left: 0;
                background-color: transparent;
                padding-left: 10px;
                height: 40px;
                i{
                    color: #fff;
                    font-size: 25px;
                }
            }
            p{
                color: #fff;
                font-size: 20px;
            }
            .edit{
                border:none;
                position:absolute;
                right: 0;
                top: 0;
                font-size: 17px;
                font-weight: 600;
                color: #fff;
                background-color: transparent;
                padding-right: 5px;
                height: 40px;
            }
        }
        .main{
            margin-top: 41px;
            .my-btn{
                border-bottom: 5px solid #cccccc4f;

                    color:#000;
                    height: 55px;
                    line-height: 55px;
                    .btn-label{
                        text-align: left;
                        padding-left: 15px;
                        font-size: 1.3rem;
                        font-weight: 600;

                    }
                    .btn-icon{
                        text-align: right;
                        padding-right: 15px;
                        font-size: 1.3rem;
                        input{
                            height: 50px;
                            line-height: 50px;
                            text-align: right;
                            outline: none;
                            width: 100%;
                        }
                    }

            }
        }
    }
</style>