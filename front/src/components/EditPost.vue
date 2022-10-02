<template>
   <div class="container">
      <mainNav />
      <div class="single-post">
         <div class="container">
            <div>
               <textarea
                  cols="80"
                  rows="5"
                  v-model="this.postText"
                  name="text"
               ></textarea
               ><br /><br />
            </div>
            <div>
               <div>
                  <img :src="this.url" width="200" />
               </div>
               <label class="file">
                  <input
                     class="file-button"
                     type="file"
                     @change="getFile"
                     name="theImage"
                  />
                  <img src="../assets/upload.png" class="upload-post" /> Add
                  Photo
               </label>
               <div>
                  {{ this.image_url.name }}
               </div>
            </div>
            <button class="button" @click="createPost">Post</button>
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
import mainNav from "../components/nav.vue";

export default {
   name: "EditPost",
   components: {
      mainNav,
   },
   data() {
      return {
         postText: "",
         image_url: "",
         text: "",
         url: "",
      };
   },
   methods: {
      getFile(event) {
         this.image_url = event.target.files[0];
      },
      async createPost() {
         let userInfo = localStorage.getItem("userInfo");
         userInfo = JSON.parse(userInfo);
         let userId = userInfo.userId;
         let token = userInfo.token;

         console.log("This is variable file", this.image_url);

         let theImage = new FormData();

         theImage.append("theImage", this.image_url);
         theImage.append("text", this.postText);
         theImage.append("userUserId", userId);
         // theImage.append("comments", 0);

         console.log("This is formData", theImage);
         console.log(this.image_url);
         const id = this.$route.params.id;

         await axios
            .put(`http://localhost:3000/api/post/editpost/` + id, theImage, {
               headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
               console.log("This is respose: ", res);
            })
            .catch((error) => {
               console.log(error);
            });

         this.$router.push("/");
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
      console.log(this.$route.params.id);
      const postID = this.$route.params.id;
      await axios
         .get(`http://localhost:3000/api/post/${postID}`, {
            headers: { Authorization: "Bearer " + token },
         })
         .then((res) => {
            console.log("This is res", res);
            // this.posts = res.data.reverse();
            // console.log(res.);
            console.log("This is res.data =>", res.data);
            this.postText = res.data.text;
            this.url = res.data.image_url;
         })
         .catch((error) => {
            console.log(error);
         });
   },
};
</script>
