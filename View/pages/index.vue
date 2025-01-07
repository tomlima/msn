<template>
  <main class="l-main" id="main">
    <div>
      <div class="l-container">
        <div class="wrapper">
          <div class="login">
            <div class="login__header"></div>
            <div class="login__avatar">
              <div>
                <img
                  data-not-lazy
                  class="thumb"
                  src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/chat-window/1531.png"
                />
                <img
                  data-not-lazy
                  class="frame"
                  src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/background/frame_96.png"
                />
              </div>
            </div>

            <div class="login__form">
              <h1>Sign in</h1>
              <p>Join just with your name</p>
              <input v-model="username" type="text" placeholder="Username" />
              <div class="status">
                <span>Join as: </span>
                <div class="status__block">
                  <div></div>
                  <span>Avaiable</span>
                </div>
              </div>
              <button v-on:click="join" v-if="!loading">Sign in</button>
              <img v-else class="login__loading" src="/msn.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      descriptions: [{ id: 1 }, { id: 2 }, { id: 3 }],
      loading: false
    }
  },
  methods: {
    async join() {
      if (!this.username.trim()) return
      this.loading = true
      this.setUserSettings()
      setTimeout(() => {
        this.$router.push('messeger')
      }, 2000)
    },
    setUserSettings() {
      sessionStorage.setItem('username', this.username)
      sessionStorage.setItem('description', JSON.stringify(this.getRandomDescription()))
      sessionStorage.setItem('avatar', this.getRandomAvatar())
    },
    getRandomDescription() {
      const randonNumber = Math.floor(Math.random() * 3)
      return this.descriptions[randonNumber]
    },
    getRandomAvatar() {
      const randonNumber = Math.floor(Math.random() * 7)
      return `/avatar/${randonNumber}.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  width: 500px;
  height: 600px;
  border: 1px solid #eaf4f8;
  border-radius: 10px;
  background-color: #eaf4f8;
  &__loading {
    width: 60px;
  }
  &__header {
    image-rendering: pixelated;
    background-image: url(https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/background/chat_header.png);
    background-size: 100% 100%;
    margin: 0;
    height: 77px;
    padding: 7px;
    border-radius: 10px 10px 0px 0;
  }
  &__avatar {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .thumb {
      margin: 9px;
      height: 96px;
      border-radius: 2px;
    }
    .frame {
      position: absolute;
      top: 0;
      left: calc(50% - 58px);
    }
  }
  &__form {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 1.3rem;
      color: #557eb9;
      font-weight: 300;
    }
    p {
      font-size: 0.9rem;
    }
    input {
      margin-top: 15px;
      width: 250px;
      height: 30px;
      border-radius: 2px;
      font-size: 0.9rem;
      padding: 10px;
    }
    button {
      margin: 15px 0;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0;
      span {
        font-size: 0.8rem;
      }
      &__block {
        display: flex;
        align-items: center;
        gap: 5px;
        div {
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          display: block;
          width: 10px;
          height: 10px;
          background-color: #57dd26;
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.092);
        }
      }
    }
  }
  button:disabled,
  button:disabled:hover,
  button:disabled:active,
  input[type='button']:disabled,
  input[type='button']:disabled:hover,
  input[type='button']:disabled:active {
    background-color: rgb(204, 204, 204);
    /*197,197,197*/
    -webkit-box-shadow: 0px 0px 0px 1px rgb(204, 204, 204), 0px 0px 0px 2px rgb(173, 173, 173);
    box-shadow: 0px 0px 0px 1px rgb(204, 204, 204), 0px 0px 0px 2px rgb(173, 173, 173);
    color: rgb(135, 135, 135);
  }

  button,
  input[type='button'] {
    outline: none;
    -webkit-transition: background-color 0.5s, -webkit-box-shadow 0.5s;
    transition: background-color 0.5s, -webkit-box-shadow 0.5s;
    -o-transition: box-shadow 0.5s, background-color 0.5s;
    transition: box-shadow 0.5s, background-color 0.5s;
    transition: box-shadow 0.5s, background-color 0.5s, -webkit-box-shadow 0.5s;
    font-size: 13px;
    background-color: rgb(225, 225, 225);
    padding: 3px 10px;
    margin: 2px;
    border: 0;
    -webkit-box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(173, 173, 173);
    box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(173, 173, 173);
    border: 1px dotted transparent;
    color: black;
  }

  button:focus,
  input[type='button']:focus {
    background-color: rgb(225, 225, 225);
    -webkit-box-shadow: 0px 0px 0px 0px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
    box-shadow: 0px 0px 0px 0px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
    border: 1px dotted rgb(17, 17, 17);
  }

  button:hover,
  input[type='button']:hover {
    -webkit-box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
    box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
    background-color: rgb(229, 241, 251);
  }
  button:active,
  input[type='button']:active {
    -webkit-transition: background-color 0s;
    -o-transition: background-color 0s;
    transition: background-color 0s;
    background-color: rgb(204, 228, 247);
    -webkit-box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
    box-shadow: 0px 0px 0px 1px rgb(225, 225, 225), 0px 0px 0px 2px rgb(0, 120, 215);
  }
}
</style>
