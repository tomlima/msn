<template>
  <main class="l-main" id="main">
    <div class="panel">
      <div class="panel__wrapper" id="contacts">
        <div class="panel__header">
          <!----------------------- 
                Title bar 
            ------------------------>
          <div class="panel__titlebar">
            <img
              src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/live_logo.png"
              alt="Windows Live Logo"
            />
            <img
              id="title"
              src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/title_text.png"
            />
          </div>

          <!----------------------- 
                User info
            ------------------------>
          <div class="panel__userinfo">
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
        </div>
        <div id="contactsnav">
          <ul class="iconbar" id="left">
            <button
              class="aerobutton contactaction"
              style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/1480.png) no-repeat center;"
            ></button>
            <button
              class="aerobutton contactaction"
              style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/978.png) no-repeat center;"
            ></button>
            <button
              class="aerobutton contactaction"
              style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/1484.png) no-repeat center;"
            ></button>
          </ul>
          <ul class="iconbar" id="right">
            <button
              class="aerobutton contactaction"
              style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/1489.png) no-repeat center;"
            ></button>
            <button
              class="aerobutton contactaction"
              style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/329.png) no-repeat center;"
            ></button>
          </ul>
        </div>
        <div class="search">
          <input id="contact-search" type="text" placeholder="Find a contact..." />
          <button
            class="searchbar-btn"
            style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/1131.png) no-repeat center;"
          ></button>
          <button
            class="searchbar-btn"
            style="background:url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/1132.png) no-repeat center;"
          ></button>
        </div>
        <div class="contact-list">
          <button class="listitem">
            <img
              class="arrow"
              src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/arrow_placeholder.png"
            />
            <b>Online ( {{ users.length }} )</b>
          </button>

          <button v-if="users.length > 0" v-for="(user, index) in users" :key="index" class="listitem contact">
            <img
              class="aerobutton status-icon"
              src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/status/online.png"
              alt="Online"
            />
            <span class="contact-text name">{{ user.name }}&nbsp;-&nbsp;</span>
            <p v-if="user.description.id == 1" class="contact-text message" style="color: darkgray;">
              JuSt cHilling...&nbsp;<img src="/emoticons/5.webp" alt="" />
            </p>
            <p v-if="user.description.id == 2" class="contact-text message" style="color: darkgray;">
              I d0nt knoW wHat Im d0ing hEre...
            </p>
            <p v-if="user.description.id == 3" class="contact-text message" style="color: darkgray;">
              <img
                class="emoticon"
                src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/contacts-window/595.png"
              />
              <a href="http://notimplemented.lol">Linkin Park - Numb</a>
            </p>
          </button>
        </div>
        <div id="footer">
          <span>Advertisement</span>
          <img id="ad" src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/ad.png" alt="" />
        </div>
      </div>
    </div>

    <Chat />
    <Popup v-if="this.socket" :socket="this.socket" />
  </main>
</template>

<script>
import Popup from '../components/popup.vue'

export default {
  data() {
    return {
      message: '',
      users: [],
      userName: 'Snorlax',
      userDesc: '',
      userAvatar: '',
      userStatus: 1,
      socket: false
    }
  },
  async mounted() {
    await this.newSocketConnection()
    this.newUserConnectedListener()
    this.getAllUsersListener()
    this.newUserSettings()
    this.getAllConnectedUsers()
  },
  methods: {
    async handleSubmit() {
      if (!this.message.trim()) return
    },
    async newSocketConnection() {
      const socket = (this.socket = this.$nuxtSocket({
        name: 'chat'
      }))
      this.socket = await socket.connect()
      this.$store.commit('setSocket', this.socket)
      return this.socket
    },
    newUserConnectedListener() {
      this.socket.on('new_user_connected', data => {
        this.users.push(data)
      })
    },
    getAllUsersListener() {
      this.socket.on('get_all_users', users => {
        this.users = users
      })
    },
    getAllConnectedUsers() {
      this.socket.emit('get_users')
    },
    newUserSettings() {
      this.userName = sessionStorage.getItem('username')
      this.userDesc = JSON.parse(sessionStorage.getItem('description'))
      this.userAvatar = sessionStorage.getItem('avatar')
      this.socket.emit('connect_user', {
        name: this.userName,
        description: this.userDesc,
        avatar: this.userAvatar
      })
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  height: 100vh;
  min-height: 306px;
  padding: 10px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.panel {
  display: flex;
  height: 100vh;
  min-height: 306px;
  padding: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  &__wrapper {
    background-color: #ecf6f9;
    border: thin solid #707070;
    border-radius: 8px;
    box-shadow: 0 0 5px #00000050;
  }
  &__header {
    background-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/background/msgres_fullheader.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 95px;
    width: 100%;
  }
  &__titlebar {
    padding: 6px;
    padding-bottom: 5px;
    height: 28px;
    display: flex;
    flex-direction: row;
    height: fit-content;
  }
  &__userinfo {
    display: flex;
    height: 69px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 14px;
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
  @media (max-width: 600px) {
    width: 100%;
  }
}

.contact-list {
  padding: 10px;
}

.aerobutton {
  background-color: transparent;
  border: 2px solid transparent;
}
.aerobutton:hover {
  border-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/aerobutton_border.png')
    2 round;
}
.aerobutton:active {
  border-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/aerobutton_border_down.png')
    2 round;
}

.emoticon {
  margin: 0 3px;
}

.smallarrowbtn {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
}
.arrowdown {
  height: 5px;
  margin-left: 4px;
}

.alerts {
  display: flex;
  align-items: center;
  height: 19px;
  background-color: white;
  border: thin solid #bed6e0;
  border-bottom: none;
}
.alerttext {
  margin: 0;
  margin-left: 3px;
}

#contacts {
  background-color: white;
  float: left;
  width: 30%;
  min-width: 274px;
  height: 100%;
  position: relative;
}

#title {
  height: 10px;
  margin-top: 4px;
  margin-left: 4px;
}

#frame {
  height: 62px;
  width: auto;
  position: absolute;
  top: 31px;
  left: 9px;
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

.arrowcontacts {
  margin-left: 8px;
  fill: #b9dde7 !important;
}

#contactsnav {
  background-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/background/msgres_navbar.png');
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 31px;
  padding: 0;
  box-shadow: 0px 1px 2px #00000077;
}
.iconbar {
  list-style: none;
  width: 50%;
  margin: 0;
  padding: 3px 8px 2px 8px;
}
.contactaction {
  height: 25px;
  width: 28px;
  margin: 0 2px;
  marker: none;
}
#left > .contactaction {
  float: left;
}
#right > .contactaction {
  float: right;
}

.search {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 38px;
  padding: 8px 8px 8px 7px;

  border-bottom: thin solid #e2eaf3;
}
#contact-search {
  font-size: 8pt;
  height: 23px;
  width: 100%;
  padding: 8px;
  margin-right: 7px;

  border: thin solid #c7c7c7;
  box-shadow: inset 0 0 3px #0000002a;
}
#contact-search:focus {
  border: thin solid #52c9fd;
  box-shadow: 0 0 6px #52cafdbe;
}

.searchbar-btn {
  height: 23px;
  width: 22px;
  border: 2px solid transparent;
}
.searchbar-btn:hover {
  border-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/button_border.png') 2 round;
}
.searchbar-btn:active {
  border-image: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/button_border_down.png') 2
    round;
}

.listitem {
  border: none;
  font-size: 8pt;
  text-align: start;
  height: 25px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: white;
  a {
    color: blue;
    text-decoration: underline;
  }
}
.listitem:focus {
  background-color: #d2eaf6;
}
.arrow {
  width: 9px;
  height: 9px;
  margin-right: 2px;
  background: url('https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/arrows.png') 0 0;
}

.contact {
  padding-left: 19px;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
}
.status-icon {
  height: 22px;
  box-sizing: content-box;
}
.contact-text {
  margin: 0;
  text-anchor: middle;
  display: inline-block;
  text-overflow: ellipsis;
  font-size: 0.7rem;
}
.message {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  a {
    color: blue;
    font-size: 0.7rem;
    text-decoration: underline;
  }
  img {
    width: 15px;
  }
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 5px 10px;
  background-color: #ecf6f9;
  border-radius: 0 0 8px 8px;
  border-top: thin solid #bed6e0;
  span {
    color: #9bb3d4;
    font-size: 0.8rem;
  }
}
#ad {
  display: block;
  margin: 10px auto;
}
</style>
