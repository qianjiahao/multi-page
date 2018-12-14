<template lang="html">
  <div class="container">
    <div class="title">
      首页
    </div>
    <a-input v-model="value" />{{value}}
    <a-button type="primary" @click="showModal">Modal Open</a-button>
    <a-modal
      title="Basic Modal"
      v-model="visible"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-tooltip>
      <template slot='title'>
        prompt text
      </template>
      Tooltip will show when mouse enter.
    </a-tooltip>

    <a-dropdown>
    <a class="ant-dropdown-link" href="#">
      Hover me <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">1st menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">2nd menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">3rd menu item</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      visible: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  height: 100%;
}
</style>
