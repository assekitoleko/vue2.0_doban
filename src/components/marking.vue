<template>
  <div id="marking">
    <slot name="movie"></slot>
    <slot name="book"></slot>
  </div>
</template>
<script>
  export default {
    name: 'marking'
  }
</script>
<style>
  #marking{
    /*display: flex;*/
    /*justify-content: space-around;*/
    margin-top: 15px;
  }
  #marking span{
    color: #ffb712;
    border: 1px solid #ffb712;
    border-radius: 4px;
    display: inline-block;
    padding: 10px 20px;
    margin-right: 20px;
    cursor:pointer;
  }
</style>
