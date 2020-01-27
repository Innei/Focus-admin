<template>
  <PageLayout>
    <Table
      :data="data"
      :page="page"
      :cols="cols"
      :options="options"
      :loading="loading"
      @to="handleTo"
    >
      <template #actions="{row}">
        <span class="action_btn primary" @click="handleEdit(row)">编辑</span>
        <a-popconfirm
          title="你确定要删除此文章吗?"
          @confirm="confirm(row)"
          okText="是"
          cancelText="再想想啦"
        >
          <span class="action_btn danger">删除</span>
        </a-popconfirm>
      </template>
    </Table>
  </PageLayout>
</template>

<script>
import { Popconfirm as APopconfirm } from 'ant-design-vue'
import PageLayout from '@/layouts/PageLayout.vue'
import Table from '@/components/Table'
import moment from 'moment'
moment.locale('zh-cn')
import { getPost } from '@/api'
export default {
  components: {
    PageLayout,
    Table,
    APopconfirm
  },
  data() {
    return {
      page: {},
      data: [],
      raw: null,
      options: {
        showID: true,
        style: {
          width: '100%',
          height: 'calc(100vh - 13rem)'
        }
      },
      cols: [
        {
          name: '标题',
          prop: 'title',
          width: 100,
          tag: 'router-link',
          options: {
            attrs: {
              to: {
                ref: true,
                prop: '_id',
                prefix: '/posts/edit/'
              }
            },
            class: ['title']
          }
        },
        {
          name: '分类',
          prop: 'categoryId.name',
          width: 100
        },
        {
          name: '日期',
          prop: 'modified',
          width: 150
        },
        {
          name: '操作',
          actions: true
        }
      ],
      loading: true
    }
  },
  async created() {
    await this.monutData()
  },
  methods: {
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {},
    async handleTo(page) {
      console.log(page)

      await this.monutData({ page })
    },
    async monutData(ops = {}) {
      this.loading = true
      const { page, data } = await getPost({
        page: ops.page || 1,
        size: ops.size || 10
      })
      ;(this.page = page), (this.raw = data)

      this.data = data.map(item =>
        Object.fromEntries(
          Object.entries(item).map(([key, val]) => {
            return key === 'created' || key === 'modified'
              ? [key, moment(new Date(val)).fromNow()]
              : [key, val]
          })
        )
      )
      this.loading = false
    },
    confirm(e) {
      console.log(e)
      this.$message.success('Click on Yes')
    }
  }
}
</script>

<style lang="scss" scoped>
$basic-color: #1188e8;
$common-color: #1187e8c2;
$highlight: #ffcca8;
.action_btn {
  margin-right: 1ch;
  cursor: pointer;
  user-select: none;
  &.primary {
    color: $basic-color;
    transition: color 0.25s;
    &:hover {
      color: $highlight;
    }
  }
  &.danger {
    color: #e74c3c;
  }
}
</style>
