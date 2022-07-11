<template>
  <div class="gystation">
    <router-link to="/GyStationIndex">顾渊工作站</router-link>
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