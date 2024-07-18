<script lang="ts" setup>
import { links } from '~/constants'
const router = useIonRouter();
const backHelp = () => {
  router.push('/help');
}
const nextHome = () => {
  router.push('/');
}
const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      if (event.target) {
        (event.target as HTMLIonRefresherElement).complete();
      }
    }, 2000);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          title="My"
          left-text="FAQ"
          :right-text="$t('首页')"
          left-arrow
          @click-left="backHelp"
          @click-right="nextHome"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div>
        <div
          class="mx-auto max-w-md w-full"
          px-2
          text-left
        >
          <div mt-2 gap="3" grid="~ cols-3">
            <YlfIconItem to="/recipes/history" icon="i-ri-history-line" :label="$t('历史记录')" />
            <YlfIconItem to="/recipes/collect" icon="i-ri-star-line" :label="$t('我的收藏')" />
            <YlfIconItem to="/cookbooks" icon="i-ri-article-line" :label="$t('自定义菜谱')" />
          </div>

          <YlfForm>
            <YlfFormItem icon="i-ri-feedback-line" :label="$t('立即反馈')" :to="links.feedback" target="_blank" />
            <YlfFormItem icon="i-ri-mail-send-line" :label="$t('立即投稿')" :to="links.contribute" target="_blank" />
          </YlfForm>

          <YlfForm>
            <YlfFormItem icon="i-ri-settings-line" :label="$t('设置')" to="/settings" />
          </YlfForm>

          <YlfForm>
            <YlfFormItem icon="i-ri-question-line" :label="$t('帮助')" to="/help" />
            <YlfFormItem icon="i-ri-information-line" :label="$t('关于')" to="/help" />
          </YlfForm>
        </div>
        <BaseFooter mt-4 />
       </div>
    </ion-content>
  </ion-page>
</template>
