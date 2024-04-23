<template>
  <div class="container" id="popup">
    <div class="container__header">
      <img class="logo" src="/popup/header.png" alt="" />
      <img class="close" src="/popup/close.png" alt="" />
    </div>
    <div class="container__profile">
      <div class="avatar">
        <img class="bg" src="/avatar/bg.png" alt="" />
        <img v-if="user.avatar" class="image" :src="user.avatar" alt="" />
      </div>
      <div class="desc">
        <h1 v-if="user.name">{{ user.name }}</h1>
        <p>Has just signed in.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket'],
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.socket.on('new_user_connected', user => {
      this.user = user
      this.openPopUp()
    })
  },
  methods: {
    openPopUp() {
      const popUp = document.getElementById('popup')
      popUp.classList.add('is-open')
      var audio = new Audio('/sounds/online.mp3')
      audio.play()
      setTimeout(() => {
        popUp.classList.remove('is-open')
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  transition: all 1s ease;
  padding: 10px 15px;
  width: 250px;
  height: 135px;
  position: fixed;
  right: 20px;
  bottom: -100%;
  background: rgb(208, 228, 251);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 6px;
  background: linear-gradient(
    180deg,
    rgba(208, 228, 251, 1) 0%,
    rgba(206, 227, 249, 1) 10%,
    rgba(209, 230, 249, 1) 12%,
    rgba(213, 233, 250, 1) 27%,
    rgba(221, 227, 251, 1) 35%,
    rgba(227, 241, 253, 1) 45%,
    rgba(233, 246, 254, 1) 57%,
    rgba(233, 247, 255, 1) 70%,
    rgba(228, 244, 255, 1) 90%
  );
  &__audio {
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close {
      cursor: pointer;
    }
  }
  &__profile {
    display: flex;
    align-items: center;
    gap: 10px;
    .avatar {
      width: 64px;
      height: 64px;
      margin: 10px 0px;
      position: relative;
      img.bg {
        position: absolute;
        top: 0px;
        left: 0px;
      }
      img.image {
        position: absolute;
        top: 4.8px;
        left: 6.1px;
      }
    }
    .desc {
      h1 {
        font-size: 0.9rem;
        line-height: 0.8rem;
        font-weight: 600;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
  &.is-open {
    transition: all 1s ease;
    bottom: 20px;
  }
}
</style>
