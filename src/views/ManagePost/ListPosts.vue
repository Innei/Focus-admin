<template>
  <PageLayout>
    <template #header>
      <Button
        name="撰写"
        :icon="['fas', 'plus']"
        @click.native="$router.push({ name: 'edit-posts' })"
      />
    </template>
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
          ok-text="是"
          cancel-text="再想想啦"
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
import Button from '@/components/Button/LayoutButton'
import moment from 'moment'
moment.locale('zh-cn')
import { Rest } from '@/api'
export default {
  components: {
    PageLayout,
    Table,
    APopconfirm,
    Button
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
                prefix: '/posts/edit?id='
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
          name: '创建时间',
          prop: 'created',
          width: 150
        },
        {
          name: '修改于',
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
    await this.getData()
  },
  methods: {
    handleEdit(row) {
      console.log(row)
    },
    async handleTo(page) {
      await this.getData({ page })
    },
    async getData(ops = {}) {
      this.loading = true
      const { page, data } = await Rest(
        'getRecently',
        'Post'
      )({
        page: ops.page || 1,
        size: ops.size || 10
      })
      ;(this.page = page), (this.raw = data)

      this.data = data.map(item =>
        Object.fromEntries(
          Object.entries(item).map(([key, val]) => {
            switch (key) {
              case 'modified': {
                return [key, moment(val).fromNow()]
              }
              case 'created': {
                return [key, moment(val).format('L LTS')]
              }
              default: {
                return [key, val]
              }
            }
          })
        )
      )
      this.loading = false
    },
    async confirm(e) {
      const { deletedCount, msg } = await Rest('deleteOne', 'Post')(e._id)
      if (deletedCount) {
        this.$message.success(msg)
        this.getData({ page: this.page.currentPage })
      } else {
        this.$message.error(msg)
      }
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
