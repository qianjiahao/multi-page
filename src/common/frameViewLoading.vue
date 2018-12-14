<template lang="html">
  <transition name="loading-fade">
    <div class="loading" v-show="show">
      <a-spin size="large" class="icon"/>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.1);
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-fade-enter-active, .loading-fade-leave-active {
  transition: all 0.3s ease;
}

.loading-fade-enter, .loading-fade-leave-to {
  opacity: 0;
}
</style>
