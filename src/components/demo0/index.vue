<template lang="html">
  <div class="container">
    <div class="title">
      首页
    </div>
    <a-input v-model="value" />{{value}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  height: 100%;
}
</style>
