<template>
  <canvas ref="myChart" id="myChart"></canvas>
</template>

<script setup>
  import { nextTick, onMounted, onUnmounted, useTemplateRef } from 'vue'
  import { makeChart } from '@/composables/makeChart';

  const props = defineProps(['type', 'labels', 'label', 'data'])

  const ctx = useTemplateRef('myChart')
  let chart = null

  onMounted(async () => {
    await nextTick()
    chart = makeChart(ctx.value, props.type, props.labels, props.label, props.data)
  })

  onUnmounted(() => {
    chart.destroy()
  })
</script>

<style scoped></style>