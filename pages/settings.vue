<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const router = useIonRouter();
const app = useAppStore()

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

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);
// remove -US
selectedLanguage.value = selectedLanguage.value.replace(/-.*$/, '');
locale.value = locale.value.replace(/-.*$/, '');

const langs = [
  { text: 'English', value: 'en'},
  { text: 'Vietnamese', value: 'vi'},
]

watch(selectedLanguage, (newLocale: any) => {
  locale.value = newLocale;
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title=""
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
            <van-dropdown-item v-model="selectedLanguage" :options="langs" />
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
