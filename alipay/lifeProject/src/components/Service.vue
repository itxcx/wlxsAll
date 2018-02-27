<template>
  <div class="Service">
    <ul class="serviceItemList">
      <li v-for="(item,i) in serviceList">
        <section @click="showItemContent(i)">
          <span>{{item.title}}</span>
          <span class="glyphicon glyphicon-menu-right" v-show="!item.itemContentShow" ></span>
          <span class="glyphicon glyphicon-menu-down" v-show="item.itemContentShow"></span>
        </section>
        <p class="serviceContent" v-show="item.contentShow">{{item.content}}</p>
      </li>
    </ul>
    <section class="service-ctrl">
      <p class="guide" @click="goGuide">
        <span>使用指南</span>
        <span class="glyphicon glyphicon-menu-right"></span>
      </p>
      <p class="contact-us" @click="contactUs">
        <span>联系我们</span>
        <span class="glyphicon glyphicon-menu-right"></span>
      </p>
    </section>
    <section class="serviceTime">
      <span>服务时间</span>
      <span>9:00-17:30</span>
    </section>
    <section class="contact-service">
      <span>联系客服</span>
      <span>
        <a href="tel://400-770-7768">400-770-7768</a>
      </span>
    </section>
  </div>
</template>

<script>
    export default {
        name: "service",
        data() {
          return {
            serviceList: [
              {
                title: '关闭柜门后没有扣款?',
                itemContentShow: false,
                content: '在正常的文档流中，通过 CSS 为下拉菜单进行定位。这就意味着下拉菜单可能会由于设置了 overflow 属性的父元素而被部分遮挡或超出视口（viewport）的显示范围。如果出现这种问题，请自行解决。',
                contentShow: false
              },
              {
                title: '多次扣款或扣款与实际金额不符?',
                itemContentShow: false,
                content: '从 v3.1.0 版本开始，我们不再建议对下拉菜单使用 .pull-right 类。如需将菜单右对齐，请使用 .dropdown-menu-right 类。导航条中如需添加右对齐的导航（nav）组件，请使用 .pull-right 的 mixin 版本，可以自动对齐菜单。如需左对齐，请使用 .dropdown-menu-left 类。',
                contentShow: false
              },
              {
                title: '需要退/换购买商品?',
                itemContentShow: false,
                content: `为了向使用辅助技术 - 如屏幕阅读器 - 的用户正确传达一正确的按钮分组，需要提供一个合适的 role 属性。对于按钮组合，应该是 role="group"，对于toolbar（工具栏）应该是 role="toolbar"。
                一个例外是按钮组合只包含一个单一的控制元素或一个下拉菜单（比如实际情况，<button> 元素组成的两端对齐排列的按钮组 ）或下拉菜单。此外，按钮组和工具栏应给定一个明确的label标签，尽管设置了正确的 role 属性，但是大多数辅助技术将不会正确的识读他们。在这里提供的实例中，我们使用 aria-label，但是， aria-labelledby 也可以使用。`,
                contentShow: false
              },
              {
                title: '退款一直未到账?',
                itemContentShow: false,
                content: 'Internet Explorer 8 不支持在两端对齐的按钮组中绘制边框，无论是 <a> 或 <button> 元素。为了照顾 IE8，把每个按钮放入另一个 .btn-group 中即可。',
                contentShow: false
              }
            ]
          }
        },
      mounted (){
        this.$nextTick( () => {

        })
      },
        methods: {
          //显示内容方法
          showItemContent(index) {
            this.serviceList[index].itemContentShow = !this.serviceList[index].itemContentShow;
            this.serviceList[index].contentShow = !this.serviceList[index].contentShow;
          },
          //链接到使用指南页面
          goGuide() {
            this.$router.push({
              name: 'procedure'
            })
          },
          //链接到官网
          contactUs() {
            window.location.href = 'http://www.weilaixiansen.com';
          }
        }
    }
</script>

<style lang="less">
  @backgroundColor: #f6f6f6;
  .Service{
    background: @backgroundColor;
    .serviceItemList{
      list-style: none;
      background: #fff;
      padding: 0 2vh;
      li{
        border-bottom: 1px solid #e4e4e4;
        padding: 2vh 0;
        section{
          span:nth-of-type(1){
            font-size: 2vh;
          }
          span:nth-of-type(2), span:nth-of-type(3){
            display: inline-block;
            float: right;
          }
        }
        .serviceContent{
          margin-top: 1vh;
          text-indent: 2em;
          font-size: 14px;
        }
        &:nth-last-of-type(1){
          border: none;
        }
      }
    }
    .service-ctrl{
      margin: 1.5vh 0;
      background: #fff;
      padding: 0 2vh;
      font-size: 2vh;
      p{
        padding: 2.5vh 0;
        border-bottom: 1px solid #e4e4e4;
        span:nth-of-type(2){
          display: inline-block;
          float: right;
        }
        &:nth-last-of-type(1){
          border: none;
        }
      }
    }
    .serviceTime{
      background: #fff;
      padding: 3vh 2vh;
      font-size: 2vh;
      border-bottom: 1px solid #e4e4e4;
      span:nth-of-type(2){
        display: inline-block;
        float: right;
        color: #5d5d5d;
        font-size: 2.2vh;
      }
    }
    .contact-service{
      background: #fff;
      padding: 3vh 2vh;
      font-size: 2vh;
      span:nth-of-type(2){
        display: inline-block;
        float: right;
        a{
          color: #fe780a;
          font-size: 2.2vh;
        }
      }
    }
  }
</style>
