<template>

  <div class="divider mb-8">隱私權設定</div>
  <section class="mb-16">

    <div class="mb-4">
      <label class="label mb-2">
        <input @change="saveChange('顯示生日')" v-model="showBirthday" type="checkbox" class="toggle checked:bg-success" />
        顯示生日
      </label>
      <p>悅讀 上的使用者{{ showBirthday ? '' : '不' }}可以看到您的生日。</p>
    </div>

    <div class="mb-4">
      <label class="label mb-2">
        <input @change="saveChange('顯示年齡')" v-model="showAge" :disabled="showBirthday" type="checkbox"
          class="toggle checked:bg-success" />
        顯示年齡
      </label>
      <p>悅讀 上的使用者{{ showAge ? '' : '不' }}可以看到您的年齡。無法生日同時顯示。</p>
    </div>

    <div class="mb-4">
      <label class="label mb-2">
        <input @change="saveChange('顯示電子信箱')" v-model="showEmail" type="checkbox" class="toggle checked:bg-success" />
        顯示電子信箱
      </label>
      <p>悅讀 上的使用者{{ showEmail ? '' : '不' }}可以看到您的電子信箱。</p>
    </div>

    <div class="mb-4">
      <p class="mb-2">誰可以看到您的個人資訊？</p>
      <select @change="saveChange('個人資訊')" class="select">
        <option selected>任何人</option>
        <option>朋友</option>
        <option>只有我自己</option>
      </select>
    </div>

    <div class="mb-4">
      <p class="mb-2">誰可以向您發出好友邀請？</p>
      <select @change="saveChange('好友邀請')" class="select">
        <option selected>任何人</option>
        <option>朋友的朋友</option>
        <option>無</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="label mb-2">
        <input @change="saveChange('Cookie')" v-model="acceptCookie" type="checkbox" checked="checked"
          class="toggle checked:bg-success" />
        {{ acceptCookie ? '' : '不' }}同意 悅讀 使用 Cookie
      </label>
      <p>為提供您更優質的服務，悅讀 使用 Cookies。<a href="#" class="link">點此了解更多我們的隱私權條款</a>。</p>
    </div>

    <div class="mb-4">
      <button class="btn bg-[#1A77F2] text-white border-[#005fd8] mb-2">
        <i class="bi bi-facebook"></i>連結 Facebook 帳號
      </button>
      <p>連結後即可利用 Facebook 進行登入。</p>
    </div>

    <div class="mb-4">
      <button class="btn bg-[#03C755] text-white border-[#00b544] mb-2">
        <i class="bi bi-line"></i>連結 Line 帳號
      </button>
      <p>連結後即可利用 Line 進行登入。</p>
    </div>

    <div class="mb-4">
      <button class="btn bg-white border-[#e5e5e5] mb-2">
        <i class="bi bi-google"></i>連結 Google 帳號
      </button>
      <p>連結後即可利用 Google 進行登入。</p>
    </div>

    <div class="mb-4">
      <button class="btn bg-black text-white border-black mb-2">
        <i class="bi bi-apple"></i>連結 Apple 帳號
      </button>
      <p>連結後即可利用 Apple 進行登入。</p>
    </div>

    <div class="toast">
      <div v-for="alert, index in toastArr" :key="index" class="alert alert-success">
        <span>{{ alert }} 設定儲存成功。</span>
      </div>
    </div>

  </section>

  <div class="divider mb-8">安全性設定</div>
  <section>

    <div class="mb-8">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend text-lg">更新密碼</legend>

        <label class="label">原密碼</label>
        <input v-model="ogPassword" type="password" class="input" placeholder="請輸入原密碼" />

        <label class="label">新密碼</label>
        <input v-model="newPassword" type="password" class="input" placeholder="新密碼" />

        <label class="label">確認新密碼</label>
        <input v-model="checkNewPassword" type="password" class="input mb-4" placeholder="請重新輸入新密碼" />

        <div v-if="passwordError" role="alert" class="alert alert-error alert-soft">
          <span><i class="bi bi-x me-4"></i>{{ passwordError }}</span>
        </div>

        <div v-if="isChangingPasswordSuccess" role="alert" class="alert alert-success alert-soft">
          <span><i class="bi bi-check-lg me-4"></i>更新密碼成功！</span>
        </div>

        <button @click="changePassword" class="btn btn-neutral mt-4"
          :disabled="isChangingPassword || isChangingPasswordSuccess">
          <span v-if="isChangingPassword" class="loading loading-ring"></span>
          {{ isChangingPassword ? '' : '更新密碼' }}
        </button>
      </fieldset>
    </div>

    <div class="mb-4">
      <button class="btn btn-success mb-2">
        開啟 2FA 驗證
      </button>
      <p>您尚未完成帳號雙重要素驗證（2FA），強烈建議您開啟以提升帳號安全。</p>
    </div>

    <div class="mb-4">
      <button class="btn btn-warning mb-2" @click="openModal(modalDeactivateAccount)">
        封存帳號
      </button>
      <p>您的帳號及所有內容將處於隱藏狀態，您可以隨時取消封存。</p>
    </div>

    <div class="mb-4">
      <button class="btn btn-error mb-2" @click="openModal(modalDeleteAccount)">
        刪除帳號
      </button>
      <p>悅讀 會在 30 天後完全刪除您的帳號及所有資訊，在此之前您可以隨時撤銷刪除。</p>
    </div>
  </section>

  <!-- 封存警告視窗 -->
  <dialog ref="modalDeactivateAccount" class="modal">
    <div class="modal-box bg-warning">
      <h3 class="text-lg font-bold text-center">封存帳號</h3>
      <p class="py-4 text-center">
        您確定要封存此帳號嗎？ <br>
        其他人將無法檢閱您的帳號及內容。
      </p>
      <button @click="openModal(modalCheckEmail, '封存')"
        class="btn bg-amber-600 border-amber-700 w-full mb-4">確定封存帳號</button>
      <form method="dialog" class="flex flex-col">
        <button class="btn btn-outline">取消</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <!-- 刪除警告視窗 -->
  <dialog ref="modalDeleteAccount" class="modal">
    <div class="modal-box bg-error text-white">
      <h3 class="text-lg font-bold text-center">刪除帳號</h3>
      <p class="py-4 text-center">
        您確定要刪除此帳號嗎？ <br>
        您可以在 30 天內隨時撤銷刪除。
      </p>
      <button @click="openModal(modalCheckEmail, '刪除')"
        class="btn bg-red-200 border-red-300 w-full mb-4">確定刪除帳號</button>
      <form method="dialog" class="flex flex-col">
        <button class="btn btn-outline">取消</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <!-- 確認視窗 -->
  <dialog ref="modalCheckEmail" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold text-center">確認電子郵件</h3>
      <p class="py-4 text-center">
        請前往您的電子信箱確認並開始進行{{ accountAction }}程序。
      </p>
      <form method="dialog" class="flex flex-col">
        <button class="btn">確定</button>
      </form>
    </div>
  </dialog>

</template>


<script setup>
  import { ref, useTemplateRef, watch } from 'vue';

  const toastArr = ref([])

  const showBirthday = ref(true)
  const showAge = ref(false)
  const showEmail = ref(true)
  const acceptCookie = ref(false)

  const saveChange = (setting) => {
    toastArr.value.push(setting)

    if (toastArr.value.length > 11) {
      toastArr.value.shift()
    }
    setTimeout(() => {
      toastArr.value.shift()
    }, 3000);
  }

  watch(showBirthday, () => {
    if (showAge.value) {
      showAge.value = false
    } else if (!showAge.value && !showBirthday.value) {
      showAge.value = true
    }
  })

  const ogPassword = ref('')
  const newPassword = ref('')
  const checkNewPassword = ref('')
  const passwordError = ref('')
  const isChangingPassword = ref(false)
  const isChangingPasswordSuccess = ref(false)
  
  const changePassword = () => {

    passwordError.value = ''

    if (!ogPassword.value || !newPassword.value || !checkNewPassword.value) {
      passwordError.value = '請確實填寫所有欄位。'
      return
    }

    if (newPassword.value.length < 6) {
      passwordError.value = '密碼必須大於 6 個字元。'
      return
    }

    if (newPassword.value === ogPassword.value) {
      passwordError.value = '新密碼不得與原密碼相同。'
      return
    }

    if (newPassword.value !== checkNewPassword.value) {
      passwordError.value = '確認新密碼填寫錯誤。'
      return
    }

    isChangingPassword.value = true

    setTimeout(() => {
      isChangingPasswordSuccess.value = true
      isChangingPassword.value = false
    }, 1000)
  }

  const modalDeactivateAccount = useTemplateRef('modalDeactivateAccount')
  const modalDeleteAccount = useTemplateRef('modalDeleteAccount')
  const modalCheckEmail = useTemplateRef('modalCheckEmail')
  const modals = [
    modalDeactivateAccount,
    modalDeleteAccount,
    modalCheckEmail
  ]

  const accountAction = ref('')
  const openModal = (el, action) => {
    modals.forEach(modal => modal.value.close())
    accountAction.value = action
    el.showModal()
  }

</script>

<style scoped></style>