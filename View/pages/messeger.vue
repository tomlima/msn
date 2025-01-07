<template>
  <main id="main">
    <div class="panel">
      <div class="panel__wrapper" id="contacts">
        <div class="panel__header">
          <!----------------------- 
          Title bar 
          ------------------------>
          <div class="panel__titlebar">
            <img src="/misc/live_logo.png" alt="Windows Live Logo" />
            <img id="title" src="/misc/title_text.png" />
          </div>

          <!----------------------- 
          User info
          ------------------------>
          <UserInfo v-if="this.socket" :socket="this.socket" />
        </div>

        <ContactsNav />
        <Search />
        <ContactList v-if="this.users.length > 0" :users="this.users" />
        <Footer />
      </div>
    </div>
    <Chat />
    <Popup v-if="this.socket && this.userId" :socket="this.socket" :userId="this.userId" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      users: [],
      socket: false
    }
  },
  async mounted() {
    // Socket connection
    await this.newSocketConnection()

    // Socket listeners
    this.newUserConnectedListener()
    this.newConnectionListener()
    this.getAllUsersListener()

    // Misc
    this.getAllConnectedUsers()
  },
  methods: {
    async newConnectionListener() {
      this.socket.on('connect', () => {
        this.userId = this.socket.id
      })
    },
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
        if (data.id && data.id !== this.userId) this.users.push(data)
      })
    },
    getAllUsersListener() {
      this.socket.on('get_all_users', users => {
        this.users = users.filter(user => user.id !== this.userId)
      })
    },
    getAllConnectedUsers() {
      this.socket.emit('get_users')
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
  min-height: 306px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
  @media (max-width: 600px) {
    width: 100%;
  }
}

.smallarrowbtn {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
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
  min-width: 450px;
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
</style>
