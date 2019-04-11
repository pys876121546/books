<template>
    <div class="wallet">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24" style="text-align: center">
                <Button @click="goback">
                    <Icon type="ios-arrow-back" class=""></Icon>
                </Button>

                <p>意见反馈</p>
            </Col>
        </Row>
        <Row class="main">
            <Col span="24" style="text-align: center">
                <Row class="money">
                    <Col span="8">
                        <p style="text-align: right">钱包余额：</p>
                    </Col>
                    <Col span="6" style="text-align: center">
                        <p style="font-size: 2rem;text-shadow: #000 2px 2px 2px">{{userdata.money}}</p>
                    </Col>
                    <Col span="10" style="text-align: center">
                        <Button>充值</Button>
                    </Col>
                </Row>
                <Row class="vip">
                    <Col span="24">
                        <p style="text-align: left" v-if="userdata.viplevel==='1'">会员到期时间：{{userdata.viptime}}</p>
                        <p style="text-align: left" v-if="userdata.viplevel==='0'">暂时不是会员</p>
                    </Col>
                    <Col span="12" style="text-align: center">
                        <router-link to="#" style="color: #fff;font-size: 20px;text-decoration: underline">查看会员权益
                        </router-link>
                    </Col>
                    <Col span="12" style="text-align: center">
                        <Button v-if="userdata.viplevel==='1'">会员续费</Button>
                        <Button v-if="userdata.viplevel==='0'">订阅会员</Button>
                    </Col>

                </Row>
            </Col>
        </Row>
        <Row class="title">
            <Col span="24" style="text-align: center">
                <p>交易记录（显示最近30条记录）</p>
            </Col>
        </Row>
        <Row class="history" :style="{height: historyH}">
            <Col span="24">
                <Row class="detail" v-for="item in trading">
                    <Col span="24" style="text-align: center">
                        <Col span="6" style="text-align: center">

                            <p class="count">{{item.count}}</p>
                        </Col>
                        <Col span="18" style="text-align: right">

                            <p class="event">{{item.event}}</p>
                        </Col>

                        <Col span="18" style="text-align: right">
                            <p class="time"> {{item.time}}</p>

                        </Col>
                        <Col span="18" style="text-align: right">
                            <p class="time"> id:{{item.id}}</p>

                        </Col>

                    </Col>
                </Row>

            </Col>

        </Row>
    </div>
</template>

<script>
    import {userInfo, trading_list} from '@/request/api';// 导入我们的api接口
    export default {
        name: "Wallet",
        data() {
            return {
                userdata: [],
                trading: [],
                spin: true,
                historyH:''
            }
        },
        methods: {
            goback() {
                this.$router.back()
            }
        },
        created() {
            this.historyH = (`${document.documentElement.clientHeight}`*1 - 40 -200-46)+'px'
            this.$store.commit('hidetabShow');


            var userdata = localStorage.getItem('userdata');
            this.userdata = JSON.parse(userdata);


            var trading_list = localStorage.getItem('trading_list');
            this.trading = JSON.parse(trading_list);
            this.spin = false


        }
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

    .wallet {
        .nav {
            height: 40px;
            background-color: $ThemColor;
            line-height: 40px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            box-shadow: none;
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
            margin-top: 40px;
            height: 200px;
            background-color: $ThemColor;

            .money {
                height: 80px;
                line-height: 12vh;

                p {
                    color: #fff;
                    font-weight: 600;
                    font-size: 1.2rem;

                }

                button {
                    font-size: 20px;
                    color: $ThemColor;
                    font-weight: 800;
                }
            }

            .vip {
                border-top: 2px solid #fff;
                height: 80px;
                line-height: 80px;

                p {
                    color: #fff;
                    font-weight: 600;
                    font-size: 1.2rem;
                    height: 6vh;
                    margin-left: 10px;
                }

                button {
                    font-size: 20px;
                    color: $ThemColor;
                    font-weight: 800;
                }
            }
        }

        .title p {
            font-size: 1.1rem;
            padding: 10px;
            height: 46px;
            line-height: 46px;
        }

        .history {
            overflow-y: scroll;
            width: 100%;

            .detail {
                margin-bottom: 3px;
                border: 1px solid $ThemColor;
                padding: 10px;

                .event {
                    font-size: 1.3rem;
                }

                .time {
                    font-size: 1rem;
                    margin-right: 10px;
                }

                .count {
                    background-color: $ThemColor;
                    color: #fff;
                    font-size: 3rem;
                    height: 79px;
                    line-height: 79px;
                }
            }
        }
    }
</style>