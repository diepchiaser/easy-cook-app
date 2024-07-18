<script setup lang="ts">
  const router = useIonRouter();
  const nextHelp = () => {
    router.push('/help');
  }
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      if (event.target) {
        (event.target as HTMLIonRefresherElement).complete();
      }
    }, 2000);
  }
  const goBack = () => router.push('/')
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title="Random"
          left-text="Home"
          right-text="FAQ"
          left-arrow
          @click-left="goBack"
          @click-right="nextHelp"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div flex flex-col>
        <div flex flex-grow flex-col items-center justify-center>
          <RandomRecipe />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
