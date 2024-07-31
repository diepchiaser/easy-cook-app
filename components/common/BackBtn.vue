<script lang="ts" setup>
const router = useIonRouter()
const goBack = () => router.push('/')
</script>

<template>
  <YlfIconButton
    icon="i-ri-arrow-left-s-line"
    @click="goBack"
  />
</template>
