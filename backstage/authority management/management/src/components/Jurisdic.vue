<template>
    <div class="Jurisdic">
        <ul class="userListHeader">
          <li>用户名</li>
          <li>手机号</li>
          <li>备注</li>
        </ul>
        <ul class="userList">
          <li v-for="(list, index) in this.$store.state.userList">
            <ul class="userItem">
              <li>{{list.username}}</li>
              <li>{{list.tel}}</li>
              <li>{{list.opr}}</li>
            </ul>
          </li>
        </ul>
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
  .Jurisdic{
    .userListHeader{
      background: #1b6d85;
      list-style: none;
      overflow: hidden;
      li{
        padding: 1vh 0;
        width: 33%;
        float: left;
        border-left: 1px solid #80858f;
        color: #fff;
        font-weight: 600;
        text-align: center;
      }
    }
    .userList{
      background: #f5f5f5;
      list-style: none;
      >li{
        border: 1px solid #80858f;
        margin: 2px 0;
        transition: all 0.3s linear;
        &:nth-of-type(1){
          margin: 0;
        }
        &:hover{
          background: #d2d2dd;
        }

        .userItem{
          overflow: hidden;
          list-style: none;
          li{
            padding: 1vh ;
            width: 33%;
            float: left;
            border-left: 1px solid #80858f;
          }
        }
      }
    }
  }
</style>
