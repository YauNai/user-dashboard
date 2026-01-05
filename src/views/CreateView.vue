<template>
  <section class="grid grid-cols-3 gap-8">
    <div class="w-full">

      <fieldset class="fieldset mb-2">
        <legend class="fieldset-legend text-xl">書名</legend>
        <input v-model="bookTitle" type="text" class="input w-full" maxlength="20" required>
        <span class="label justify-end">{{ bookTitle.length }} / 20</span>
      </fieldset>

      <div class="flex mb-4 justify-center">
        <img :src="bookCover" alt="封面" class="aspect-[calc(14.8/21)] object-cover w-60 rounded-xl shadow-sm">
      </div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-xl">封面</legend>
        <input type="file" class="file-input w-full">
        <span class="label justify-end">必須是 JPEG 或 PNG，並且小於 10 MB。</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-xl">作者</legend>
        <input v-model="bookAuthor" type="text" class="input w-full" maxlength="20" required>
        <span class="label justify-end">{{ bookAuthor.length }} / 20</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-xl">風格類型</legend>
        <input v-model="bookGenre" type="text" class="input w-full" maxlength="10" required>
        <span class="label justify-end">{{ bookGenre.length }} / 10</span>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-xl">評分</legend>
        <div class="rating rating-xl justify-evenly bg-yellow-100 p-4 rounded-2xl shadow-xs">
          <input v-model="bookRating" type="radio" id="rating" class="mask mask-star-2 bg-warning" value="1" />
          <input v-model="bookRating" type="radio" id="rating" class="mask mask-star-2 bg-warning" value="2" />
          <input v-model="bookRating" type="radio" id="rating" class="mask mask-star-2 bg-warning" value="3" />
          <input v-model="bookRating" type="radio" id="rating" class="mask mask-star-2 bg-warning" value="4" />
          <input v-model="bookRating" type="radio" id="rating" class="mask mask-star-2 bg-warning" value="5" />
        </div>
      </fieldset>

    </div>

    <div class="col-span-2">

      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend text-xl">標題</legend>
        <input v-model="title" type="text" class="input w-full" maxlength="20" required>
        <span class="label justify-end">{{ title.length }} / 20</span>
      </fieldset>

      <div class="grid grid-cols-2 gap-8 mb-4">
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend text-xl">分類</legend>
          <select class="select w-full">
            <option value="" selected>書評</option>
            <option value="">寫作</option>
            <option value="">繪畫</option>
            <option value="">遊記</option>
            <option value="">市集</option>
          </select>
        </fieldset>

        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend text-xl">可見性</legend>
          <select class="select w-full">
            <option value="" selected>公開</option>
            <option value="">僅限朋友</option>
            <option value="">會員限定</option>
            <option value="">私人</option>
          </select>
        </fieldset>
      </div>

      <fieldset class="fieldset w-full mb-4">
        <legend class="fieldset-legend text-xl">內文</legend>
        <textarea v-model="body" class="textarea w-full h-100" required></textarea>
      </fieldset>

      <div class="flex flex-col gap-4">
        <div v-if="submitError" role="alert" class="alert alert-error alert-soft">
          <span><i class="bi bi-x me-2"></i>{{ submitError }}</span>
        </div>
        <button @click="handleSubmit" class="btn btn-accent" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="loading loading-ring"></span>
          <span v-if="!isSubmitting"><i class="bi bi-file-earmark-plus"></i>發布</span>
        </button>
        <div class="grid grid-cols-2 gap-2">
          <button @click="handleSaving" class="btn" :class="{
            'bg-orange-100 border-orange-200': !isSaving && !isSavingSuccess,
            'btn-info': isSavingSuccess
          }" :disabled="isSaving">
            <span v-if="!isSaving && !isSavingSuccess"><i class="bi bi-floppy me-2"></i>儲存草稿</span>
            <span v-if="isSaving" class="loading loading-ring"></span>
            <span v-if="isSavingSuccess"><i class="bi bi-check-lg me-2"></i>儲存成功！</span>
          </button>
          <button class="btn">取消</button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
  import imgPlaceholder from '@/assets/images/400x600.svg'
  import { computed, ref } from 'vue';

  const bookTitle = ref('')
  const isBookTitleValid = computed(() => {
    return bookTitle.value.length > 0 && bookTitle.value.length < 21
  })

  const bookCover = ref(imgPlaceholder)
  const bookAuthor = ref('')
  const isBookAuthorValid = computed(() => {
    return bookAuthor.value.length > 0 && bookAuthor.value.length < 21
  })

  const bookGenre = ref('')
  const isBookGenreValid = computed(() => {
    return bookGenre.value.length > 0 && bookGenre.value.length < 11
  })

  const bookRating = ref(null)
  const isBookRatingValid = computed(() => {
    return bookRating.value !== null
  })


  const title = ref('')
  const isTitleValid = computed(() => {
    return title.value.length > 0 && title.value.length < 21
  })

  const body = ref('')
  const isBodyValid = computed(() => {
    return body.value.length > 0
  })

  const isSubmitting = ref(false)
  const submitError = ref('')
  const handleSubmit = () => {
    submitError.value = ''

    if (!isBookTitleValid.value || !isBookAuthorValid.value || !isBookGenreValid.value || !isBookRatingValid.value || !isTitleValid.value || !isBodyValid.value) {
      submitError.value = '請確認所有欄位皆已正確填寫！'
      return
    }

    isSubmitting.value = true

    setTimeout(() => {
      isSubmitting.value = false
    }, 3000)
  }

  const isSaving = ref(false)
  const isSavingSuccess = ref(false)
  const handleSaving = () => {
    isSavingSuccess.value = false
    isSaving.value = true

    setTimeout(() => {
      isSaving.value = false
      isSavingSuccess.value = true
      setTimeout(() => {
        isSavingSuccess.value = false
      }, 2000);
    }, 1000);
  }
</script>

<style scoped></style>