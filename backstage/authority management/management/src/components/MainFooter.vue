<template>
    <div class="mainfooter">
      <p>Copyright&nbsp;&copy;&nbsp;2017-2018&nbsp;
        <a href="http://www.weilaixiansen.com" target="_blank" title="访问未来鲜森官方网站">西安未来鲜森智能信息技术有限公司</a>
        <span>&nbsp;&nbsp;</span>
        <span>技术支持: 400-770-7768</span>
      </p>
      <p>陕ICP备17018219号-1</p>
    </div>
</template>

<script>
    export default {
        name: "MainFooter"
    }
</script>

<style lang="less">
  .mainfooter{
    width: 85vw;
    height: 8vh;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 1px solid #1a1a1a;
    padding-top: 1vh;
    font-weight: 600;
    p{
      color: #1b6d85;
      text-align: center;
      a{
        color: #1b6d85;
        transition: all 0.3s linear;
        &:hover{
          color: #ff6600;
        }
      }
    }
  }

</style>
