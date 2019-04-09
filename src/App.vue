<template>
  <div id="app">
      <Menu mode="horizontal" :theme="theme1" active-name="1" class="menu">
        <Menu-item name="1">
          <Icon type="ios-book"></Icon>
          <router-link to="/">书架</router-link>
        </Menu-item>
        <Menu-item name="2">
          <Icon type="ios-cloud"></Icon>

          <router-link to="#">书城</router-link>
        </Menu-item>
        <Menu-item name="3">
            <Icon type="ios-heart"></Icon>
            排行榜

            <!--<Menu-item name="3-1">畅销榜</Menu-item>-->
            <!--<Menu-item name="3-2">评分榜</Menu-item>-->
            <!--<Menu-item name="3-3">订阅榜</Menu-item>-->
            <!--<Menu-item name="3-4">完结榜</Menu-item>-->
            <!--<Menu-item name="3-5">新书榜</Menu-item>-->


        </Menu-item>
        <Menu-item name="4">
          <Icon type="ios-person"></Icon>
          <router-link to="my">个人</router-link>
        </Menu-item>
      </Menu>



    <router-view/>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        theme1: 'dark'
      }
    }
  }
</script>
<style lang="scss">
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
    a{
      color:#fff;
    }
    .ivu-menu-item-active{
      background-color: #fff;
      color:rgba(0, 0, 0, 0.85);
      a{
        color:rgba(0, 0, 0, 0.85);
      }
    }
  }
}

</style>
