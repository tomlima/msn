<template>
  <div class="contact-list">
    <button class="listitem">
      <img
        class="arrow"
        src="https://raw.githubusercontent.com/AndroidWG/WLMOnline/master/assets/general/arrow_placeholder.png"
      />
      <b>Online ( {{ users.length }} )</b>
    </button>

    <!-- Users -->
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
</template>

<script>
export default {
  props: ['users']
}
</script>

<style lang="scss" scoped>
.contact-list {
  padding: 10px;
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
  background: url(/misc/arrow.png) 0 0;
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
</style>
