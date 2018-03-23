<template>
    <div class="Jurisdic">
        <ul class="userListHeader">
          <li></li>
          <li>用户名</li>
          <li>手机号</li>
          <li>权限等级</li>
          <li>最近操作</li>
          <li>备注</li>
        </ul>
        <ul class="userList">
          <li v-for="(list, index) in this.$store.state.userList">
            <ul class="userItem">
              <li><Checkbox @on-change="userSelect(index)"></Checkbox></li>
              <li>{{list.username}}</li>
              <li>{{list.tel}}</li>
              <li>{{list.username}}</li>
              <li>{{list.checked}}</li>
              <li>{{list.opr}}</li>
            </ul>
          </li>
        </ul>
      <Button type="success" @click="editModal = true">编辑</Button>
      <Button type="error" @click="handleDelete">删除</Button>
      <Modal title="Title" v-model="editModal" class-name="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
      </Modal>
    </div>
</template>

<script>
    export default {
      name: "jurisdic",
      data () {
        return {
          deleteArray: [],
          editModal: false,
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
        userSelect(index) {
          this.$store.state.userList[index].checked = !this.$store.state.userList[index].checked;
        },
        //编辑方法
        handleEdit(status) {

        },
        //删除方法
        handleDelete() {
          let deleteArray = [];
          for(let i = 0; i < this.$store.state.userList.length; i++) {
            if(this.$store.state.userList[i].checked === true) {
             deleteArray.push(this.$store.state.userList[i].tel);
            }
          }
          // this.$ajax({
          //   url: '',
          //   method: 'POST',
          //   data: {deleteArray: deleteArray}
          // }).then((res) => {
          //   if(res.code === 0) {
          //     console.log(res.code);
          //   }
          // }).catch((error) => {
          //   console.log(error);
          // })
        }
      }
    }
</script>

<style lang="less">
  .Jurisdic{
    .userListHeader{
      background: #217093;
      list-style: none;
      overflow: hidden;
      li{
        padding: 1vh 0;
        width: 19%;
        float: left;
        border-left: 1px solid #80858f;
        color: #fff;
        font-weight: 600;
        text-align: center;
        &:nth-of-type(1){
          width: 5%;
        }
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
          background: #ffffc0;
        }

        .userItem{
          overflow: hidden;
          list-style: none;
          li{
            padding: 1vh ;
            width: 19%;
            float: left;
            border-left: 1px solid #80858f;
            &:nth-of-type(1){
              width: 5%;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
