<template>
    <div class="reg">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="用户名" prop="username">
                <Input v-model="formValidate.username" placeholder="输入用户名，长度为5-15位"></Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input v-model="formValidate.password" type="password" placeholder="输入密码，长度为5-15位" ></Input>
            </Form-item>
            <Form-item label="重复密码" prop="password">
                <Input v-model="formValidate.repassowrd" type="password" placeholder="重新输入密码"></Input>
            </Form-item>
            <Form-item label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="城市" prop="city">
                <Select v-model="formValidate.city" placeholder="请选择所在地">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                    <Option value="other">其他</Option>
                </Select>
            </Form-item>
            <Form-item label="选择日期">

                <Form-item prop="date">
                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.birthday"></Date-picker>
                </Form-item>

            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;color:#2d8cf0">重置</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
    import { register } from '@/request/api';// 导入我们的api接口
    export default {
        data () {
            return {
                formValidate: {
                    username: '',
                    password: '',
                    repassowrd: '',
                    city: '',
                    birthday: '',
                    name: '',
                    mail:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    username: [
                        { required: true, message: '输入用户名，长度为5-15位', trigger: 'blur' },
                        { type: 'string', min: 5,max:15, message: '用户名长度不符合规范', trigger: 'blur' }
                    ],
                    password: [
                        { required: true,  message: '输入密码，长度为5-15位', trigger: 'blur' },
                        { type: 'string', min: 5,max:15, message: '用密码长度不符合规范', trigger: 'blur' }
                    ],
                    repassowrd: [
                        { required: true,  message: '重新输入密码', trigger: 'blur' },
                        { type: 'string', min: 5,max:15, message: '用密码长度不符合规范', trigger: 'blur' }
                    ],
                    birthday: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        // 调用api接口，并且提供了两个参数
                        register(this.formValidate).then(res => {
                            alert(res)
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