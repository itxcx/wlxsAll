<template>
    <div class="NoticeList">
      <header>消息通知管理</header>
      <Tabs :value="nameList">
        <TabPane :label="label" name="all">
          <Collapse v-model="value1">
            <Panel name="1">
              小谢子赶紧去上货1
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="2">
              小谢子赶紧去上货2
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="3">
              小谢子赶紧去上货3
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="4">
              小谢子赶紧去上货4
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="5">
              小谢子赶紧去上货5
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="6">
              小谢子赶紧去上货6
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="7">
            小谢子赶紧去上货7
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
          </Panel>
            <Panel name="8">
              小谢子赶紧去上货8
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="9">
              小谢子赶紧去上货9
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="10">
              小谢子赶紧去上货10
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane label="上货通知" name="t1">
          <Collapse v-model="value1">
            <Panel name="1">
              小谢子赶紧去上货4
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="2">
              小谢子赶紧去上货5
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="3">
              小谢子赶紧去上货6
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane label="库存变更" name="t2">
          <Collapse v-model="value1">
            <Panel name="1">
              小谢子赶紧去上货7
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="2">
              小谢子赶紧去上货8
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="3">
              小谢子赶紧去上货9
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane label="系统推送消息" name="t3">
          <Collapse v-model="value1">
            <Panel name="1">
              小谢子赶紧去上货10
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="2">
              小谢子赶紧去上货11
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
            <Panel name="3">
              小谢子赶紧去上货12
              <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae harum natus non placeat suscipit, totam? Animi doloribus earum nihil reiciendis rem sapiente voluptatum. Asperiores dolor enim esse maiores modi?</p>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </div>
</template>

<script>
    export default {
      name: "NoticeList",
      data() {
          return {
            nameList: null,
            label: (h) => {
              return h('div', [
                h('span', '全部消息通知'),
                h('Badge', {
                  props: {
                    count: 10
                  }
                })
              ])
            }
          }
      },
      mounted() {
        this.$nextTick(() => {
          this.nameList = this.$route.query.namelist;
        })
      }
    }
</script>

<style lang="less">
.NoticeList{
  padding: 2vh;
  height: 80vh;
  overflow-y: auto;
  header{
    font-size: 2.5vh;
    font-weight: 600;
  }
}
</style>
