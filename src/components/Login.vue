<template>
    <div class="reg">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="输入用户名，长度为5-15位"></Input>
        </Form-item>
        <Form-item label="密码" prop="password">
            <Input v-model="formValidate.password" type="password" placeholder="输入密码，长度为5-15位" ></Input>
        </Form-item>

        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;color:#2d8cf0">找回密码</Button>
        </Form-item>
    </Form>
    </div>
</template>

<script>
    import { Login } from '@/request/api';// 导入我们的api接口
    export default {
        data () {
            return {
                formValidate: {
                    username: '',
                    password: '',
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '输入用户名，长度为5-15位', trigger: 'blur' },
                        { type: 'string', min: 5,max:15, message: '用户名长度不符合规范', trigger: 'blur' }
                    ],
                    password: [
                        { required: true,  message: '输入密码，长度为5-15位', trigger: 'blur' },
                        { type: 'string', min: 5,max:15, message: '用密码长度不符合规范', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 调用api接口，并且提供了两个参数
                        Login(this.formValidate).then(res => {

                            if(res.status == 0){
                                //处理
                                this.$Message.success(res.msg);
                            }else{
                                this.$Message.error(res.msg);
                            }
                        })



                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style lang="scss">
    .reg {
        width: 70%;
        margin-left: 15%;
    }
</style>