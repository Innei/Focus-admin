<template>
  <div class="full bg">
    <div class="dialog">
      <Card style="width: 300px" title="欢迎回来~">
        <Form @submit="onSubmit" :form="form">
          <FormItem>
            <AInput
              size="large"
              placeholder="admin"
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入账户名',
                      whitespace: true
                    }
                  ]
                }
              ]"
            >
              <Icon slot="prefix" type="user" />
            </AInput>
          </FormItem>
          <FormItem>
            <AInput
              size="large"
              placeholder="888888"
              type="password"
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: '请输入密码', whitespace: true }
                  ]
                }
              ]"
            >
              <Icon slot="prefix" type="lock" />
            </AInput>
          </FormItem>
          <FormItem>
            <Button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
              >登录</Button
            >
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import { Card, Form, Input as AInput, Icon, Button } from 'ant-design-vue'
export default {
  name: 'Login',
  components: { Card, Form, FormItem: Form.Item, AInput, Icon, Button },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },

  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$store
            .dispatch('user/login', values)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.logging = false
            })
            .catch(() => {
              this.logging = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.full {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  position: relative;
}
.bg {
  background: $deepBg;
}
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 16px 24px -8px #232323d1;
  overflow: hidden;
  border-radius: 24px;
}
</style>
