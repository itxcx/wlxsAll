<template>
    <div class="Jurisdic">
      <Table border :columns="columns4" :data="data1"></Table>
      <Button @click="handleEdit">编辑</Button>
      <Button @click="handleDelete">删除</Button>
    </div>
</template>

<script>
    export default {
      name: "jurisdic",
      data () {
        return {
          columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '姓名',
              key: 'name'
            },
            {
              title: '手机号',
              key: 'tel'
            },
            {
              title: '地址',
              key: 'address'
            }
          ],
          data1: [
            {
              name: '未来鲜森',
              tel: 18648822556,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: '未来鲜森',
              tel: 17629025050,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: '未来鲜森',
              tel: 18601031450,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: '未来鲜森',
              tel: 18648822556,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ]
        }
      },
      methods: {
        //编辑方法
        handleEdit(status) {

        },
        //删除方法
        handleDelete() {

        }
      }
    }
</script>

<style lang="less">

</style>
