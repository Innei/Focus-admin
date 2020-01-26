<template>
  <PageLayout>
    <Table :data="data" :page="page" :cols="cols" :options="{ showID: true }" />
  </PageLayout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue'
import Table from '@/components/Table'
import moment from 'moment'
moment.locale('zh-cn')
import { getPost } from '@/api'
export default {
  components: {
    PageLayout,
    Table
  },
  data() {
    return {
      page: {},
      data: [],
      raw: null,
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
          width: 'auto'
        }
      ]
    }
  },
  async created() {
    const { page, data } = await getPost()
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
  }
}
</script>
