<template>
  <PageLayout :options="options">
    <template #header>
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
    </template>

    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <a-input
        placeholder="想想取个什么题目比较好呢~"
        v-decorator="[
          'title',
          { rules: [{ required: true, message: '标题是必须的' }] }
        ]"
        size="large"
        v-model="post.title"
      />
      <a-form-item :label="prefix" :colon="false">
        <a-input v-model="post.slug" size="small" />
      </a-form-item>
      <div class="grid-half">
        <codemirror
          v-model="post.text"
          :options="cmOption"
          :events="cmEvents"
          @scroll="handleScroll"
          ref="code"
        />
        <article
          id="markdown-render"
          class="preview"
          v-html="md"
          ref="preview"
        ></article>
      </div>
    </a-form>
  </PageLayout>
</template>

<script>
import { Form as AForm, Input as AInput } from 'ant-design-vue'
import { codemirror } from 'vue-codemirror'
import MD from 'markdown-it'
import prism from 'markdown-it-prism'

import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/theme/3024-day.css'

import 'codemirror/lib/codemirror.css'
import '@/assets/scss/shizuku.scss'

import Button from '@/components/Button/LayoutButton'
import PageLayout from '@/layouts/PageLayout.vue'
import defaultSettings from '@/settings'
import { Rest } from '@/api'

const md = new MD({
  html: true,
  xhtmlOut: true
}).use(prism)

export default {
  data() {
    return {
      options: {
        title: '撰写新文章'
      },
      form: this.$form.createForm(this, { name: 'edit-form' }),
      post: {
        slug: '',
        title: '',
        text: ``
      },
      id: this.$route.query.id,
      cmOption: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        mode: 'text/x-gfm',
        theme: '3024-day',
        tokenTypeOverrides: {
          code: 'code'
        },
        highlightFormatting: true,
        extraKeys: {
          'Ctrl-F': () => {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
            this.$refs.preview.classList.toggle('fullscreen')
          },
          // strong
          'Cmd-B'(cm) {
            const doc = cm.getDoc()
            const selection = doc.getSelection()
            if (selection) {
              doc.replaceSelection(`**${selection}**`)
            } else {
              const cursor = doc.getCursor()
              doc.replaceRange('****', cursor)
              cursor.ch += 2
              doc.setCursor(cursor)
            }
          },
          // italic
          'Cmd-I'(cm) {
            const doc = cm.getDoc()
            const selection = doc.getSelection()
            if (selection) {
              doc.replaceSelection(`*${selection}*`)
            } else {
              const cursor = doc.getCursor()
              doc.replaceRange('**', cursor)
              cursor.ch += 1
              doc.setCursor(cursor)
            }
          },
          // underline
          'Cmd-U'(cm) {
            const doc = cm.getDoc()
            const selection = doc.getSelection()
            if (selection) {
              doc.replaceSelection(`<u>${selection}</u>`)
            } else {
              const cursor = doc.getCursor()
              doc.replaceRange('<u></u>', cursor)
              cursor.ch += 3
              doc.setCursor(cursor)
            }
          },
          // code
          'Alt-`'(cm) {
            const doc = cm.getDoc()
            const cursor = doc.getCursor()
            doc.replaceRange('``', cursor)
            cursor.ch += 1
            doc.setCursor(cursor)
          },
          // ref link
          'Cmd-K'(cm) {
            const doc = cm.getDoc()
            const cursor = doc.getCursor()
            doc.replaceRange('[]()', cursor)
            cursor.ch += 1
            doc.setCursor(cursor)
          },
          // code block
          'Alt-`'(cm) {
            const doc = cm.getDoc()
            const cursor = doc.getCursor()
            doc.replaceRange('```\n\n```', cursor)
            cursor.ch += 3
            doc.setCursor(cursor)
          },
          // tab to space
          Tab(cm) {
            const doc = cm.getDoc()
            const cursor = doc.getCursor()
            doc.replaceRange('  ', cursor)
          }
        }
      },
      cmEvents: ['scroll', 'viewportChange']
    }
  },
  async created() {
    const isEdit = this.id || false
    if (isEdit) {
      const { data } = await Rest('getOne', 'Post')(isEdit)
      const title = `编辑 ${data.title}`
      this.options.title = title
      document.title = `${title} - ${defaultSettings.title}`

      this.post = Object.assign(data)
    } else {
      document.title = this.options.title
    }
  },
  components: {
    PageLayout,
    AForm,
    AFormItem: AForm.Item,
    AInput,
    ATextarea: AInput.TextArea,
    Button,
    codemirror
  },
  methods: {
    handleSubmit() {
      console.log('submit')
    },
    handleScroll(e) {
      const viewport = {
        top: e.lineAtHeight(e.display.scroller.getBoundingClientRect().top),
        bottom: e.lineAtHeight(
          e.display.scroller.getBoundingClientRect().bottom
        )
      }

      const lineConut = e.lineCount()
      const curPos = viewport.top / lineConut
      const preview = this.$refs.preview
      const previewHeight = preview.scrollHeight
      preview.scrollTo({
        left: 0,
        top: curPos * previewHeight * 1.2
      })
    }
  },
  computed: {
    prefix() {
      return `${location.host}/posts/`
    },
    md() {
      return md.render(this.post.text)
    }
  },
  mounted() {
    window.cm = this.$refs.code.codemirror
    setTimeout(() => {
      window.cm.setSize()
      window.cm.refresh()
    }, 2000)
  }
}
</script>

<style scoped>
.grid-half {
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
}
.preview {
  height: 300px;
  overflow: auto;
  padding: 12px 2rem;
}
.preview.fullscreen {
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  height: auto;
  z-index: 9;
  background: #fff;
}
</style>

<style>
.CodeMirror-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
  height: auto;
  z-index: 9;
}
.CodeMirror {
  border-radius: 4px;
}
</style>