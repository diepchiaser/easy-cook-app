<script lang="ts" setup>
const router = useIonRouter()
const app = useAppStore()
const locales = useLocales()
const locale = useI18nLocale()

function handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    if (event.target) {
      (event.target as HTMLIonRefresherElement).complete()
    }
  }, 2000)
}

function backUser() {
  router.push('/user')
}

watch(locale, (newLocale: any) => {
  locale.value = newLocale
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title=""
          left-text="User"
          left-arrow
          @click-left="backUser"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <template #fixed>
        <ion-refresher :pull-factor="0.5" :pull-min="100" :pull-max="200" @ion-refresh="handleRefresh($event)">
          <ion-refresher-content />
        </ion-refresher>
      </template>
      <van-cell center :title="$t('Language')">
        <template #right-icon>
          <van-dropdown-menu>
            <van-dropdown-item v-model="locale" :options="locales" />
          </van-dropdown-menu>
        </template>
      </van-cell>
      <van-cell center :title="$t('离开网页后保留选中数据')">
        <template #right-icon>
          <van-switch v-model="app.settings.keepLocalData" />
        </template>
      </van-cell>
      <van-cell center :title="$t('更多设置')" />
    </ion-content>
  </ion-page>
</template>
