import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Dialog, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)

//全局挂载message弹框提示
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
