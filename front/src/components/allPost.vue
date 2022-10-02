<template>
   <div class="container1">
      <div class="single-post" v-for="post in posts" :key="post.id">
         <div class="post-head">
            <div class="post-owner">
               <div class="user-image">
                  <img :src="post.user.image_url" />
               </div>
               <div>
                  <p>{{ post.user.first_name }} {{ post.user.last_name }}</p>
                  <p class="post-date">Posted: {{ post.date }}</p>
               </div>
            </div>
            <div class="dropdown" v-if="post.user.user_id === this.theID">
               <button class="dropbtn">
                  <img src="../assets/dropdown.png" class="nav-icon" />
               </button>
               <div class="dropdown-content">
                  <a @click="editPost(post.post_id)">Edit</a>
                  <a
                     href="#"
                     @click="deletePost(post.post_id, post.user.user_id)"
                     >Delete</a
                  >
               </div>
            </div>
         </div>
         <div class="post-text">
            <p>
               {{ post.text }}
            </p>
            <p id="postId">
               {{ post.createdAt }}
            </p>
         </div>
         <div class="post-image">
            <img :src="post.image_url" v-if="!post.image_url == ''" />
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
export default {
   name: "allPost",
   data() {
      return {
         posts: [],
         theID: "",
      };
   },
   methods: {
      editPost(pId) {
         this.$router.push({ path: `/editpost/${pId}` });
      },
      deletePost(pId, uId) {
         let user = localStorage.getItem("userInfo");
         let parsed = JSON.parse(user);
         let userId = parsed.userId;
         let token = parsed.token;

         if (uId === userId) {
            axios
               .delete(`http://localhost:3000/api/post/` + pId, {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               })
               .then((res) => {
                  if (res.status == 200) {
                     // console.log("This is res", res);
                     alert("Post Deleted SuccessFully");
                     window.location.reload();
                  }
               })
               .catch((error) => console.log(error));
         } else {
            console.log("Not muched");
         }
      },
   },
   async mounted() {
      let user = localStorage.getItem("userInfo");
      let parsed = JSON.parse(user);
      let id = parsed.userId;
      this.theID = id;
      let token = parsed.token;
      if (!user) {
         this.$router.push("/signup");
      } else {
         this.$route.params.id;
      }
      await axios
         .get(`http://localhost:3000/api/post`, {
            headers: { Authorization: "Bearer " + token },
         })
         .then((res) => {
            this.posts = res.data.reverse();
         })
         .catch((error) => {
            console.log(error);
         });
   },
};
</script>
