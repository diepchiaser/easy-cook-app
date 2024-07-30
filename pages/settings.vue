<script lang="ts" setup>
const router = useIonRouter();
const app = useAppStore()
const locales = useLocales()
const locale = useI18nLocale()
const time = ref(useLocaleDate(new Date()))

console.log(locale.value)
console.log(locales)

const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      if (event.target) {
        (event.target as HTMLIonRefresherElement).complete();
      }
    }, 2000);
}

const backUser = () => {
  router.push('/user');
}

watch(locale, (newLocale: any) => {
  locale.value = newLocale;
  // change the locale, is date change too?
  time.value = useLocaleDate(new Date(), newLocale).value;
});

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          :title="time"
          left-text="Random"
          left-arrow
          @click-left="backUser"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
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
      <van-cell center :title="$t('更多设置')">
      </van-cell>
    </ion-content>
  </ion-page>
</template>
