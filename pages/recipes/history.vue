<script setup>
import dayjs from 'dayjs'
import { recipeHistories } from '~/composables/store/history'

function clearAllHistory() {
  recipeHistories.value = []
}

const loading = ref(false)
const finished = ref(false)

function onLoad() {
  loading.value = true
  setTimeout(() => {
    recipeHistories.value.push({
      time: Date.now(),
      recipe: {
        name: 'Recipe',
        image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        description: 'Description',
      },
    })
    loading.value = false
    finished.value = recipeHistories.value.length >= 30
  }, 1000)
}

function beforeClose({ position }) {
  switch (position) {
    case 'left':
    case 'cell':
    case 'outside':
      return true
    case 'right':
      return new Promise((resolve) => {
        showConfirmDialog({
          title: 'Are you sure to delete?',
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Delete',
        })
          .then(() => {
            clearAllHistory()
            resolve(true)
          })
          .catch(() => resolve(false))
      })
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          :title="$t('历史记录')"
          left-text="Back"
          left-arrow
          @click-left="() => $router.back()"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <van-col span="24">
        <van-divider content-position="left">
          {{ $t('历史记录') }}
        </van-divider>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="Finished"
          @load="onLoad"
        >
          <van-cell v-for="history in recipeHistories" :key="history.recipe.name" style="background: unset;">
            <van-swipe-cell :before-close="beforeClose" style="text-align: left;">
              <StapleTag :active="false">
                {{ dayjs(history.time).format('YYYY-MM-DD HH:mm:ss') }}
              </StapleTag>
              <DishTag :dish="history.recipe" />
              <template #right>
                <van-button square text="Delete All" type="danger" class="delete-button" />
              </template>
            </van-swipe-cell>
            <van-back-top />
          </van-cell>
        </van-list>
      </van-col>
    </ion-content>
  </ion-page>
</template>
