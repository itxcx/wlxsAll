<template>
    <div class="MainContent">
      <router-view/>
    </div>
</template>

<script>
    export default {
      name: "MainContent",
      data() {
          return {
          }
      },
      methods: {

      }
    }
</script>

<style lang="less">
.MainContent{
  width: 85vw;
  height: 80vh;
  background: #f2f2f2;
  position: absolute;
  top: 11vh;
  right: 0;
}
</style>
