<script setup>
import Statistics from '@/components/Statistics.vue';

</script>

<template>

  <!-- name of each tab group should be unique -->
  <div class="tabs tabs-lift">
    <input type="radio" name="home_tabs" class="tab" aria-label="統計資料" checked="checked" />
    <div class="tab-content bg-base-100 border-base-300 p-6">
      <Statistics />
    </div>

    <input type="radio" name="home_tabs" class="tab" aria-label="近期活動" />
    <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

    <input type="radio" name="home_tabs" class="tab" aria-label="Tab 3" />
    <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
  </div>



</template>
