<script lang="ts" setup>
import Default from '~/layouts/default.vue'

definePageMeta({
  alias: ['/'],
})
const color = useColorMode()
const rStore = useRecipeStore()
const router = useIonRouter()
const $t = useTranslation()
const isShowDate = ref(false)
const { time } = useUpdateTime()

function nextRandom() {
  router.push('/random')
}

function handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    if (event.target) {
      (event.target as HTMLIonRefresherElement).complete()
    }
  }, 2000)
}

const html = document.documentElement.classList
watch(() => color.preference, (newVal) => {
  if (newVal === 'dark') {
    html.add('van-theme-dark')
  }
  else {
    html.remove('van-theme-dark')
  }
})

function showDate() {
  isShowDate.value = !isShowDate.value
}

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title="Cook"
          @click-right="nextRandom"
          @click-left="showDate"
        >
          <template #left>
            <van-icon name="underway" size="30" />
            <span v-if="isShowDate" class="date" ml-2>{{ time }}</span>
          </template>

          <template #right>
            <van-icon name="arrow-double-right" size="30" />
          </template>
        </van-nav-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <template #fixed>
        <ion-refresher :pull-factor="0.5" :pull-min="100" :pull-max="200" @ion-refresh="handleRefresh($event)">
          <ion-refresher-content />
        </ion-refresher>
      </template>
      <Default>
        <div mt-10 text-4xl>
          <button
            class="cursor-pointer transition active:text-green-800 hover:(text-green-600)"
            :title="$t('重置')"
            @click="rStore.reset"
          >
            <div v-if="rStore.selectedStuff.length" i-mdi-pot-steam-outline />
            <div v-else i-mdi-pot-mix-outline />
          </button>
        </div>
        <p text="sm" m="b-4">
          {{ $t('cookToday') }}
        </p>

        <ChooseFood />
      </Default>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
