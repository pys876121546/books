<template>
    <Row class="ebook">
        <Spin fix v-show="spin"></Spin>
        <Col span="24" class="controller">
            <Col span="8">
                <div class="prev con-child" @click="prevPage"></div>
            </Col>
            <Col span="8">
                <div class="toggle-menu con-child" @click="toggle_menu"></div>
            </Col>
            <Col span="8"  >
                <div class="next con-child" @click="nextPage"></div>
            </Col>
        </Col>
        <Col span="24" class="menu-panel">
            <Col span="24">
                <div class="menu-top menu-child" :class="animate_name">
                    <Button @click="goback" class="back"> <Icon type="ios-arrow-back" class=""></Icon></Button>
                    <Button class="shuqian"><icon-svg icon-class="shuqian"></icon-svg></Button>
                </div>
            </Col>
            <Col span="24">
                <div class="menu-bottom menu-child" :class="animate_name">
                    <Col span="5" class="middle">
                        <Button class="shuqian"><p>上一章</p></Button>
                    </Col>
                    <Col span="14" class="middle">
                     <Slider v-model="value1" style="width: 100%;"></Slider>
                    </Col>
                    <Col span="5" class="middle">
                        <Button class="shuqian"><p>下一章</p></Button>
                    </Col>
                    <Col span="8">
                        <Button class="shuqian"><icon-svg icon-class="mulu"></icon-svg></Button>
                    </Col>
                    <Col span="8">
                        <Button class="shuqian"><icon-svg icon-class="liangdu"></icon-svg></Button>
                    </Col>
                    <Col span="8">
                        <Button class="shuqian"><icon-svg icon-class="ziti"></icon-svg></Button>
                    </Col>
                </div>
            </Col>
        </Col>
        <Col span="24">
            <div id="read"></div>
        </Col>
    </Row>
</template>

<script>
    import Epub from 'epubjs'

    export default {
        name: "Ebook",
        data(){
            return{
                value1:50,
                spin:true,
                locations:'',
                animate_name:'hide'
            }
        },
        methods: {
            goback(){
                this.$router.back()
            },
            //init初始化电子书
            init(){
                this.$lf.getItem(this.$route.params.id).then(res => {
                    //console.log(res)
                    this.book = new Epub(res)
                    console.log(this.book)


                    this.rendition = this.book.renderTo('read', {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        method: 'default'
                    })
                    this.rendition.display()
                    this.book.ready.then(() => {
                        // 生成目录
                        this.navigation = this.book.navigation
                        // 生成Locations对象
                        console.log('1')
                        this.toc = this.book.navigation.get()
                        console.log(this.toc)

                        setTimeout(()=>{
                            this.spin = false;
                        },1500)

                        return this.book.locations.generate()
                    }).then(result => {
                        // 保存locations对象
                        this.locations = this.book.locations
                        // 标记电子书为解析完毕状态
                        console.log('2')

                    })

                })
            },
            prevPage(){
                if(this.rendition){
                    this.rendition.prev();
                    this.locations = this.book.locations
                    this.animate_name ='hide'
                }
            },
            nextPage(){
                if(this.rendition){
                    this.book.navigation.load('20')
                   // this.rendition.next();
                    this.locations = this.book.locations
                    console.log(this.locations)
                    this.animate_name ='hide'
                }
            },
            toggle_menu(){
                this.animate_name =this.animate_name == 'show'?'hide':'show'
            }

        },
        mounted(){
            this.init()
        },
        created() {
            this.$store.commit('hidetabShow');
            console.log(this.$route.params.id)

        }
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";
.ebook{
    .controller{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        .ivu-col{
            .con-child{
                height: 100vh;
            }
        }
    }
    .menu-panel{
        .menu-top{
            position: fixed;
            width: 100%;
            height: 40px;
            top:-40px;
            z-index: 200;
            background-color: #fff;
            .back{
                border:none;
                font-size: 35px;
                height: 40px;
                padding: 0 15px 0 0;
                text-align: left;
                line-height: 0px;
                float: left;
            }
            .shuqian{
                border:none;
                font-size: 35px;
                height: 40px;
                padding: 0 0 0 15px;
                text-align: right;
                line-height: 0px;
                float: right;
            }

        }
        .menu-bottom{
            position: fixed;
            width: 100%;
            bottom: -76px;
            height: 76px;
            z-index: 200;
            background-color: #fff;
            button{
                border:none;
                font-size: 25px;
                height: 40px;
                padding: 0 15px 0 15px;
                text-align: right;
                line-height: 0px;
            }
            .middle{
            p{
                font-size: 15px;
            }
        }
        }
        .menu-top.show{
            animation: top_show .6s;
            top:0px;
            box-shadow: #ccc 0 3px 3px;
        }
        .menu-bottom.show{
            animation: botom_show .6s;
            bottom: 0px;
            box-shadow: #ccc 0 -3px 3px;
        }
        .menu-top.hide{
            animation: top_hide .6s;
            bottom: -40px;
        }
        .menu-bottom.hide{
            animation: botom_hide .6s;
            bottom: -76px;
        }
        @keyframes top_show
        {
            from { top: -40px}
            to {top: 0;}
        }
        @keyframes botom_show
        {
            from { bottom: -76px}
            to {bottom: 0;}
        }
        @keyframes top_hide
        {
            from { top: 0px}
            to {top: -40;}
        }
        @keyframes botom_hide
        {
            from { bottom: 0px}
            to {bottom: -76;}
        }

    }
}
</style>