<template>
    <div class="about">
        <Row class="nav">
            <Col span="24">
                <Button @click="goback">
                    <Icon type="ios-arrow-back" class=""></Icon>
                </Button>

                <p>关于我们</p>
            </Col>
        </Row>
        <Row class="main" :style="{height: listH}">
            <Col span="24">
                <img src="../../assets/logo.png">
                <h1>阿里巴巴集团的使命</h1>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们旨在赋能企业改变营销、销售和经营的方式，并提升企业效率。我们为商家、品牌及其他企业提供基本的科技基础设施以及营销平台，让其可借助新技术的力量与用户和客户互动，以更具效率的形式开展运营。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们旨在赋能企业改变营销、销售和经营的方式，并提升企业效率。我们为商家、品牌及其他企业提供基本的科技基础设施以及营销平台，让其可借助新技术的力量与用户和客户互动，以更具效率的形式开展运营。</p>
            </Col>
        </Row>

    </div>

</template>

<script>
    export default {
        name: "about",
        data() {
            return {
                listH:''
            }
        },
        methods: {
            goback() {
                this.$router.back()
            }
        },
        created() {
            this.$store.commit('hidetabShow');
            this.listH = (`${document.documentElement.clientHeight}` * 1 - 40) + 'px'
        }
    }
</script>

<style scoped lang="scss">
    @import "@/common/base.scss";

    .about {
        .nav {
            height: 40px;
            background-color: $ThemColor;
            line-height: 40px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 999;

            button {
                border: none;
                position: absolute;
                left: 0;
                background-color: transparent;
                padding-left: 10px;
                height: 40px;

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
            overflow-y: scroll;
            padding: 20px;

            img {
                width: 100%;
            }

            p {
                text-align: left;
                font-size: 1rem;
                margin-top: 10px;
            }
        }
    }
</style>