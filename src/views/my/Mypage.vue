<template>
    <div id="my">
        <Spin fix v-show="spin"></Spin>
        <Row class="head">
            <Col span="24" class="img-col">
                <router-link to="#">
                    <img :src="userdata.headimg" class="headimg">
                </router-link>

            </Col>
        </Row>
        <Row class="name">
            <Col span="24" class="username">
                <span>{{userdata.name}}</span>
                <img src="../../assets/VIP.png" v-if="userdata.viplevel == '1'" style="vertical-align: top">
            </Col>
        </Row>
        <Row class="wallet">
            <router-link to="/wallet">
                <Col span="8">
                    <img src="../../assets/wallet.png" style="width: 80%">
                </Col>
                <Col span="16" class="wallet-text">
                    <p>钱包余额：</p> <span>{{userdata.money}}</span>
                </Col>
                <Col span="8" class="wallet-btn">
                    <Button type="success">充值</Button>

                </Col>
                <Col span="8" class="wallet-btn">

                    <Button type="warning">订阅会员</Button>
                </Col>
            </router-link>
        </Row>
        <Row :style="{height: listH}" class="main">


            <Row class="my-btn">
                <router-link to="/info">
                    <Col span="20" class="btn-label">
                        <p>
                            <Icon type="android-notifications"></Icon>
                            个人信息
                        </p>
                    </Col>
                    <Col span="4" class="btn-icon">
                        <Icon type="ios-arrow-forward"></Icon>
                    </Col>
                </router-link>
            </Row>
            <Row class="my-btn">
                <router-link to="/message">
                    <Col span="20" class="btn-label">

                        <p>
                            <Icon type="android-notifications"></Icon>
                            消息通知
                        </p>
                    </Col>
                    <Col span="4" class="btn-icon">
                        <Icon type="ios-arrow-forward"></Icon>
                    </Col>
                </router-link>
            </Row>
            <Row class="my-btn">
                <router-link to="/security">
                    <Col span="20" class="btn-label">

                        <p>
                            <Icon type="android-lock"></Icon>
                            修改密保手机
                        </p>
                    </Col>
                    <Col span="4" class="btn-icon">
                        <Icon type="ios-arrow-forward"></Icon>
                    </Col>
                </router-link>
            </Row>
            <!--<Row class="my-btn">-->
            <!--<router-link to="#">-->
            <!--<Col span="20" class="btn-label">-->

            <!--<p><Icon type="android-time"></Icon>夜间模式</p>-->
            <!--</Col>-->
            <!--<Col span="4" class="btn-icon">-->
            <!--<i-switch v-model="switch1" @on-change="change"></i-switch>-->
            <!--</Col>-->
            <!--</router-link>-->
            <!--</Row>-->
            <Row class="my-btn">
                <router-link to="/suggest">
                    <Col span="20" class="btn-label">

                        <p>
                            <Icon type="android-mail"></Icon>
                            建议反馈
                        </p>
                    </Col>
                    <Col span="4" class="btn-icon">
                        <Icon type="ios-arrow-forward"></Icon>
                    </Col>
                </router-link>
            </Row>
            <Row class="my-btn">
                <router-link to="/about">
                    <Col span="20" class="btn-label">

                        <p>
                            <Icon type="android-home"></Icon>
                            关于我们
                        </p>
                    </Col>
                    <Col span="4" class="btn-icon">
                        <Icon type="ios-arrow-forward"></Icon>
                    </Col>
                </router-link>
            </Row>
            <Row class="my-btn">
                <Button class="layout" @click="layout">退出登录</Button>
            </Row>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spin: true,
                userdata: {
                    name: '请先登录',
                    money: ''
                },
                listH: ''
            }
        },
        methods: {
            change() {
                console.log('切换主题')
            },
            layout(){
                this.$lf.clear();
                this.$router.push({'path':'/login',replace:true})
            }
        },
        created() {
            this.listH = (`${document.documentElement.clientHeight}` * 1 - 160 - 60 - 125 - 60) + 'px'
            this.$store.commit('show_tabShow');
            this.$lf.getItem('userdata').then(value => {
                this.userdata = value
                this.spin = false;
            })
        }


    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

    #my {
        margin-bottom: 60px;

        .ivu-spin-fix {
            z-index: 999;
        }

        .head {
            background-image: url("../../assets/my_bg.jpg");
            background-size: cover;

            .img-col {

                text-align: center;
                padding-top: 4rem;
                height: 160px;

                .headimg {
                    width: 8rem;
                    height: 8rem;
                    //margin-bottom: -4rem;
                    border-radius: 50%;
                    position: absolute;
                    margin-left: -4rem;
                    z-index: 1;
                    border: 20px solid #fff;
                }
            }
        }

        .name {
            .username {
                margin-top: -50px;
                border-radius: 40%;
                background-color: #fff;
                height: 110px;
                padding-top: 5rem;

                span {
                    font-size: 1.5rem;
                    font-weight: 800;

                }
            }
        }

        .wallet {
            border-bottom: 20px solid #cccccc4f;

            .wallet-text {
                text-align: left;
                padding-left: 2rem;
                height: 50px;
                line-height: 58px;

                p {
                    display: inline-block;
                    font-size: 1rem;
                }

                span {
                    font-size: 1.2rem;
                    color: $ThemColor;
                }
            }

            .wallet-btn {
                height: 55px;
                padding-top: 8px;

                button {
                    font-size: .8rem;
                }
            }
        }

        .main {
            overflow-y: scroll;

            .my-btn {
                border-bottom: 5px solid #cccccc4f;

                a {
                    color: #000;
                    height: 55px;
                    line-height: 55px;

                    .btn-label {
                        text-align: left;
                        padding-left: 15px;
                        font-size: 1.3rem;
                        font-weight: 600;

                    }

                    .btn-icon {
                        text-align: right;
                        padding-right: 15px;
                        font-size: 1.3rem;
                    }
                }
                .layout{
                    width: 60%;
                    height: 40px;
                    font-size: 20px;
                    font-weight: 800;
                    background: #ec0303b5;
                    color: white;
                    margin: 20px 0;
                }
            }
        }

    }
</style>