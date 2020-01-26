<template>
  <PageLayout>
    <!-- <a-table :columns="cols" :dataSource="data" :scroll="{ x: 300 }">
      <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table> -->
    <Table :data="data" :page="page" :cols="cols" />
  </PageLayout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue'
import { Table as ATable } from 'ant-design-vue'
import Table from '@/components/Table'

import { getPost } from '@/api'
export default {
  components: {
    PageLayout,
    ATable,
    Table
  },
  data() {
    return {
      page: {},
      data: [],
      cols: [
        {
          title: '标题',
          prop: 'title',
          width: 100,
          key: 'title'
        },
        {
          title: '分类',
          prop: 'categoryId.name',
          width: 100,
          key: 'category'
        }
      ]
    }
  },
  async created() {
    const { page, data } = await getPost()
    ;(this.page = page), (this.data = data)
  }
}
</script>
