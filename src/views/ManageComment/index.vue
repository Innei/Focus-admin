<template>
  <PageLayout>
    <template #header> </template>
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->

      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <div class="info" slot="extra">
          <div class="created">创建时间: {{ parseDate(item.created) }}</div>
        </div>
        <a-list-item-meta :description="item.mail">
          <a slot="title" :href="item.url">{{ item.author }}</a>
          <a-avatar slot="avatar" :src="parseAvatar(item.mail)" />
        </a-list-item-meta>
        {{ item.text }}
      </a-list-item>
    </a-list>
  </PageLayout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue'
import { List, Avatar } from 'ant-design-vue'
import Rest from '@/api/rest'
import { avatarFromMail } from '@/utils'
import moment from 'moment'
export default {
  components: {
    PageLayout,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AAvatar: Avatar
  },
  data() {
    return {
      listData: []
    }
  },
  async created() {
    const { data } = await Rest('gets', 'Comment')()
    this.listData = [...data]
  },
  methods: {
    parseAvatar(mail) {
      return avatarFromMail(mail)
    },
    parseDate(date) {
      const d = moment(date).format('MMMM Do YYYY, h:mm:ss a')
      return d
    }
  }
}
</script>

<style lang="scss">
.ant-list-item-meta-title {
  margin-bottom: 4px;
}
.ant-list-item-meta {
  display: flex;
  align-items: center;
}
</style>
