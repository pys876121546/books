<template>
    <div id="upload">
        <Form :model="formdata" label-position="left" :label-width="100">
            <Form-item label="书名">
                <Input v-model="formdata.title"></Input>
            </Form-item>
            <Form-item label="作者">
                <Input v-model="formdata.author"></Input>
            </Form-item>
            <Form-item label="简介">
                <Select v-model="formdata.type" style="width:200px">
                    <Option v-for="item in typelist" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </Form-item>
            <Form-item label="简介">
                <Input v-model="formdata.introduce" type="textarea"></Input>
            </Form-item>
            <Form-item label="封面图">
                <Upload  action="/api/uoloadFile"  accept="image/png, image/jpeg" :on-success="imgsuccess">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
            </Form-item>
            <Form-item label="epubw文件">
                <Upload
                        type="drag"
                        action="/api/uoloadFile"  accept=".epub" :on-success="epubsuccess">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </Form-item>

                <Button @click="submit">完成</Button>

        </Form>
    </div>

</template>

<script>
    import { add_book } from '@/request/api';// 导入我们的api接口
    export default {
        name: "UpLoadBooks",
        data () {
            return {
                formdata: {
                    title: '',
                    type:'',
                    author: '',
                    introduce: '',
                    imgsrc:'',
                    epubsrc:'',
                    subscribe:'0',
                    collection:'0',
                    read:'0',
                    recommended:'0',
                    time:'',
                },
                typelist: [
                    {
                        value: 'xuanhuan',
                        label: '玄幻'
                    },
                    {
                        value: 'qihuan',
                        label: '奇幻'
                    },
                    {
                        value: 'wuxia',
                        label: '武侠'
                    },
                    {
                        value: 'xianxia',
                        label: '仙侠'
                    },
                    {
                        value: 'dushi',
                        label: '都市'
                    },
                    {
                        value: 'xianshi',
                        label: '现实'
                    },
                    {
                        value: 'junshi',
                        label: '军事'
                    },
                    {
                        value: 'lishi',
                        label: '历史'
                    },
                    {
                        value: 'youxi',
                        label: '游戏'
                    },
                    {
                        value: 'tiyu',
                        label: '体育'
                    },
                    {
                        value: 'kehuan',
                        label: '科幻'
                    },
                    {
                        value: 'xuanyi',
                        label: '悬疑'
                    },
                ],

            }
        },
        methods:{
            imgsuccess(res){
                this.formdata.imgsrc = res.path
                console.log(res)
            },
            epubsuccess(res){
                this.formdata.epubsrc = res.path
                console.log(res)
            },
            submit(){
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                this.formdata.time = currentdate;
                add_book(this.formdata).then(res => {
                    if(res.status == 0){
                        alert('添加成功')
                    }else{
                        alert(res.msg)
                    }

                }).catch(err=>{
                    alert('网络错误')
                })
            }
        },
        created() {
            this.$store.commit('hidetabShow');
        }
    }
</script>

<style scoped>

</style>