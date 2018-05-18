<template>
    <div class="Record">
      <header>
        <section class="login_top">上下架记录</section>
        <section class="selectDate">
          <DatePicker type="daterange" size="small" split-panels placeholder="选择查询日期"></DatePicker>
        </section>
      </header>
    </div>
</template>

<script>
    export default {
        name: "Record",
        data() {
            return {}
        },
        mounted() {
          this.$nextTick(() => {

          })
        },
        methods: {}
    }
</script>

<style lang="less">
  @header_background: #66D172;
    .Record{
      header{
        background: @header_background;
        .login_top{
          width: 100vw;
          height: 5.997vh;
          font-size: 2.398rem;
          line-height: 5.997vh;
          text-align: center;
          color: #fff;
          font-weight: 500;
        }
        .selectDate{
          width: 47.7333vw;
          margin: 0 auto;
        }
      }
    }
  .ivu-date-picker{
    width: 100%;
    input{
      display: block;
      width: 47.7333vw;
      margin: 1.874vh auto;
      background: @header_background;
      border-radius: 20px;
      outline: none;
      font-size: 1.724rem;
      color: #fff;
      padding-left: 2vw;
      &::placeholder{
        color: #fff;
        text-align: center;
      }
    }
    /*i{*/
      /*display: none;*/
    /*}*/
  }
  .ivu-select-dropdown{
    left: 0!important;
  }
  .ivu-date-picker-with-range .ivu-picker-panel-body {
   min-width: 100vw!important;
  }
  .ivu-picker-panel-body{
    width: 100vw!important;
  }
  .ivu-input-icon{
    right: 0.5333vw;
    bottom: 1.6995vh;
    color: #fff;
  }
  /*.ivu-date-picker .ivu-select-dropdown{*/
    /*width: 100vw;*/
  /*}*/
  /*.ivu-icon{*/
    /*color: #000!important;*/
  /*}*/
  /*.ivu-picker-panel-icon-btn .ivu-date-picker-prev-btn .ivu-date-picker-prev-btn-arrow{*/
    /*color: #fff;*/
  /*}*/
  span.ivu-date-picker-cells-cell {
    width: 6.412vw;
    height: 2.098vh;
    cursor: pointer;
  }
  .ivu-date-picker-cells {
    width: 50vw;
    margin: 0;
    white-space: normal;
  }
  .ivu-input-icon-normal+.ivu-input {
    padding-right: 0;
  }
  .ivu-input-small{
    padding: 0;
  }
  .ivu-date-picker-with-range .ivu-picker-panel-content{
    width: 50vw;
  }
  .ivu-date-picker-cells-header span {
    display: inline-block;
    width: 5.87vw;
    height: 4.098vh;
  }
  .ivu-date-picker-cells-cell{
    margin-left: 1px;
  }
</style>
