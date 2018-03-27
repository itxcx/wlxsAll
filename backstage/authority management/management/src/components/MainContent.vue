<template>
    <div class="MainContent">
      <section class="MianPage" v-show="this.$route.path === '/main'">
        <Timeline>
          <TimelineItem color="green">
            <Icon type="trophy" slot="dot"></Icon>
            <span>2018年3月1日未来鲜森发布里程碑版本</span>
          </TimelineItem>
          <TimelineItem>2018年3月2日未来鲜森发布1.0版本</TimelineItem>
          <TimelineItem>2018年3月4日未来鲜森发布2.0版本</TimelineItem>
          <TimelineItem>2018年3月6日未来鲜森发布3.0版本</TimelineItem>
          <TimelineItem>2018年3月8日未来鲜森发布4.0版本</TimelineItem>
          <TimelineItem>2018年3月10日未来鲜森发布5.0版本</TimelineItem>
          <TimelineItem>2018年3月12日未来鲜森发布6.0版本</TimelineItem>
          <TimelineItem>2018年3月14日未来鲜森发布7.0版本</TimelineItem>
          <TimelineItem>2018年3月16日未来鲜森发布8.0版本</TimelineItem>
          <TimelineItem>2018年3月18日未来鲜森发布9.0版本</TimelineItem>
        </Timeline>
      </section>
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
      mounted() {
        this.$nextTick(() => {
        })
      },
      methods: {

      }
    }
</script>

<style lang="less">
.MainContent{
  width: 85vw;
  height: 80vh;
  background: #ffffff;
  position: absolute;
  top: 11vh;
  right: 0;
  .MianPage{
    margin: 2vh 2vw;
  }
}
</style>
