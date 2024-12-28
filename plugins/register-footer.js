// // plugins/register-footer.js
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import Footer from '~/components/Footer.vue';

// export default defineNuxtPlugin((nuxtApp) => {
//   onMounted(() => {
//     const router = useRouter();
//     const route = router.currentRoute.value;

//     // 检查当前路径是否为 /predict
//     if (route.path !== '/predict') {
//       nuxtApp.vueApp.component('Footer', Footer);
//     }
//   });
//  });