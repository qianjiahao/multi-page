<template lang="html">
  <div class="">
    this is login page belong to framework component , the single page application !

    <button type="button" name="button" @click="login">Login</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  mounted () {
    console.log($)
  },
  methods: {
    login () {
      this.$router.push({ name: 'layout' })
    }
  }
}
</script>

<style lang="css">
</style>
