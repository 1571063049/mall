<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="control"
      :class="{ active: index === currentIndex }"
      @click="isActive(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    isActive(index) {
      this.currentIndex = index;
      // 子组件向父组件传值----自定义事件
      this.$emit("tab-click", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  background-color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  line-height: 40px;
}
.control {
  flex: 1;
  text-align: center;
  font-size: 18px;
}
.control span {
  padding: 3px;
}
.active {
  color: var(--color-tint);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>