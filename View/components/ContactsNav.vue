<template>
  <div id="contactsnav">
    <ul class="iconbar" id="left">
      <button
        class="aerobutton contactaction"
        style="background:url(icons/contacts-window.png) no-repeat center;"
      ></button>
      <button
        class="aerobutton contactaction"
        style="background:url(/icons/contacts-window-2.png) no-repeat center;"
      ></button>
      <button
        class="aerobutton contactaction"
        style="background:url(/icons/contacts-window-3.png) no-repeat center;"
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
</template>

<style lang="scss" scoped>
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
</style>
