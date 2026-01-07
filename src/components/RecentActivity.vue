<template>
  <div v-for="item, index in data" :key="index">
    <p class="text-sm text-neutral-400 mb-2">{{ item.date }}</p>
    <div v-if="item.rating" class="rating mb-2">
      <div class="mask mask-star bg-amber-500" aria-label="1 star" :aria-current="item.rating === '1'"></div>
      <div class="mask mask-star bg-amber-500" aria-label="2 star" :aria-current="item.rating === '2'"></div>
      <div class="mask mask-star bg-amber-500" aria-label="3 star" :aria-current="item.rating === '3'"></div>
      <div class="mask mask-star bg-amber-500" aria-label="4 star" :aria-current="item.rating === '4'"></div>
      <div class="mask mask-star bg-amber-500" aria-label="5 star" :aria-current="item.rating === '5'"></div>
    </div>
    <p class="text-xl mb-2"><a :href="item.link" class="link link-hover text-amber-500 text-xl mb-2">{{ item.event
        }}</a></p>
    <div class="flex gap-4">
      <img v-if="item.image" :src="item.image" class="aspect-square object-center object-cover h-20 rounded-xl">
      <p class="text-neutral-400 mb-2">{{ item.eventPreview }}</p>
    </div>
    <div class="divider"></div>
  </div>

  <div class="join w-full justify-center">
    <button class="join-item btn btn-disabled">第一頁</button>
    <button class="join-item btn btn-disabled">«</button>
    <button class="join-item btn btn-active">1</button>
    <button class="join-item btn">2</button>
    <button class="join-item btn btn-disabled">...</button>
    <button class="join-item btn">11</button>
    <button class="join-item btn">12</button>
    <button class="join-item btn">»</button>
    <button class="join-item btn">最尾頁</button>
  </div>
</template>

<script setup>
  import image01 from '../assets/images/activities/feed_01.jpg'
  import image02 from '../assets/images/activities/feed_02.jpg'
  import imageBilbo from '../assets/images/activities/feed_bilbo.jpg'

  const data = [
    {
      date: '2026/1/7 15:01',
      event: '書評》沒有翅膀的人類，該如何獲得自由？讀《不馴之翼》',
      image: image01,
      eventPreview: '英國作家托爾金（J. R. R. Tolkien）在〈論精靈故事〉（On Fairy-Stories）提到，人類有一種渴望，是和其他生命建立交流（communion）。「Communion」一詞來自天主教語境，原意是分享聖餐，但在幻想文學中，那也意味著深層的意識共鳴。這揭示了幻想文學之所以重要，在於能夠做到寫實小說無法做到的事情，好比和美麗、令人敬畏的生物發展我們在現實中難以想像的關係。...',
      rating: '4',
      link: '#',
    },
    {
      date: '2025/12/14 9:20',
      event: '🎉 您的創作 【創作】魔戒：魔戒同盟｜第一章：期待已久的宴會 突破 10,000 觀看次數！',
      image: image02,
      eventPreview: '',
      rating: '',
      link: '#',
    },
    {
      date: '2025/12/13 23:05',
      event: '🎉 您的創作 【創作】魔戒：魔戒同盟｜第一章：期待已久的宴會 突破 1,000 觀看次數！',
      image: image02,
      eventPreview: '',
      rating: '',
      link: '#',
    },
    {
      date: '2025/12/13 20:31',
      event: '【創作】魔戒：魔戒同盟｜第一章：期待已久的宴會',
      eventPreview: '當袋底洞的比爾博．袋金斯先生宣布他不久將舉辦一場盛大宴會，用來慶祝他的一百一十一歲生日時，哈比屯的居民便大為興奮地議論紛紛。...',
      image: image02,
      rating: '5',
      link: '#',
    },
    {
      date: '2025/11/06 23:31',
      event: '〔同人〕比爾博．袋金斯',
      eventPreview: '第一次在這裡分享我的畫作，希望大家會喜歡><...',
      image: imageBilbo,
      rating: '3',
      link: '#',
    },
  ]
</script>

<style scoped></style>