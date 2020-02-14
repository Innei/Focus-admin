<template>
  <PageLayout>
    <template #header> </template>
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->

      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <div class="info" slot="extra">
          <div class="post-title">
            所属文章: <a :href="getPostUrl(item.pid)">{{ item.pid.title }}</a>
          </div>
          <div class="created">创建时间: {{ parseDate(item.created) }}</div>
          <div class="ip">归属地: {{ item.ip }}</div>
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
import { avatarFromMail, time } from '@/utils'
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
      return time.parseDate(date, 'LLLL')
    },
    getPostUrl(post) {
      return `${process.env.VUE_APP_WEB_URL}/posts/${post.categoryId?.slug ||
        null}/${post.slug}`
    }
  }
}
</script>

<style lang="scss">
.ant-list-item-meta-title {
  margin-bottom: 4px !important;
}
.ant-list-item-meta {
  display: flex;
  align-items: center;
}
</style>
