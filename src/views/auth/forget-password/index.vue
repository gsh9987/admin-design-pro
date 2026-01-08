<script setup lang="ts">
  defineOptions({ name: 'ForgetPassword' })

  const router = useRouter()
  const showInputLabel = ref(false)

  const username = ref('')
  const loading = ref(false)

  const toLogin = () => {
    router.push({ name: 'Login' })
  }
</script>

<template>
  <div class="flex w-full h-screen">
    <LoginLeftView />

    <div class="relative border-red-500 flex-1">
      <AuthTopBar />

      <div class="auth-right-wrap">
        <div class="form">
          <h3 class="title">{{ $t('forgetPassword.title') }}</h3>
          <p class="sub-title">{{ $t('forgetPassword.subTitle') }}</p>
          <div class="mt-5">
            <span class="input-label" v-if="showInputLabel">账号</span>
            <ElInput
              class="custom-height"
              :placeholder="$t('forgetPassword.placeholder')"
              v-model.trim="username"
            />

            <div class="mt-[15px]">
              <ElButton class="w-full custom-height" type="primary" :loading="loading" v-ripple>
                {{ $t('forgetPassword.submitBtnText') }}
              </ElButton>
            </div>
            <div class="mt-[15px]">
              <ElButton class="w-full custom-height" plain @click="toLogin">
                {{ $t('forgetPassword.backBtnText') }}
              </ElButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '../login/style.css';
</style>
