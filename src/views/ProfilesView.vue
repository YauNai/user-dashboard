<template>
  <section class="w-full grid grid-cols-1 lg:grid-cols-2 justify-items-center">
    <div class="w-md">
      <div class="avatar mb-4 w-full justify-center">
        <div class="w-24 rounded-full">
          <img :src="avatar" />
        </div>
      </div>

      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend text-lg">大頭貼</legend>
        <input 
          ref="fileInput"
          type="file" 
          accept="image/jpeg, image/jpg, image/png" 
          class="file-input w-full"
          :class="{'border-error': uploadError}"
          @change="handleFileUpload"
        />
        <span class="label justify-end">必須是 JPEG 或 PNG，並且小於 10 MB。</span>
        
        <!-- 錯誤訊息提示 -->
        <div v-if="uploadError" role="alert" class="alert alert-soft alert-error rounded-full mt-2">
          <i class="bi bi-exclamation-triangle shrink-0"></i>
          <span>{{ uploadError }}</span>
        </div>
      </fieldset>

      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend text-lg">暱稱</legend>
        <input v-model="username" type="text" class="input w-full validator" :placeholder="username" minlength="2" maxlength="20"/>
        <span class="label justify-end">{{ username.length }} / 20</span>
      </fieldset>

      <fieldset class="fieldset w-full mb-4">
        <legend class="fieldset-legend text-lg">電子信箱</legend>
        <input v-model="email" type="email" class="input w-full validator" :placeholder="email" />
      </fieldset>

      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend text-lg">生日</legend>
        <input v-model="birthday" type="text" class="input w-full" disabled />
        <span class="label justify-end">如需更改生日請聯繫客服。</span>
      </fieldset>

      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend text-lg">座右銘</legend>
        <input v-model="motto" type="text" class="input w-full validator" :placeholder="motto" maxlength="20"/>
        <span class="label justify-end">{{ motto.length }} / 20</span>
      </fieldset>

      <fieldset class="fieldset w-full mb-4">
        <legend class="fieldset-legend text-lg">自我介紹</legend>
        <textarea v-model="bio" class="textarea h-24 w-full rounded-2xl validator" maxlength="200"></textarea>
        <span class="label justify-end">{{ bio.length }} / 200</span>
      </fieldset>

      <div v-if="isSaveSuccess" role="alert" class="alert alert-soft alert-success rounded-full mb-4">
        <i class="bi bi-check-lg shrink-0"></i>
        <span>儲存成功!</span>
      </div>
      <button @click="saveInfo" class="btn w-full mb-4" :class="{
        'btn-accent': !isSaveSuccess,
        'btn-success': isSaveSuccess,
      }" :disabled="isSaving || isSaveSuccess">
        <span :class="{
          'loading loading-spinner': isSaving,
        }"></span>
        {{ isSaving ? '' : '儲存變更' }}
      </button>
      <button @click="initInfo" class="btn w-full">取消</button>
    </div>

    <div class="mt-24 hidden lg:block">
      <div class="hover-3d">
        <!-- content -->
        <div class="card bg-base-100 w-96 h-fit shadow-md">
          <figure class="h-64">
            <img :src="avatar" alt="大頭貼" />
          </figure>
          <div class="card-body items-center text-center">
            <h4 class="text-accent-content">超級書蟲</h4>
            <h2 class="card-title mb-4">{{ username }}</h2>
            <p>
              <i class="bi bi-envelope inline-block mr-2"></i>{{ email }}
            </p>
            <p class="mb-4">
              <i class="bi bi-cake inline-block mr-2"></i>{{ birthday }}
            </p>
            <p class="text-start mb-4">{{ bio }}</p>
            <div class="flex flex-col items-center gap-4">
              <i class="bi bi-quote text-4xl"></i>
              <p class="text-lg">{{ motto }}</p>
            </div>
          </div>
        </div>
        <!-- 8 empty divs needed for the 3D effect -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import originAvatar from '@/assets/images/avatar.jpg'
  import { onMounted, ref } from 'vue';

  const isSaving = ref(false)
  const isSaveSuccess = ref(false)
  const uploadError = ref('')
  const fileInput = ref(null)

  const originUsername = ref('熙羊')
  const originEmail = ref('user@site.com')
  const originBio = ref('嘿！我是墨水，一個腦洞永遠在暴走邊緣的骨灰級書蟲。對我來說，看小說不是閱讀而是靈魂的冒險，不管是史詩戰鬥還是超甜戀愛，我都能在腦內補完出一整部動畫！平時最愛在深夜對著鍵盤瘋狂輸出，把關不住的靈感變成文字。這裡沒有深刻的大道理，只有滿滿的熱血與吐槽。如果你也常被故事感動到原地起飛，快推薦我你的私藏書單，讓我們一起在字裡行間找樂子！')
  const originMotto = ref('現實太無聊，所以我決定住在故事裡！')

  const avatar = ref(originAvatar)
  const username = ref('')
  const email = ref('')
  const birthday = ref('1999-02-08')
  const motto = ref('')
  const bio = ref('')

  // 處理檔案上傳
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    uploadError.value = '' // 清除之前的錯誤訊息

    // 如果沒有選擇檔案
    if (!file) {
      return
    }

    // 驗證檔案類型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      uploadError.value = '只能上傳 JPEG 或 PNG 格式的圖片'
      fileInput.value.value = '' // 清空 input
      return
    }

    // 驗證檔案大小 (10 MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      uploadError.value = `檔案大小超過限制! 目前檔案: ${(file.size / 1024 / 1024).toFixed(2)} MB`
      fileInput.value.value = '' // 清空 input
      return
    }

    // 使用 FileReader 讀取圖片並預覽
    const reader = new FileReader()
    
    reader.onload = (e) => {
      avatar.value = e.target.result
    }
    
    reader.onerror = () => {
      uploadError.value = '圖片讀取失敗,請重試'
      fileInput.value.value = ''
    }
    
    reader.readAsDataURL(file)
  }

  const initInfo = () => {
    username.value = originUsername.value
    email.value = originEmail.value
    motto.value = originMotto.value
    bio.value = originBio.value
    avatar.value = originAvatar
    uploadError.value = ''
    if (fileInput.value) {
      fileInput.value.value = '' // 清空檔案選擇
    }
  }

  const saveInfo = () => {
    isSaving.value = true
    setTimeout(() => {
      originUsername.value = username.value
      originEmail.value = email.value
      originMotto.value = motto.value
      originBio.value = bio.value
      // 這裡可以將 avatar.value 上傳到後端伺服器
      isSaving.value = false
      isSaveSuccess.value = true
      setTimeout(() => {
        isSaveSuccess.value = false
      }, 2000);
    }, 1000);
  }

  onMounted(() => {
    initInfo()
  })
</script>

<style scoped></style>