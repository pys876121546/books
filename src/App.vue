<template>
  <div id="app">
      <Menu mode="horizontal" :theme="theme1" active-name="1" class="menu" @on-select="menuClick" v-show="$store.state.tabShow">




        <Menu-item name="1">

          <Icon type="ios-cloud"></Icon>
          <span>书城</span>

        </Menu-item>
        <Menu-item name="2">

          <Icon type="ios-book"></Icon>
          <span>书架</span>

        </Menu-item>
        <!--<Menu-item name="3">-->
            <!--<Icon type="ios-heart"></Icon>-->
          <!--<span>排行榜</span>-->


            <!--&lt;!&ndash;<Menu-item name="3-1">畅销榜</Menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<Menu-item name="3-2">评分榜</Menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<Menu-item name="3-3">订阅榜</Menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<Menu-item name="3-4">完结榜</Menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<Menu-item name="3-5">新书榜</Menu-item>&ndash;&gt;-->


        <!--</Menu-item>-->

        <Menu-item name="3" >

          <Icon type="ios-person"></Icon>
          <span>个人</span>


        </Menu-item>

      </Menu>



    <router-view/>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        theme1: 'dark',
      }
    },
    methods:{
      menuClick(key){
        //this.$store.commit('switch_tabShow');
        switch (key*1) {
          case 1:
            this.$router.push({path:'/',replace:true});
            break;
          case 2:
            this.$router.push({path:'/shop',replace:true});
            break;
          case 3:
            this.$router.push({path:'/my',replace:true});
            break;
        }
      }
    },
    created(){

    }
  }
</script>
<style lang="scss">
@import "@/common/base.scss";
.nav{
  box-shadow: #ccc 3px 3px 3px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .menu{
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background:$ThemColor ;
    a{
      font-size: 1rem;
      color:#fff;
      font-weight: 800;
    }
    .ivu-menu-item{
      font-size: 1.2rem;
      font-weight: 800;
      padding: 0 15px;
    }
    .ivu-menu-item-active{
      background-color: #fff;
      color:$ThemColor;
      a{
        color:$ThemColor;
      }
    }
  }
}

</style>
