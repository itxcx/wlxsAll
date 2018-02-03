<template>
  <div class="banner">
      <div class="wrapper" :style="{width:originalData.img_width+'vw',height:originalData.img_height+'vh'}" @mouseover="stop" @mouseout="play">
        <div class="wrapper-content" :class="{wrapper_trans:isTrans}" :style="{width:originalData.img_width*(originalData.num+2)+'vw',height:originalData.img_height+'vh',left:-originalData.img_width+'vw'}" ref="wrapperContent">
          <div class="wrapper-content_img"  :style="{width:originalData.img_width+'vw',height:originalData.img_height+'vh',backgroundImage: 'url('+ imgPath[imgLength-1] +')'}"></div>
          <div class="wrapper-content_img"  v-for="imgs in imgPath" :style="{width:originalData.img_width+'vw',height:originalData.img_height+'vh',backgroundImage: 'url('+ imgs +')'}"></div>
          <div class="wrapper-content_img"  :style="{width:originalData.img_width+'vw',height:originalData.img_height+'vh',backgroundImage: 'url('+ imgPath[0] +')'}"></div>
        </div>
        <div class="wrapper-buttons" :style="{left:(originalData.img_width/2-5)+'vw'}">
          <span v-for="(item,i) in imgPath"   :class="['wrapper-button',{'wrapper_on':index==i+1}]"  @click="turnTo(i+1)"></span>
        </div>
        <a href="javascript:;" class="wrapper-arrow wrapper-prev" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="prev">&lt;</a>
        <a href="javascript:;" class="wrapper-arrow wrapper-next" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="next">&gt;</a>
      </div>
  </div>
</template>
<script>
  export default ({
    name: 'banner',
    data(){
      return {
        originalData:{
          img_width: 100,
          img_height: 30,
          btn_width: 40,
          btn_height: 40,
          num: 4,
          delay: 300
        },
        isTrans: true,//最后一张图片，index为1时，需要立即跳到第二张index也为1的图片，用来是否transition
        index: 1,
        timer: null,//setInterval
        clickdelay: false,//用来防止连续点击
        imgPath: ['./static/images/scroll1.jpg','./static/images/scroll2.jpg','./static/images/scroll3.jpg','./static/images/scroll4.jpg'],
        imgLength: 4//图片张数,如果图片数组改变,张数也要改变
      }

    },
    methods:{
      next(){
        if(this.clickdelay){
          return
        }
        this.clickdelay = true;
        if(this.index === this.originalData.num){
          this.index = 1;
        }else{
          this.index += 1
        }
        this.animate(this.originalData.img_width);
      },
      prev(){
        if(this.clickdelay){
          return;
        }
        this.clickdelay = true;
        if(this.index === 1){
          this.index = this.originalData.num;
        }else{
          this.index -= 1;
        }
        this.animate(-this.originalData.img_width);
      },
      animate(offset){
        let node = this.$refs.wrapperContent;
        let self = this;
        let left = parseInt(node.style.left) - offset;
        this.isTrans = true;
        node.style.left = left + 'vw';
        setTimeout(function(){
          if(left < -(self.originalData.num * self.originalData.img_width)){
            self.isTrans = false;
            node.style.left = -self.originalData.img_width + 'vw';
            self.clickdelay = false; //当到达最后一张图片时
          }
          if(left > -100){
            self.isTrans = false;
            node.style.left = -self.originalData.num * self.originalData.img_width + 'vw';
            self.clickdelay = false;//当到达第一张图片时
          }
        },this.originalData.delay);
      },
      play(){
        let self = this;
        this.timer = setInterval(function(){
          self.next();
        },4000)
      },
      stop(){
        this.clickdelay = false;//防止连续点击
        clearInterval(this.timer);
        this.timer = null;
      },
      turnTo(flag){
        if(flag === this.index){
          return;
        }else{
          let offset = (flag-this.index) * this.originalData.img_width;
          this.index = flag;
          this.animate(offset);
        }
      }
    },
    mounted(){
      /*判断过渡动画是否完成*/
      let node = this.$refs.wrapperContent;
      let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      let self = this;

      for(let t in transitions){
        if( node.style[t] !== undefined ){
          var transitionEvent = transitions[t];
        }
      }
      transitionEvent && node.addEventListener(transitionEvent, function() {
        self.clickdelay = false;
      });
      this.play();
    }
  })
</script>
<style lang="less">
  .banner{
  .wrapper{
    position: relative;
    overflow: hidden;
  }
  .wrapper-content{
    position: absolute;
    left: 0;
    z-index: 1;
  }
  .wrapper-content_img{
    border: none;
    outline:none;
    float: left;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .wrapper-buttons{
    position: absolute;
    width: 100vw;
    height: 2vh;
    text-align: center;
    bottom: 1vh;
    z-index: 2;
  }
  .wrapper-button{
    float: left;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    margin: 0 2.5px;
    cursor: pointer;
  }
  .wrapper-arrow{
    position: absolute;
    width: 40px;
    height:40px;
    cursor: pointer;
    background-color: rgba(0,0,0,.3);
    color: #fff;
    display: none;
    top:50%;
    line-height: 40px;
    font-size: 36px;
    text-align: center;
    z-index: 2;
  }
  .wrapper:hover .wrapper-arrow{
    display: block;
    background-color: rgba(0,0,0,.7);
  }
  .wrapper-prev{
    left:10px;
  }
  .wrapper-next{
    right:10px;
  }
  .wrapper_on{
    background-color: #F73C3B;
  }
  .wrapper_trans{
    transition: left .3s ease
  }
  }
</style>
