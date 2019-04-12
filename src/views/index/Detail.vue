<template>
    <div class="detail">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24" style="text-align: center">
                <Button @click="goback">
                    <Icon type="ios-arrow-back" class=""></Icon>
                </Button>

                <p>{{book.title}}</p>
            </Col>
        </Row>
        <Row class="background-img">
            <img :src="book.imgsrc">
        </Row>
        <Row class="main" :style="{height: listH}">
            <Col span="24">
                <Col span="10">
                    <img :src="book.imgsrc" class="bookimg">
                </Col>
                <Col span="14" class="title">
                    <p>{{book.title}}</p>
                </Col>
                <Col span="14" class="author">
                    <p>作者：{{book.author}}</p>
                </Col>
                <Col span="14" class="type">
                    <p v-if="book.type== 'xuanhuan'">分类：玄幻</p>
                    <p v-if="book.type== 'qihuan'">分类：奇幻</p>
                    <p v-if="book.type== 'wuxia'">分类：武侠</p>
                    <p v-if="book.type== 'xianxia'">分类：仙侠</p>
                    <p v-if="book.type== 'dushi'">分类：都市</p>
                    <p v-if="book.type== 'xianshi'">分类：现实</p>
                    <p v-if="book.type== 'junshi'">分类：军事</p>
                    <p v-if="book.type== 'lishi'">分类：历史</p>
                    <p v-if="book.type== 'youxi'">分类：游戏</p>
                    <p v-if="book.type== 'tiyu'">分类：体育</p>
                    <p v-if="book.type== 'kehuan'">分类：科幻</p>
                    <p v-if="book.type== 'xuanyi'">分类：悬疑</p>
                </Col>
                <Col span="14" class="read">
                    <p>已有{{book.read}}人将此书加入书架</p>
                </Col>
            </Col>
            <Col span="24" style="padding-top: 20px">
                <Col span="12" style="text-align: center;padding: 0px 10px">
                    <Button style="width: 100%;background-color: #ec0303b5;color:#fff" @click="tryread(book.epubsrc)">
                        免费试读
                    </Button>
                </Col>
                <Col span="12" style="text-align: center;padding: 0px 10px">
                    <Button style="width: 100%">加入书架</Button>
                </Col>
            </Col>
            <Col span="24" style="padding-top: 20px">
                <Col span="24" style="text-align: left;padding: 0px 10px">
                    <p>简介</p>
                </Col>
                <Col span="24" style="text-align: left;padding: 0px 10px">
                    <p>{{book.introduce}}</p>
                </Col>
            </Col>
            <div id="read"></div>

        </Row>

    </div>
</template>

<script>
    import Epub from 'epubjs'
    import {get_book} from '@/request/api';// 导入我们的api接口
    export default {
        name: "detail",
        data() {
            return {
                book: [],
                spin: true,
                listH: '',
            }
        },
        methods: {
            goback() {
                this.$router.back()
            },
            tryread(url) {
                this.spin= true
              //  url = this.$Server+url.replace('/api','')
                console.log(url)
                this.$Loading.start();
                this.$lf.getItem(this.book.id).then(res => {


                        if (res == null) {
                            this.book = new Epub(url)
                            console.log(this.book)
                            this.$lf.setItem(this.book.id,url).then(res=>{
                                console.log(res)
                                this.spin= false
                                this.$Loading.finish();
                                this.$router.push('/ebook/'+this.book.id)
                            })

                        }

                        // Axios.get(url).then(res => {
                        //     this.$lf.setItem(this.book.id, res.data).then(res=>{
                        //         this.$Message.success('图书下载成功')
                        //         this.$Loading.finish();
                        //         this.$router.push('/ebook/'+this.book.id)
                        //     })
                        //
                        //    // console.log(res.data)
                        // }).catch(err =>{
                        //     this.$Loading.error();
                        //     this.$Message.success('图书下载失败')
                        //     console.log(err)
                        // })

                        else {

                            this.$Loading.finish();
                            this.$router.push('/ebook/' + this.book.id)
                        }
                    }
                )


            }
        },
        created() {
            this.$store.commit('hidetabShow');
            //console.log(this.$route.params)
            this.listH = (`${document.documentElement.clientHeight}` * 1 - 41) + 'px'
            get_book(this.$route.params.id).then(res => {
                this.book = res.data
                this.spin = false
            }).catch(err => {
                this.$Message.error('获取书籍失败');
                this.spin = false
                this.goback()
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

    .detail {
        text-align: left;

        .nav {
            height: 40px;
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
                height: 40px;

                i {
                    color: #000;
                    font-size: 25px;
                }
            }

            p {
                color: #000;
                font-size: 20px;
            }
        }

        .background-img {
            img {
                position: absolute;
                top: -13.2rem;
                top: calc(50% - 87.5vw);
                width: 100%;
                height: 175vw;
                opacity: .02;
                opacity: calc(.1 + .4);
                -webkit-filter: blur(calc(17px + 1px));
                filter: blur(calc(17px + 1px));
            }
        }

        .main {
            margin-top: 41px;
            padding: 20px;
            overflow-y: scroll;

            .bookimg {
                width: 100%;
            }

            .title {
                margin-top: 10px;
                font-size: 30px;
                padding-left: 15px;
                margin-bottom: 15px;
            }

            .author {
                padding-left: 15px;
                font-size: 20px;
            }

            .type {
                padding-left: 15px;
                font-size: 20px;
            }

            .read {
                padding-left: 15px;
                color: #666;
                font-size: 12px;
            }

        }
    }
</style>