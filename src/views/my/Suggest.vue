<template>
    <div class="suggest">
        <Row class="nav">
            <Col span="24">
                <Button @click="goback"> <Icon type="ios-arrow-back" class=""></Icon></Button>

                <p>意见反馈</p>
            </Col>
        </Row>
        <Row class="main" :style="{height: listH}">
            <Col span="24">
                <h1>感谢你提供的宝贵意见</h1>
                <Form :model="formValidate" :rules="ruleValidate" label-position="top"  >
                    <Form-item label="标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="标题"></Input>
                    </Form-item>
                    <Form-item label="联系方式" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="请输入邮箱方便我们联系您"></Input>
                    </Form-item>
                    <Form-item label="反馈内容" prop="inner">
                        <Input v-model="formValidate.inner" type="textarea" :rows="8"></Input>
                    </Form-item>
                    <Form-item style="text-align: center">
                    <Button class="suggest-btn" @click="handleSubmit('formValidate')">提交</Button>
                    </Form-item>
                </Form>
            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate:{
                    title:'',
                    mail:'',
                    inner:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    inner: [
                        { required: true, message: '内容能为空', trigger: 'blur' }
                    ],
                },
                listH:''
            }
        },
        methods:{
            goback(){
                this.$router.back()
            },
            handleSubmit (name) {

                        if(this.formValidate.title!=''&&this.formValidate.mail!=''&&this.formValidate.inner!=''){
                            this.$Message.success('提交成功!');
                            this.$router.back()
                        }else{
                            this.$Message.error('请检查各项内容!');
                        }

                        // 调用api接口，并且提供了两个参数





            },
        },
        created() {
            this.$store.commit('hidetabShow');
            this.listH = (`${document.documentElement.clientHeight}`*1 - 40)+'px'
        }
    }
</script>
<style scoped lang="scss">
    @import "@/common/base.scss";
    .suggest{
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
            margin-top: 40px;
            overflow-y: scroll;
            padding: 20px;
            padding-bottom: 0;
            h1{
                margin-bottom: 20px;
            }
            form{
                text-align: left;
            }

            .suggest-btn{
                background-color: $ThemColor;
                color: #fff;
                font-size: 15px;
                padding-left: 30px;
                padding-right: 30px;
            }

        }

    }
</style>