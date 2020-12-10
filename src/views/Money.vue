<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>
      <p>Money</p>

    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">

import Nav from '@/components/Nav.vue';

export default {
  name: 'Money',
  components: {Nav}
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.nav-wrapper > .content {
  flex-grow: 1;
  overflow: auto;
}
</style>