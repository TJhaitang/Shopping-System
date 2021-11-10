# 数据库大作业-更新日志
## 1109wsr
### 增加
- 增加了登录成功后的token存储（localStorage）以及基于token的路由导航守卫
- 增加了基于token的退出功能

### 删除
- 删除了多余的页面，现在登录直接跳转到首页

### 其他
- 下拉框el-dropdown-item绑定单击事件用的是@click.native！

## 1109徐京洲
### 增加
- 在login中的method::test()中增加了token的使用方法，测试可用

## 1108徐京洲
### 增加
- 增加了获取验证码，验证码将发送到email字段的邮箱中，使用时需要传递一个包含email字段的JSON数据。(可以直接传loginForm，只要有email字段就行)
- 增加了登录处理，使用type字段区分商家登录与用户登录，要求输出邮箱、密码与邮箱验证码
- 增加了token，token将在登录成功后作为一个键值对返回，用以确认用户身份，避免重复登录
- 增加了注册处理，返回status，success即为成功，EmailAlreadyExist指这个邮箱已经被注册过了，CodeError指验证码错误
- 增加了merchant表和code表

### 删除
- 删除了\api文件夹，现在后端代码位置见接口文档(不过我代码没怎么写注释，出问题了可能问我要快一点)(以及我确实还是新手了，文档不一定写的对....)

### 其他
- result取数据的问题我就改了一部分，大家登录的时候遇到问题的话可以再试试
- 大家有兴趣可以注册试试，这个uid是自动自增的，注册的早uid就靠前的(试过了，可以用

## 1106范碧珂
### 增加
- 在element.js里import了很多element，之后应该会用到
- My.vue里简单的一个侧边显示的Container，预计之后不会用到Home.vue和Message.vue了。。。

## 1104范碧珂
### 增加
- 增加了发送验证码按钮的触发事件（向后端发送邮箱/login.vue）
- 增加Home.vue，作为登陆后的页面（暂时用一个按钮跳转，现在上面还什么都没有...）

## 1031徐京洲
### 增加
- 增加了api文件夹
- 增加了接口文档(/src/api/接口文档.md)
- 增加了登录信息处理页面，但还有一些问题
- 增加了vue.config.js文件，在其中进行了代理设置
- 增加了邮件发送功能

### 修复
- 修复了http请求错误码500问题(/vue.config.js)

### 删除
- 在github中删除了vue.global.js,并将其加入了.gitignore中

### 其他
- **如果大家第一次拉取这些文件的时候看到了这个，这说明你的仓库中没有vue.global.js文件，请下载它并放到/src下(和App.vue同级)**
- [下载地址](http://60.205.226.43/repo/vue.global.js)
- **请大家在本次pull之后更改vue.config.js中的内容，并将这个文件加入到.gitignore文件中**
- 更改方法见vue.config.js中的注释
- 加入方法为在.gitignore中写上vue.config.js

