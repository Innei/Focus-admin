<template>
  <PageLayout>
    <template #header>
      <SButton :icon="['fas', 'check']" @click.native="handleSelectAll" />

      <SButton
        :icon="['fas', 'trash']"
        backcolor="#e74c3c"
        @click.native="$router.push({ name: 'edit-posts' })"
      />
    </template>
    <Snip :loading="loading">
      <a-list item-layout="vertical" size="large" :data-source="listData">
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
            <div class="avatar" slot="avatar">
              <a-checkbox
                @change="selectCurrent(item._id)"
                :checked="select.has(item._id)"
              >
                <a-avatar :src="parseAvatar(item.mail)" />
              </a-checkbox>
            </div>
          </a-list-item-meta>
          {{ item.text }}
        </a-list-item>
      </a-list>
    </Snip>

    <div class="center">
      <a-pagination
        simple
        :default-current="page.currentPage"
        :total="page.total"
        @change="handleTo"
      />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue'
import Snip from '@/components/Spin'
import { List, Avatar, Pagination, Checkbox } from 'ant-design-vue'
import Rest from '@/api/rest'
import { avatarFromMail, time } from '@/utils'
import SButton from '@/components/Button/SmallButton'
export default {
  components: {
    PageLayout,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AAvatar: Avatar,
    APagination: Pagination,
    ACheckbox: Checkbox,
    Snip,
    SButton
  },
  data() {
    return {
      listData: [],
      page: {},
      loading: true,
      select: new Set()
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData(p = 1) {
      this.loading = true
      const { data, page } = await Rest('gets', 'Comment')({ page: p })
      this.listData = [...data]
      this.page = { ...page }

      this.loading = false
    },
    selectCurrent(id) {
      if (this.select.has(id)) {
        this.select.delete(id)
      } else {
        this.select.add(id)
      }
      this.select = new Set(this.select)
    },
    parseAvatar(mail) {
      return avatarFromMail(mail)
    },
    parseDate(date) {
      return time.parseDate(date, 'LLLL')
    },
    getPostUrl(post) {
      return `${process.env.VUE_APP_WEB_URL}/posts/${post.categoryId?.slug ||
        null}/${post.slug}`
    },
    async handleTo(page) {
      await this.fetchData(page)
      this.select = new Set()
    },
    handleSelectAll() {
      if (this.select.size === this.listData.length) {
        this.select = new Set()
        return
      }
      this.listData.map(({ _id }) => {
        this.select.add(_id)
      })
      this.select = new Set(this.select)
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
  width: 100%;
}
</style>
<style lang="scss">
.ant-list-item-meta-title {
  margin-bottom: 4px !important;
}
.ant-list-item-meta {
  display: flex;
  align-items: center;
}
</style>
