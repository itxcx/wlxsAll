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
          <li v-for="(list, index) in userList">
            <ul class="userItem">
              <li><Checkbox v-model="list.checked"></Checkbox></li>
              <li>{{list.name}}</li>
              <li>{{list.tel}}</li>
              <li>{{list.name}}</li>
              <li>{{list.checked}}</li>
              <li>{{list.password}}</li>
            </ul>
          </li>
        </ul>
      <section class="opration">
        <Button type="info" @click="checkJurisdic">查看</Button>
        <Button type="success" @click="editJurisdic">编辑</Button>
        <Button type="error" @click="deleteJurisdic">删除</Button>
      </section>
      <Modal title="查看用户信息" v-model="checkModal" class-name="vertical-center-modal">
        <ul>
          <li v-for="list in userItem">
            <div>
              <h3>{{list.name}}</h3>
              <h4>{{list.tel}}</h4>
            </div>
            <div>{{list.list}}</div>
          </li>
        </ul>
      </Modal>
      <Modal title="编辑用户信息" v-model="editModal" class-name="vertical-center-modal">
        <p v-for="list in this.editData">{{list}}</p>
      </Modal>
      <Modal title="提示信息" v-model="deleteModal">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>操作提示</span>
        </p>
        <div style="text-align:center">
          <p>删除后数据无法恢复</p>
          <p>确定要永久删除?</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="confirmDelete">确认删除</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
      name: "jurisdic",
      data () {
        return {
          deleteArray: [], //需要删除的项目
          editModal: false, //控制编辑模态框的显示
          deleteModal: false, //控制删除模态框的显示
          modal_loading: false,
          checkModal: false,
          editData: '' ,//编辑框展示的内容
          userList: [], //所有用户列表
          userItem: []  //需要操作的用户信息
        }
      },
      mounted() {
        this.$nextTick( () => {
          this.$ajax({
            url: '/api/login/getUserInfo',
            method: 'get',
          }).then( (res) => {
            this.userList = res.data;
            if(this.userList.length > 0) {
              for(let i = 0; i < this.userList.length; i++) {
                this.$set(this.userList[i], 'checked', false);
              }
            }
          }).catch( (error) => {
            console.log(error);
          })
        })
      },
      methods: {
        userSelect(index) {
          //this.$store.state.userList[index].checked = !this.$store.state.userList[index].checked;
        },
        //查看用户权限方法
        checkJurisdic() {
          let itemIndex = null;
          for(let i = 0; i < this.userList.length; i++) {
            if(this.userList[i].checked) {
              itemIndex = i;
            }
          }
          if(itemIndex !== null) {
            this.userItem = [];
            this.userItem.push(this.userList[itemIndex]);
            this.checkModal = true;
          }
        },
        //编辑用户方法,如果有多个选择项,则编辑最后选中的项目
        editJurisdic() {
          // for(let i = 0; i < this.$store.state.userList.length; i++) {
          //   if(this.$store.state.userList[i].checked === true) {
          //     this.editModal = true;
          //     this.editData = this.$store.state.userList[i].username;
          //   }
          // }
        },
        //删除方法
        deleteJurisdic() {
          let deleteArray = [];
          // for(let i = 0; i < this.$store.state.userList.length; i++) {
          //   if(this.$store.state.userList[i].checked === true) {
          //     this.deleteModal = true;
          //     deleteArray.push(this.$store.state.userList[i].tel);
          //    // this.confirmDelete(deleteArray);
          //   }
          // }
        },
        //确认删除方法
        confirmDelete(deleteArray) {
          this.modal_loading = true;
          // this.$ajax({
          //   url: '',
          //   method: 'POST',
          //   data: {deleteArray: deleteArray}
          // }).then((res) => {
          //   if(res.code === 0) {
          //     this.deleteModal = false;
          //   }
          // }).catch((error) => {
          //   console.log(error);
          // })

          setTimeout(() => {//测试方法, 需要删除
            this.deleteModal = false;
            this.modal_loading = false;
          }, 4000)
        }
      }
    }
</script>

<style lang="less">
  .Jurisdic{
    font-family: Arial, sans-serif;
    .userListHeader{
      background: rgba(33, 112, 147, 0.5);
      list-style: none;
      overflow: hidden;
      li{
        padding: 1vh 0;
        width: 12vw;
        float: left;
        border-left: 1px solid #e9eaec;
        color: #333;
        font-weight: 600;
        text-align: center;
        &:nth-of-type(1){
          width: 5vw;
        }
        &:nth-last-of-type(1) {
          width: 28vw;
        }
      }
    }
    .userList{
      background: #fff;
      list-style: none;
      height: 70vh;
      padding: 2vh 0;
      overflow: auto;
      >li{
        border: 1px solid #e9eaec;
        margin: 0;
        transition: all 0.3s linear;
        &:nth-of-type(1){
          margin: 0;
        }
        &:hover{
          background: rgba(154,207,234,.5);
        }
        .userItem{
          overflow: hidden;
          list-style: none;
          li{
            padding: 1vh ;
            width: 12vw;
            float: left;
            border-left: 1px solid #e9eaec;
            &:nth-of-type(1){
              width: 5vw;
              text-align: center;
            }
            &:nth-last-of-type(1) {
              width: 28vw;
            }
          }
        }
      }
    }
    .opration{
      text-align: center;
      padding-top: 10px;
    }
  }
</style>
