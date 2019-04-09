<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Register/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Register from '@/components/Register.vue'; // @ is an alias to /src

  @Component({
    components: {
      Register,
    },
  })
  export default class Reg extends Vue {}
</script>
