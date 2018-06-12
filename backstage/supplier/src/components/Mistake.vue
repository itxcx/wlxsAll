<template>
    <div class="Mistake">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>错拿记录</p>
        </section>
      </header>
      <section class="mistakeList">
        <ul>
          <li v-for="(item, index) in mistakeArray">

          </li>
        </ul>
      </section>
    </div>
</template>

<script>
    export default {
        name: "Mistake",
        data() {
            return {
              mistakeArray: []
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.getMistakeData();
          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/personal'
            })
          },
          //获取数据方法
          getMistakeData() {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/chagrelist`,
              method: 'GET'
            }).then((res) => {
                if(res.data.code == 0) {
                  this.mistakeArray = res.data.data;
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
    }
</script>

<style lang="less">
  .Mistake{
    header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
      .login_top{
        background: #65d172;
        width: 100vw;
        height: 5.997vh;
        font-size: 2.398rem;
        line-height: 5.997vh;
        text-align: center;
        color: #fff;
        font-weight: 500;
        span{
          position: absolute;
          left: 4vw;
          top: 0;
        }
      }
    }
  }
</style>
