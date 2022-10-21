<template>
<div>
  <status-bar/>

</div>
</template>

<script lang="ts" setup>
import StatusBar from '@/components/StatusBar.vue'
</script>

<style scoped lang="less">
:deep(button:enabled:active) {
  background-color: #22a7f2  ;
}
</style>
