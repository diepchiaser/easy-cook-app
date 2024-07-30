import { createI18n } from 'vue-i18n'
import en from '../locales/en.js'
import vi from '../locales/vi.js'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locales: [
        { code: 'en', file: 'en.js', iso: 'en-US' },
        { code: 'vi', file: 'vi.js', iso: 'vi-VN' },
    ],
    locale: 'vi',
    messages: {
        en,
        vi,
    }
  })

  vueApp.use(i18n)
})
