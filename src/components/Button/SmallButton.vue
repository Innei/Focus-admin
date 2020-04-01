<template>
  <div class="btn" :style="{ color: forecolor, backgroundColor: backcolor }">
    <icon :icon="icon"></icon>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      required: true,
    },
    backcolor: {
      type: String,
      default: '#1188e8',
    },
    forecolor: { type: String, default: '#fff' },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background: #1188e8;
  color: #fff;
  user-select: none;
  cursor: pointer;
  margin-right: 12px;
}
</style>
