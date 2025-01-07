<template>
  <div id="footer">
    <span>Advertisement</span>
    <img id="ad" src="/misc/ad.png" alt="Ad" />
  </div>
</template>

<style lang="scss" scoped>
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
