<template>
  <div class="gystation">
    <p @click="turn">顾渊工作站</p>
  </div>
</template>

<script>
export default {
  methods: {
    turn() {
      window.open(`/GuYuan-station/index1.html`)
    }
  }
}
</script>

<style>
</style>