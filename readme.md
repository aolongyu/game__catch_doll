# 进度
## 20201208
1. 处理无用标签、设置点击区域宽高、将非必须行内元素换位块级元素、控制nav、prompt、footer缩放超出问题
2. 抛弃alita框架，webpack配置基本框架结构，配置less
3. 处理屏幕适配问题

## 20201209
1. 配置rem，750px-7.5rem
2. 制作第一页页面
3. 绘制页面(抓抓机本体、抓抓券大放送第一个活动 )

## 20201210
1. 绘制完毕页面基本框架
2. 能够实现抓抓机背景色切换
3. 完成抓盒币和抓实物下面按钮切换逻辑
4. 初步制作弹窗
5. 学习pullpage的使用方式

## 20201211
1. 制作弹窗(活动规则、仓库详情、奖励详情、填写地址信息、填写qq信息)
2. 制作消息提示(抓盒币)

## 20201214
1. 绘制完所有弹窗
2. 导入FZY4JW字体
3. 新增抓抓机按钮遮罩并实现切换
4. 处理选择按钮后go的逻辑
5. 去掉所有flex布局，兼容安卓4.x
6. 处理活动二点击签到效果

## 20201215
1. 处理抓抓成就和签到数据化控制
2. 封装弹窗展示函数windowMsgAndBtn
3. 实现弹窗逻辑跳转并动态展示弹窗

# 遇到的一些问题
1. png文件格式无法打包
2. 未完成屏幕适配
3. 因webpack-cli等插件版本过高，无法正常打包

1. 切图左右颜色不同，导致出现过渡线条
2. rem默认转换基准为10px，想要匹配设计稿尺寸
3. font-size设置函数编写问题

1. js无法引入到html中，解决方式为将js变量保存到window下
2. 切图与设计稿不符
3. 切换设备后元素轻微变形

1. inline-block标签间存在空格，需要设置font-size: 0
2. 一个容器内只需要下面一小部分渐透明效果
3. 有时设置margin无效，需改动布局

1. chrome无法显示小于12px的问题问题，viewport缩放处理
2. i标签设置inline-block之后无法设置margin值

1. webpack无法打包问题
2. 开发环境不能正常导入样式，配置时只处理了src，入口文件app.js在src之外