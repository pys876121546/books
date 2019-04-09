<template>
  <div class="home">
    <Row>
      <Col span="6"><Book /></Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Book from '@/components/book.vue'; // @ is an alias to /src

@Component({
  components: {
    Book,
  },
})
export default class Index extends Vue {}
</script>
<style lang="scss">

</style>
