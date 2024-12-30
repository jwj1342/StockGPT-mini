// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  ui: {
    global: true,
    icons: ['heroicons'],
    components: {
      datePicker: true,
      popover: true,
      input: true,
      formGroup: true,
      textarea: true,
      select: true,
      button: true
    }
  },
  colorMode: {
    preference: 'light'
  },
  build: {
    transpile: ['echarts', 'vue-echarts']
  }
})
