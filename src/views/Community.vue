<template>
  <ul class="list bg-base-100 rounded-box shadow-md">

    <li v-for="item, index in data" :key="index" class="list-row">
      <div><img class="size-10 rounded-box cursor-pointer" :src="item.avatar" /></div>
      <div>
        <a href="#" class="link link-hover">{{ item.name }}</a>
        <div class="text-xs font-semibold opacity-60">{{ item.date }}</div>
      </div>
      <p class="list-col-wrap text-lg">
        {{ item.event }}
      </p>
      <button v-if="item.eventType === 'post'" class="btn btn-accent">
        <i class="bi bi-book text-md"></i> 閱讀
      </button>
      <button v-if="item.eventType === 'follow'" class="btn btn-info">
        <i class="bi bi-star text-md"></i> 追隨對方
      </button>
      <button v-if="item.eventType === 'friend'" class="btn btn-success">
        <i class="bi bi-check text-2xl"></i> 接受
      </button>
      <button v-if="item.eventType === 'friend'" class="btn btn-warning">
        <i class="bi bi-x text-2xl"></i> 拒絕
      </button>
      <button v-if="item.eventType === 'friend'" class="btn btn-error">
        <i class="bi bi-ban text-md"></i> 封鎖
      </button>
    </li>
  </ul>
</template>

<script setup>
  import avatarCersei from '../assets/images/community/cersei.jpeg'
  import avatarImp from '../assets/images/community/imp.jpeg'
  import avatarJaime from '../assets/images/community/jaime.jpeg'
  import avatarJon from '../assets/images/community/jon.jpeg'
  import avatarTarly from '../assets/images/community/tarly.jpeg'

  const data = [
    {
      avatar: avatarCersei,
      name: '___cerseiiiiii___',
      date: '2025-12-09 06:38',
      event: '向您傳送好友邀請',
      eventType: 'friend',
      link: '',
    },
    {
      avatar: avatarImp,
      name: '小惡魔',
      date: '2025-10-28 20:01',
      event: '向您傳送好友邀請',
      eventType: 'friend',
      link: '',
    },
    {
      avatar: avatarJaime,
      name: '黃金右手哥',
      date: '2025-10-07 07:42',
      event: '向您傳送好友邀請',
      eventType: 'friend',
      link: '',
    },
    {
      avatar: avatarJon,
      name: '雪醬🐺',
      date: '2025-09-07 07:42',
      event: '開始追隨您',
      eventType: 'follow',
      link: '',
    },
    {
      avatar: avatarTarly,
      name: '山姆威爾．塔利',
      date: '2025-06-16 12:01',
      event: '發表了 即使是恆星之火也終將煙滅',
      eventType: 'post',
      link: '#',
    },
  ]
</script>

<style scoped></style>