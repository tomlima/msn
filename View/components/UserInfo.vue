<template>
  <div class="container">
    <div class="avatar">
      <div class="avatar__wrapper">
        <img :src="userAvatar" alt="Profile Picture" />
      </div>
    </div>
    <div class="profile">
      <button class="aerobutton">
        <h3>{{ userName }}</h3>
        <p class="status">(Disponível)</p>
        <img
          class="arrowdown arrowcontacts"
          src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/small_arrow.svg"
        />
      </button>
      <span v-if="userDesc.id == 1"> JuSt cHilling...&nbsp;<img src="/emoticons/5.webp" alt="" /> </span>
      <span v-if="userDesc.id == 2"> I d0nt knoW wHat Im d0ing hEre...</span>
      <span v-if="userDesc.id == 3">
        <img
          class="emoticon"
          src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/595.png"
        />
        <a href="http://notimplemented.lol">Linkin Park - Numb</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket'],
  data() {
    return {
      userName: 'Snorlax',
      userDesc: '',
      userAvatar: '',
      userStatus: 1,
      userId: false
    }
  },
  mounted() {
    this.newUserSettings()
  },
  methods: {
    newUserSettings() {
      this.userName = sessionStorage.getItem('username')
      console.log(sessionStorage.getItem('username'))
      this.userDesc = JSON.parse(sessionStorage.getItem('description'))
      this.userAvatar = sessionStorage.getItem('avatar')
      this.socket.emit('connect_user', {
        name: this.userName,
        description: this.userDesc,
        avatar: this.userAvatar,
        status: this.userStatus
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 69px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 14px;
  .arrowdown {
    height: 5px;
    margin-left: 4px;
  }
  .arrowcontacts {
    margin-left: 8px;
    fill: #b9dde7 !important;
  }
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 2px;
    background: linear-gradient(
      184deg,
      rgba(169, 234, 153, 1) 0%,
      rgba(70, 199, 87, 0.306) 10%,
      rgba(159, 234, 153, 1) 20%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffff;
      height: 43px;
      width: 43px;
      border: 1px solid rgba(0, 0, 0, 0.436);
      padding: 3px;
      img {
        max-width: 100%;
      }
    }
  }
  .profile {
    margin: auto;
    margin-left: 14px;
    margin-top: 3px;
    height: 100%;
    .status {
      margin: 0;
      font-size: 8pt;
      color: #b9dde7;
      margin-left: 8px;
    }
    p {
      line-height: 0;
    }
    button {
      padding: 0;
      height: fit-content;
      display: flex;
      text-align: start;
      align-items: center;
      h3 {
        font-size: 10pt;
        font-weight: 600;
        color: white;
        margin: 0;
      }
    }
    h3 {
      line-height: 1rem;
    }
    span {
      font-size: 0.7rem;
      color: #b9dde7;
      text-align: left;
      display: flex;
      align-items: center;
      img {
        width: 15px;
      }
      a {
        font-size: 0.7rem;
        color: #b9dde7;
        text-align: left;
        text-decoration: underline;
      }
    }
  }
}
</style>
