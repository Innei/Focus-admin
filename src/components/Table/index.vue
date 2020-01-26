<template>
  <div class="table" v-if="data">
    <ps style="width: 100%;height: calc(100vh - 13rem)">
      <div class="theader">
        <div class="status_bar">
          <div class="col" style="width: 18px" v-if="options.showID">#</div>
          <div
            class="col"
            v-for="col in cols"
            :key="col.prop"
            :style="{
              width:
                typeof col.width === 'number' ? col.width + 'px' : col.width,
              flex: col.auto ? '1' : ''
            }"
          >
            {{ col.name }}
          </div>
          <div class="col" v-if="action" :style="{ width: action.width }">
            {{ action.name }}
          </div>
        </div>
      </div>

      <div class="tbody">
        <div class="row" v-for="(row, i) in data" :key="row._id">
          <div
            class="col"
            v-show="options.showID"
            :style="{ overflow: 'hidden', width: '18px' }"
          >
            {{ i + 1 }}
          </div>
          <div
            class="col"
            :style="{
              width:
                typeof col.width === 'number' ? col.width + 'px' : col.width,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: col.auto ? '1' : ''
            }"
            v-for="col in cols"
            :key="col.prop"
            :title="col.tips ? getObjectPathVal(row, col.prop) : ''"
          >
            <!-- <span v-if="!col.options">{{
              getObjectPathVal(row, col.prop)
            }}</span> -->
            <VNode
              :tag="col.tag"
              :attrs="col.options && col.options.attrs"
              :style="col.options && col.options.style"
              :class="col.options && col.options.class"
              :row="row"
            >
              {{ getObjectPathVal(row, col.prop) }}</VNode
            >
          </div>
          <div class="col" v-if="action" :style="{ width: action.width }">
            <span
              v-for="action in action.actions"
              :key="action.name"
              class="action_btn"
              @click="$emit(action.alias, i, action.name, row._id)"
              :style="{ color: action.color }"
              >{{ action.name }}</span
            >
          </div>
        </div>
      </div>
    </ps>

    <div class="tfooter">
      <div class="page_nav" v-if="page && page.totalPage > 1">
        <div class="page_wrap">
          <div
            class="prev btn"
            :class="{ hide: page.currentPage === 1 }"
            @click="$emit('to', page.currentPage - 1)"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-left']"
            ></font-awesome-icon>
          </div>
          <div class="page">
            <span
              v-for="n in pages"
              :key="n"
              class="page_num"
              :class="{ active: n === page.currentPage }"
              @click="$emit('to', n)"
              >{{ n }}</span
            >
          </div>
          <div
            class="next btn"
            :class="{ hide: page.currentPage + 1 > page.totalPage }"
            @click="$emit('to', page.currentPage + 1)"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objectPath from 'object-path'

const VNode = {
  name: 'createTag',
  props: {
    tag: String,
    attrs: Object,
    row: Object
  },
  data() {
    return {
      refAttr: null
    }
  },
  created() {
    const { attrs, cls, row } = this.$props

    if (typeof attrs === 'object') {
      const newAttr = Object.fromEntries(
        Object.entries(attrs).map(([key, val]) => {
          if (val.ref && val.prop) {
            return [
              key,
              val.prefix
                ? `${val.prefix}${objectPath.get(row, val.prop)}`
                : objectPath.get(row, val.prop)
            ]
          }
          return [key, val]
        })
      )
      this.refAttr = newAttr
    }
  },
  render(h) {
    const { tag = 'div', attrs = {}, style } = this.$props
    const options = {
      attrs: this.refAttr || attrs
    }
    return h(tag, options, this.$slots.default)
  }
}
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    page: {
      type: Object,
      default() {
        return null
      }
    }
  },
  components: {
    VNode
  },
  mounted() {
    if (this.cols[this.cols.length - 1].actions) {
      const action = this.cols.splice(-1, 1)[0]
      this.action = Object.assign({}, action)
    }

    setTimeout(() => {
      this.pageNav()
    }, 100)
  },
  data() {
    return {
      action: null,
      pages: []
    }
  },
  methods: {
    pageNav() {
      // 页数大于5的处理
      // 先清空数组
      this.pages.splice(0)
      if (this.page && this.page.totalPage > 5) {
        this.pages.push(...[1, 2, 3, '...', this.page.totalPage])
      } else {
        for (let i = 1; i <= this.page.totalPage; i++) {
          this.pages.push(i)
        }
      }
    },
    getObjectPathVal(obj, path) {
      return objectPath.get(obj, path)
    }
  },
  watch: {
    page: {
      deep: true,
      handler() {
        this.pageNav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url(https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap);
$basic-color: #1188e8;
$common-color: #1187e8c2;
$highlight: #ffcca8;
$table-col-gap: 20px;
.table {
  overflow: auto;
}
* {
  // font-family: 'Overpass Mono', monospace;
  user-select: none;
}
.table::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.table {
  .theader {
    display: inline-block;
    min-width: 100%;
    background: rgba(255, 255, 255, 0.568);
    backdrop-filter: blur(5px);
    position: sticky;
    top: 0;
  }
  .status_bar {
    white-space: nowrap;
    display: inline-block;
    padding: 12px;
    border-bottom: 1px #eee solid;
    color: #909399;
    font-weight: 800;
    width: 100%;
    display: flex;
    box-sizing: border-box;
  }
  .tbody {
    display: inline-block;
    height: calc(100vh - 17rem);
    min-width: 100%;
    .row {
      white-space: nowrap;
      // display: inline-block;
      padding: 12px;
      border-bottom: 1px #eee solid;
      display: flex;
      align-items: center;
      // min-width: 100%;
    }
  }
}
.col {
  display: flex;
  align-items: flex-end;
  margin-right: $table-col-gap;
}

.action_btn {
  margin-right: 12px;
  color: $basic-color;
  transition: color 0.5s;
  cursor: pointer;
}
.action_btn:hover {
  color: $common-color;
}

.tfooter {
  margin-top: 20px;
  padding-bottom: 20px;
}
.page_nav {
  display: flex;
  justify-content: center;
  align-items: center;

  .page_num.active {
    color: $highlight;
  }
  .page_num,
  .btn {
    transition: color 0.5s;
    margin-right: 30px;
    cursor: pointer;
    color: $basic-color;
    &:hover {
      color: $common-color;
    }
  }

  .page_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    // .page {
    //   width: 15rem;
    // }
  }
}
.hide {
  opacity: 0;
  cursor: unset;
  pointer-events: none;
}

a.title {
  color: $basic-color;
  transition: color 0.5s;
  &:hover {
    color: $highlight;
  }
}
</style>
