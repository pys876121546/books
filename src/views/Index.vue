<template>
<router-view></router-view>
</template>

<script>

  export default {
    created() {

      //   this.$lf.getItem('sessionId').then(value=> {
      //       if (value != "undefined" && value != undefined) {// 判断是否登录
      //
      //       } else {// 没登录则跳转到登录界面
      //           this.$router.push({
      //               path: '/login',
      //               replace: true
      //           })
      //       }
      //   })

    },

  }
</script>
<style lang="scss" scoped>

</style>