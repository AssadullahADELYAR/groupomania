<template>
   <h1>Page Not Found 404!</h1>
</template>

<script>
export default {
   name: "404",
   mounted() {
      if (localStorage.length > 0) {
         this.$router.push("/");
      }
   },
};
</script>

<style></style>
>
