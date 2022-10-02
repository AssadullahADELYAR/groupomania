<template>
   <div>
      <router-view />
   </div>
</template>

<script>
export default {
   name: "App",
   data() {
      return {};
   },
   methods: {
      logout() {
         localStorage.clear();
         this.$router.push("/signup");
      },
   },
};
</script>

<style>
@import "./assets/style.css";
</style>
