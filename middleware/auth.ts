export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  if (!userStore.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
}) 