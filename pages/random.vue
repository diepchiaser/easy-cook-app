<script setup lang="ts">
const router = useIonRouter()
function nextHelp() {
  router.push('/help')
}
function handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    if (event.target) {
      (event.target as HTMLIonRefresherElement).complete()
    }
  }, 2000)
}
const goBack = () => router.push('/')
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          :title="$t('Random')"
          left-arrow
          @click-left="goBack"
          @click-right="nextHelp"
        >
          <template #left>
            <van-icon name="wap-home-o" dot size="30" />
          </template>

          <template #right>
            <van-icon name="question-o" size="30" />
          </template>
      
        </van-nav-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <template #fixed>
        <ion-refresher :pull-factor="0.5" :pull-min="100" :pull-max="200" @ion-refresh="handleRefresh($event)">
          <ion-refresher-content />
        </ion-refresher>
      </template>
      <div flex flex-col>
        <div flex flex-grow flex-col items-center justify-center>
          <RandomRecipe />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
