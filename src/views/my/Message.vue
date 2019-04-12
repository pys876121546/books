<template>
    <div class="message">
        <Spin fix v-show="spin"></Spin>
        <Row class="nav">
            <Col span="24" style="text-align: center">
                <Button @click="goback"> <Icon type="ios-arrow-back" class=""></Icon></Button>

                <p>消息通知</p>
            </Col>
        </Row>
        <Row class="main" :style="{height: listH}">
            <Col span="24">
                <Collapse v-model="value1" accordion>
                    <Panel :name="item.id" v-for="item in message">
                        {{item.title}}
                        <p slot="content">{{item.inner}}</p>
                        <p slot="content" style="text-align: right">管理员</p>
                        <p slot="content" style="text-align: right">{{item.time}}</p>
                        <p slot="content" style="text-align: right"> <Button @click="deleteMessage(item.id)">删除</Button></p>

                    </Panel>

                </Collapse>
            </Col>
        </Row>

    </div>
</template>
<script>
    import { message_list,message_del } from '@/request/api';// 导入我们的api接口
    export default {
        data () {
            return {
                spin:true,
                value1:'',
                message:[],
                deldata:[],
                listH:''
            }
        },
        methods:{
            goback(){
                this.$router.back()
            },
            deleteMessage(id){
                this.spin=true;
                console.log('del')
                this.$lf.getItem('sessionId').then(value=>{
                    this.deldata.sessiodId = value;
                    this.deldata.delid = id;
                    message_del(this.deldata).then(res=>{
                        this.deldata=[]
                        this.get_message();
                    }).catch(err=>{
                        this.spin=false;
                        this.$Message.error('网络错误，无法删除')
                    })
                })


            },
            get_message(){
                this.$lf.getItem('sessionId').then(value=>{

                    message_list(value).then(res=>{
                        this.message= res.data
                        this.$lf.setItem('message_list',res.data).then(res=>{
                            this.spin=false;
                            console.log('消息数据已储存')
                        }).catch(err=>{
                            console.log('消息数据储存失败')
                        });
                    })
                });
            }
        },
        created() {
            this.$store.commit('hidetabShow');
            this.$lf.getItem('message_list').then(value=>{
                this.message= value
            })
            this.listH = (`${document.documentElement.clientHeight}`*1 - 41)+'px'
            this.spin =false;
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/common/base.scss";
    .message{
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
            button{
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
        }
        .main{
            margin-top: 41px;
            overflow-y: scroll;
            button{
                margin-top: 2px;
                border: none;
                outline: none;
                color: #57a3f3;
            }
        }
    }
</style>
