<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    watch: {
      '$router' (to, from) {
        let isBack = this.$router.isBack;  //  监听路由变化时的状态为前进还是后退
        if(isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    }
  }

</script>

<style lang="less">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, font, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  header, footer, nav, section, article, aside,
  .container-fluid,.container,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td{
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
  }
  html, body{
    width: 100vw;
    height: 100vh;
    font-family: "PingFang SC";
    font-size: 1vh;
    overflow-x: hidden;
    -webkit-user-select: none;
  }
  html{
    /*filter: grayscale(100%);*/
    /*-webkit-filter: grayscale(100%);*/
    /*-moz-filter: grayscale(100%);*/
    /*filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);*/
    /*filter: grayscale(1);*/
  }
  body{
    position: fixed;
    top: 0;
    left: 0;
  }
  ul{
    list-style: none;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
