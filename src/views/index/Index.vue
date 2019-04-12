<template>
    <div class="index">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24" style="text-align: left">


                <p>睿读</p>
                <Button>
                    <Icon type="ios-search"></Icon>
                </Button>
            </Col>
        </Row>
        <Row class="main" :style="{height: listH}">
            <Col span="24">
                <Carousel
                        v-model="lunboValue"
                        :autoplay="setting.autoplay"
                        :autoplay-speed="setting.autoplaySpeed"
                        :dots="setting.dots"
                        :trigger="setting.trigger"
                        :arrow="setting.arrow">
                    <Carousel-item v-for="item in lunbo">
                        <router-link :to="'/detail/'+item.id">
                            <img :src="item.src">
                        </router-link>
                    </Carousel-item>
                </Carousel>
            </Col>
            <Col span="24" class="btn-group">
                <Col span="12" style="border-top: 2px solid #ec0303b5;border-bottom: 2px solid #ec0303b5;">
                    <router-link to="#">
                        <Col span="10" style="background-color: #ec0303b5;">
                           <img src="../../assets/fenlei.png">
                        </Col>
                        <Col span="14" style="background-color: #ec0303b5;">
                            <p>分类</p>
                        </Col>
                    </router-link>
                </Col>
                <Col span="12" style="border-top: 2px solid #ec0303b5;border-bottom: 2px solid #ec0303b5;border-right: 2px solid #ec0303b5;">
                    <router-link to="#">
                        <Col span="10">
                            <img src="../../assets/paihang.png">
                        </Col>
                        <Col span="14">
                            <p>排行</p>
                        </Col>
                    </router-link>
                </Col>
            </Col>
            <Col span="24" class="btn-group">
                <router-link to="#">
                    <img src="../../assets/ad.png" style="width: 100%;margin-top: 10px;margin-bottom: 20px">
                </router-link>
            </Col>
            <Col span="24" class="tuijian list-panel">
                <Col span="18">
                    <p class="title">热门小说</p>
                </Col>
                <Col span="6">
                   &nbsp;

                </Col>
                <Col span="24" >
                    <Col span="8" class="book" v-for="item in hotbook">
                        <router-link :to="'/detail/'+item.id">
                            <img :src="item.imgsrc">
                            <p>{{item.title}}</p>
                            <span>{{item.author}}</span>
                        </router-link>
                    </Col>

                </Col>

            </Col>
            <Col span="24" class="fenleihot list-panel" style="margin-top: 20px">
                <Col span="18">
                    <p class="title">分类热门</p>
                </Col>
                <Col span="6">
                    <router-link to="#">
                        <p class="more"><span>更多</span>
                            <Icon type="ios-arrow-forward"></Icon>
                        </p>

                    </router-link>

                </Col>
                <Col span="24" >
                    <Tabs value="xuanhuan" style="width: 100%">
                        <Tab-pane label="玄幻" name="xuanhuan">
                            <Col span="8" class="book" v-for="item in hotbook">
                                <router-link :to="'/detail/'+item.id">
                                    <img :src="item.imgsrc">
                                    <p>{{item.title}}</p>
                                    <span>{{item.author}}</span>
                                </router-link>
                            </Col>
                        </Tab-pane>
                        <Tab-pane label="奇幻" name="qihuan">
                            <Col span="8" class="book" v-for="item in hotbook">
                                <router-link :to="'/detail/'+item.id">
                                    <img :src="item.imgsrc">
                                    <p>{{item.title}}</p>
                                    <span>{{item.author}}</span>
                                </router-link>
                            </Col>
                        </Tab-pane>
                        <Tab-pane label="武侠" name="wuxia"><Col span="8" class="book" v-for="item in hotbook">
                            <router-link :to="'/detail/'+item.id">
                                <img :src="item.imgsrc">
                                <p>{{item.title}}</p>
                                <span>{{item.author}}</span>
                            </router-link>
                        </Col>
                        </Tab-pane>
                        <Tab-pane label="仙侠" name="xianxia"><Col span="8" class="book" v-for="item in hotbook">
                            <router-link :to="'/detail/'+item.id">
                                <img :src="item.imgsrc">
                                <p>{{item.title}}</p>
                                <span>{{item.author}}</span>
                            </router-link>
                        </Col>
                        </Tab-pane>
                        <Tab-pane label="都市" name="dushi"><Col span="8" class="book" v-for="item in hotbook">
                            <router-link :to="'/detail/'+item.id">
                                <img :src="item.imgsrc">
                                <p>{{item.title}}</p>
                                <span>{{item.author}}</span>
                            </router-link>
                        </Col>
                        </Tab-pane>
                        <Tab-pane label="灵异" name="lingyi"><Col span="8" class="book" v-for="item in hotbook">
                            <router-link :to="'/detail/'+item.id">
                                <img :src="item.imgsrc">
                                <p>{{item.title}}</p>
                                <span>{{item.author}}</span>
                            </router-link>
                        </Col>
                        </Tab-pane>
                    </Tabs>


                </Col>

            </Col>
        </Row>
    </div>

</template>

<script>
    import { get_shuffling,get_hot_book } from '@/request/api';// 导入我们的api接口
    export default {
        name: "Index",
        data() {
            return {
                spin: true,
                listH:'',
                lunboValue:0,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: 'none',
                    trigger: 'click',
                    arrow: 'hover'
                },
                lunbo:[],
                hotbook:[]
            }
        },
        methods: {
            goback() {
                this.$router.back()
            },
            getlunbo(){
                get_shuffling().then(res=>{

                    this.lunbo = res.data
                    this.$lf.setItem('lunbo_list',res.data).then(value=>{
                        this.spin=false;
                        console.log('轮播信息已储存');
                    });

                }).catch(err=>{
                    this.$lf.getItem('lunbo_list').then(value=>{
                        this.spin=false;
                        this.lunbo = value
                        console.log('轮播信息已读取');
                    });

                })
            },
            gethotbook(){
                get_hot_book().then(res=>{
                    this.hotbook = res.data
                    this.$lf.setItem('hot_book_list',res.data).then(value=>{
                        this.spin=false;
                        console.log('热书信息信息已储存');
                    });

                }).catch(err=>{
                    this.$lf.getItem('hot_book_list').then(value=>{
                        this.spin=false;
                        this.hotbook = value
                        console.log('轮播信息已读取');
                    });
                })
            }
        },
        created() {
            this.spin= false
            this.listH = (`${document.documentElement.clientHeight}`*1 - 102)+'px'
            this.getlunbo();
            this.gethotbook()

        }
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

.index{
    .nav {
        height: 40px;
        margin: 5px;
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
            right: 0;
            top:0;
            background-color: transparent;
            padding-left: 10px;
            height: 5vh;

            i {
                color: $ThemColor;
                font-size: 25px;
            }
        }

        p {
            padding-left: 10px;
            color: $ThemColor;
            font-size: 20px;
        }
    }

    .main {
        margin-top: 40px;
        padding: 10px;
        overflow-y: scroll;
        .ivu-carousel{
            margin-bottom: 10px;
            .ivu-carousel-item{
                img{
                    width: 100%;
                }
            }
        }
        .btn-group{
            margin-bottom: 10px;
            .ivu-col-span-12{
                height: 73px;
                line-height: 73px;
                .ivu-col-span-10{
                    height: 69px;
                    line-height: 69px;
                }
                .ivu-col-span-14{
                    height: 69px;
                    line-height: 69px;
                    color: #4f3321;
                    font-size: 30px;
                    font-weight: 600;
                  //  text-shadow: #666 2px 2px 2px;
                }
            }
        }
        .list-panel{
            p{
                font-size: 16px;
                height: 23px;
                line-height: 23px;
                margin-bottom: 10px;
            }
            .title{
                text-align: left;
                padding-left: 5px;
                border-left: 4px solid $ThemColor;
                color: #4f3321;
            }
            .more{
                text-align: right;
                color: #4f3321;
                i{
                    margin-top: -3px;
                }
            }
            .book{
                padding: 5px;
                text-align: left;
                img{
                    width: 100%;
                }
                p{
                    margin-bottom: 0;
                    color:#000;
                    height: auto;
                    font-size: 18px;
                }
                span{
                    color: #666;
                    overflow: hidden;
                    display: inline-block;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                }
            }
            .ivu-tabs-ink-bar{
                background-color: $ThemColor!important;
            }
            .nav-text{
                width: 100%!important;
            }
        }

    }
}
</style>