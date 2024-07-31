<script lang="ts" setup>
const $t = useTranslation()
definePageMeta({
  layout: 'child',
  title: 'Custom recipes',
})
</script>

<template>
  <div>
    <h3>
      {{ $t('敬请期待') }}
    </h3>

    <div grid="~ cols-3" gap="4" p="4">
      <CookbookCard :cookbook="defaultCookbook">
        {{ $t('默认菜谱') }}
      </CookbookCard>

      <NewCookbookCard />
    </div>
  </div>
</template>
