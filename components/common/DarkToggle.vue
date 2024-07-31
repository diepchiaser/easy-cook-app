<script setup lang="ts">
import type { ToggleCustomEvent } from '@ionic/vue'

const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

const paletteToggle = ref(false)

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// Add or remove the "ion-palette-dark" class on the html element
function toggleDarkPalette(shouldAdd: boolean) {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd)
}

// Check/uncheck the toggle and update the palette based on isDark
function initializeDarkPalette(isDark: boolean) {
  paletteToggle.value = isDark
  toggleDarkPalette(isDark)
}

// Initialize the dark palette based on the initial
// value of the prefers-color-scheme media query
initializeDarkPalette(prefersDark.matches)

// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', mediaQuery => initializeDarkPalette(mediaQuery.matches))

// Listen for the toggle check/uncheck to toggle the dark palette
function toggleChange(ev: ToggleCustomEvent) {
  toggleDarkPalette(ev.detail.checked)
  const html = document.documentElement.classList
  if (html.contains('ion-palette-dark')) {
    color.preference = 'dark'
  }
  else {
    color.preference = 'light'
  }
}
</script>

<template>
  <YlfIconButton
    class="icon-btn hover:text-yellow-400 !outline-none"
    text-xl
    title="切换" @click="toggleChange($event)"
  >
    <div :i="color.preference === 'dark' ? 'dark:ri-moon-line' : 'ri-sun-line'" />
  </YlfIconButton>
</template>
