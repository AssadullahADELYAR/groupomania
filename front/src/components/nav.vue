<template>
   <div class="top-nav">
      <li class="logo">
         <router-link to="/"><img src="../assets/icon.png" /></router-link>
      </li>

      <ul class="main-nav">
         <li>
            <a href="#"><img src="../assets/nav.png" class="nav-icon" /></a>
            <ul>
               <li><router-link to="/post">New Post</router-link></li>
               <li><router-link to="/profile">Profile</router-link></li>
               <li><a href="#" @click="logout">Logout</a></li>
            </ul>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: "Nav",
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
