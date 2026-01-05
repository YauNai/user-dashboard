<template>
  <div class="mb-8">
    <h1 class="text-2xl text-center font-bold mb-4">累計閱讀</h1>
    <div class="w-full h-96">
      <Chart :type="'line'" :labels="totalReaded.months" :label="'累計閱讀書數'" :data="totalReaded.count" />
    </div>
  </div>

  <div class="grid grid-cols-2">

    <div>
      <h1 class="text-2xl text-center font-bold mb-4">閱讀類型</h1>
      <div class="w-full h-96">
        <Chart :type="'pie'" :labels="genresCount.genres" :label="'數量'" :data="genresCount.count" />
      </div>
    </div>

    <div>
      <h1 class="text-2xl text-center font-bold mb-4">收到讚數</h1>
      <div class="w-full h-96">
        <Chart :type="'bar'" :labels="receivedLikes.type" :label="'讚數'" :data="receivedLikes.likes" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Chart from '@/components/Chart.vue';

  const totalReaded = {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    count: [12, 23, 31, 50, 55, 68, 82, 89, 98, 115, 125, 143]
  }

  const genresCount = {
    genres: ['奇幻', '科幻', '推理', '科普', '哲學', '其他'],
    count: [36, 30, 21, 18, 27, 9]
  }

  const receivedLikes = {
    type: ['書評', '寫作', '繪畫', '遊記', '市集'],
    likes: [128, 179, 192, 264, 163]
  }
</script>

<style lang="scss" scoped></style>