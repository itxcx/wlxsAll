<template>
    <div class="UpdatePsw">
      <section class="updateContent">
        <div class="psw">
          <label for="psw">旧密码:</label>
          <input type="password" name="password" id="psw"/>
        </div>
        <div class="againPassword">
          <label for="againPsw">新密码:</label>
          <input type="password" name="againPassword" id="againPsw">
        </div>
        <div class="submitInfo">
          <button>提交修改</button>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "UpdatePsw",
      data() {
        return {

        }
      },
      methods: {

      }
    }
</script>

<style lang="less">
  .UpdatePsw{
      .updateContent{
        border: 1px solid pink;
        width: 100vw;
        height: 100vh;
      }
  }
</style>
