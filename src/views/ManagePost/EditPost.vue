<template>
  <PageLayout :options="options">
    <template #header>
      <div class="btn-container">
        <Button
          @click.native="handleSubmit"
          :icon="['far', 'save']"
          backcolor="#2ecc71"
          name="保存"
        />
        <Button
          @click.native="handleSubmit"
          :icon="['far', 'save']"
          name="发布"
        />
      </div>
    </template>

    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <a-input
        placeholder="想想取个什么题目比较好呢~"
        v-decorator="[
          'title',
          { rules: [{ required: true, message: '标题是必须的' }] }
        ]"
        size="large"
      />
      <a-form-item :label="prefix" :colon="false">
        <a-input v-model="post.slug" size="small" />
      </a-form-item>
      <a-textarea placeholder="好好构思哦~" :rows="15" />
    </a-form>
  </PageLayout>
</template>

<script>
import { Form as AForm, Input as AInput } from 'ant-design-vue'
import Button from '@/components/Button/LayoutButton'
import PageLayout from '@/layouts/PageLayout.vue'
import defaultSettings from '@/settings'
import { Rest } from '@/api'
export default {
  data() {
    return {
      options: {
        title: '撰写新文章'
      },
      form: this.$form.createForm(this, { name: 'edit-form' }),
      post: {
        slug: '',
        title: ''
      }
    }
  },
  async created() {
    const isEdit = this.$route.params.id || this.$route.query.id || false
    if (isEdit) {
      const { data } = await Rest('getOne', 'Post')(isEdit)
      const title = `编辑 ${data.title}`
      this.options.title = title
      document.title = `${title} - ${defaultSettings.title}`
    }
  },
  components: {
    PageLayout,
    AForm,
    AFormItem: AForm.Item,
    AInput,
    ATextarea: AInput.TextArea,
    Button
  },
  methods: {
    handleSubmit() {
      console.log('submit')
    },
    handleSetVal() {
      console.log(...arguments)
    }
  },
  computed: {
    prefix() {
      return `${location.host}/posts/`
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
}
</style>
