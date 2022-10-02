<template>
   <div class="container">
      <mainNav />
      <div>
         <allPost />
      </div>
   </div>
</template>

<script>
import AllPost from "@/components/allPost.vue";
import mainNav from "../components/nav.vue";

export default {
   name: "home",
   mounted() {
      if (!localStorage.length > 0) {
         this.$router.push("/signup");
      }
   },
   components: {
      AllPost,
      mainNav,
   },
};
</script>

<style scoped></style>
