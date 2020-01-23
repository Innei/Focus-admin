<template>
  <div class="bg">
    <div class="wrap" ref="wrap">
      <Sidebar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Sidebar
  },
  async created() {
    await this.$store.dispatch('user/getInfo')
  },
  mounted() {
    setTimeout(() => {
      this.$refs.wrap.classList.toggle('full')
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $deepBg;
}
.wrap.full {
  margin: 0;
  border-radius: 0;
  .title .icon {
    display: none;
  }
}
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 5rem;
  background: linear-gradient(to bottom, #1188e8, #16aae7);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 15rem auto;
  box-shadow: 5px 24px 133px rgba(0, 0, 0, 0.3);
  transition: margin 0.5s, border-radius 0.4s 0.1s;
  .content {
    background-color: #fff !important;
    border-radius: 0 24px 24px 0;
    transition: border-radius 0.5s;
    position: relative;
  }
  &.full .content {
    border-radius: 0;
  }
  &.full .items {
    height: calc(100vh - 12.875rem);
  }
}
@media (max-width: $small) {
  .wrap {
    display: flex;
    .side-bar {
      // display: none;
      left: 0;
      width: 175px;
      position: fixed;
      left: 0;
      z-index: 4;
      background: linear-gradient(to bottom, #1188e8, #16aae7);
      transform: translateX(-100%);
      transition: transform 0.5s, box-shadow 0.5s;
      height: 500px;
      border-radius: 0 0 24px 0;
      display: flex;
      flex-direction: column;
      &.active {
        box-shadow: 1px 1px 43px -9px #000;
        transform: translateX(0);
      }
      .title {
        padding: 2rem 0;
      }
    }

    .content {
      width: 100%;
      height: 100%;
      border-radius: 24px;
    }
  }
}
</style>
