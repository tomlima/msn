<template>
  <div class="search">
    <input id="contact-search" type="text" placeholder="Find a contact..." />
    <button class="searchbar-btn" style="background:url(/icons/contacts-window-4.png) no-repeat center;"></button>
    <button class="searchbar-btn" style="background:url(/icons/contacts-window-5.png) no-repeat center;"></button>
  </div>
</template>

<style lang="scss" scoped>
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
  border-image: url(/misc/button_border.png) 2 round;
}
</style>
