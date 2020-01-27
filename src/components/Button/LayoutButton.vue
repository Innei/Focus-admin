<template>
  <div class="btn" :style="{ background: backcolor, color: forecolor }">
    <div class="name">
      <div class>{{ name }}</div>
    </div>
    <div class="icon" :style="{ background: backcolor }">
      <font-awesome-icon :icon="icon"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    backcolor: {
      type: String,
      default: '#1188e8'
    },
    forecolor: String
  }
}
</script>
<style lang="scss" scoped>
.btn {
  background: #1188e8;
  padding: 0.75rem 2rem;
  border-radius: 24px;
  color: #fff;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-right: 12px;
  .name {
    margin-right: 2rem;
  }
  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    padding: 1rem;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(1.1);
    border-radius: 50%;
  }
  // .icon::before {
  //   content: '';
  //   position: absolute;
  //   top: 1px;
  //   bottom: 1px;
  //   right: 0;
  //   left: 0;
  //   border-radius: 50%;
  //   z-index: -1;
  //   height: 36px;
  //   width: 36px;
  //   display: flex;
  //   margin: auto;
  // }
}
</style>
