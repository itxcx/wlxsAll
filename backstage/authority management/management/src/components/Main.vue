<template>
  <div class="Main">
    <section>
      <Button>Default</Button>
      <Button type="primary" @click="clickHead">Primary</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </section>
    <section>
      <Icon type="checkmark"></Icon>
      <Icon type="arrow-shrink"></Icon>
      <Icon type="close-circled"></Icon>
    </section>
    <!--//input输入框-->
    <section>
        <Input v-model="value14" placeholder="Enter something..." clearable style="width: 200px"/>
    </section>
    <!--//滑块-->
    <section>
      <Slider v-model="value1" :step="5" show-stops show-input></Slider>
      <Slider v-model="value9" :tip-format="format"></Slider>
    </section>
    <!--//日期时间选择-->
    <section style="padding-left: 250px;">
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
      <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 200px"></DatePicker>
    </section>
    <!--//评分-->
    <section>
      <Rate allow-half v-model="valueHalf" @on-change="changeRate" show-text></Rate>
    </section>
    <!--//文件上传-->
    <section>
      <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
    </section>
    <section>
      <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </section>
    <!--//颜色选择-->
    <section>
      <Row>
        <Col span="12">有默认值<ColorPicker v-model="color1" /></Col>
        <Col span="12">无默认值<ColorPicker v-model="color2" /></Col>
      </Row>
    </section>
    <!-- menu 导航菜单 -->
    <section>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-paper"></Icon>
          内容管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people"></Icon>
          用户管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon type="settings"></Icon>
          综合设置
        </MenuItem>
      </Menu>
    </section>
    <!-- tab 有动画属性的标签页 -->
    <Tabs :animated="true">
      <TabPane label="标签一">标签一的内容</TabPane>
      <TabPane label="标签二">标签二的内容</TabPane>
      <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      // theme1: 'dark',
      theme1: 'primary',
      valueHalf: 3.5,
      value1: 10,
      value9: 13,
      value14: 'test',
      msg: 'Welcome to Your Vue.js App',
      color1: '#19be6b',
      color2: '',
    }
  },
  methods:{
    clickHead: function() {
      let name = this.msg;
      console.log(name);
    },
    format (val) {
      return 'Progress: ' + val + '%';
    },
    changeRate () {
      console.log(this.valueHalf);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.Main{
  padding-left: 100px;
  background: #f2f2f2;
  section{
    margin-top: 2vh;
    cursor: pointer;
  }
}
</style>
