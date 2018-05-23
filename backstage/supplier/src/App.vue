<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    font-family: "PingFang SC";
    font-size: 1vh;
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  }
  html{
    /*filter: grayscale(100%);*/
    /*-webkit-filter: grayscale(100%);*/
    /*-moz-filter: grayscale(100%);*/
    /*filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);*/
    /*filter: grayscale(1);*/
  }
  ul{
    list-style: none;
  }
</style>
