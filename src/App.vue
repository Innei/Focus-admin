<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<script>
import { mapActions } from 'vuex'
import { debounce } from './utils'
export default {
  created() {
    this.updateViewport()
    window.addEventListener('resize', debounce(this.updateViewport, 13))
  },
  methods: {
    ...mapActions('app', ['updateViewport']),
  },
}
</script>
