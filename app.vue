<script setup lang="ts">
import { installPrompt } from './utils/pwa'
import { appName } from '~/constants'
import { useIndexedDB } from '~/composables/db'
import { loadingController } from '@ionic/vue';

// https://nuxt.com/docs/api/composables/use-head
useHead({
  title: appName,
  meta: [
    {
      name: 'description',
      content: '好的，今天我们来做菜！',
    },
  ],
})

const indexedDB = useIndexedDB()

onMounted(() => {
  installPrompt()
  showLoading()
  indexedDB.init()
})

const showLoading = async () => {
  const loading = await loadingController.create({
    duration: 3000,
    spinner: null,
    cssClass: 'custom-loading',
    message: 'Loading...',
  });
  await loading.present();

  const loadingElement = document.querySelector('.custom-loading .loading-wrapper');
  if (loadingElement) {
    loadingElement.innerHTML = '<img src="/img/loading_cook.gif" alt="Loading...">';
  }
}
</script>

<template>
  <VitePwaManifest />
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>
.custom-loading {
  /* Tùy chỉnh style cho loading indicator */
  .loading-wrapper {
    background: transparent;
    box-shadow: none;
  }

  img {
    width: 100px; /* Đặt kích thước ảnh */
    height: auto;
  }
}

</style>