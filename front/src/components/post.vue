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
import mainNav from "../components/nav.vue";
import axios from "axios";
export default {
   name: "post",
   components: {
      mainNav,
   },
   data() {
      return {
         postText: "",
         image_url: "",
      };
   },
   methods: {
      getFile(event) {
         this.image_url = event.target.files[0];
      },
      async createPost() {
         // const addPostButton = document.querySelector(".button")
         if (this.postText.length == 0 && this.image_url.length == 0) {
            return;
         }

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

         await axios
            .post(`http://localhost:3000/api/post`, theImage, {
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
   mounted() {
      // if (this.postText.length < 1 && this.image_url.length < 1) {
      //    document.querySelector(".button").disabled = true;
      //    console.log(this.postText, this.image_url);
      //    console.log(this.postText.length, this.image_url.length);
      // }
   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
