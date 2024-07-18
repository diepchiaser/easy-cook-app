<script lang="ts" setup>
import Default from '~/layouts/default.vue';
definePageMeta({
  alias: ['/'],
});
const color = useColorMode()
const rStore = useRecipeStore();
const router = useIonRouter();
const nextRandom = () => {
  router.push('/random');
}
const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      if (event.target) {
        (event.target as HTMLIonRefresherElement).complete();
      }
    }, 2000);
}
const html = document.documentElement.classList;
watch(() => color.preference, (newVal) => {
    if (newVal === 'dark') {
      html.add('van-theme-dark');
    } else {
      html.remove('van-theme-dark');
    }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title="Home"
          right-text="Random"
          @click-right="nextRandom"
        />

      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <Default>
        <div text-4xl mt-10>
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
