<template>
   <div class="container">
      <mainNav />
      <div class="user-detail">
         <div class="userInformation">
            <div>
               <div class="user-profile-image">
                  <img :src="this.profileImage" width="100" />
               </div>
               <div>
                  <label class="file" v-if="this.profilePic.name == null">
                     <input
                        class="file-button"
                        type="file"
                        @change="getFile"
                        name="theImage"
                     />
                     <img src="../assets/upload.png" class="profile-icon" />
                     Select Photo
                  </label>
                  <div>
                     {{ this.profilePic.name }}
                  </div>
                  <button
                     class="btn-small"
                     @click="addPhoto"
                     v-if="this.profilePic.name != null"
                  >
                     Add Photo
                  </button>
               </div>
            </div>
            <div class="dropdown">
               <button class="dropbtn">
                  <img src="../assets/dropdown.png" class="nav-icon" />
               </button>
               <div class="dropdown-content">
                  <a href="#" @click="showPassInputs">Update Password</a>
                  <a href="#" @click="deleteUser">Delete Account</a>
               </div>
            </div>
         </div>

         <p>
            <span class="user-lable">First Name: </span>
            <span class="user-data">{{ this.firstName }}</span>
         </p>
         <p>
            <span class="user-lable">Last Name: </span
            ><span class="user-data">{{ this.lastName }}</span>
         </p>
         <p>
            <span class="user-lable">Email: </span
            ><span class="user-data">{{ this.email }}</span>
         </p>
         <div class="changePassword" v-show="changePassword">
            <p v-if="this.error.passNotMuched" class="error">
               Password Not Matched
            </p>
            <label for="oldPass">Old Password</label>
            <input type="password" id="oldPass" v-model="this.oldPass" />
            <label for="newPass">New Password</label>
            <input type="password" id="newPass" v-model="this.newPass" />
            <button class="btn-small" @click="changePass">Submit</button>
         </div>
      </div>
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
            <div class="dropdown">
               <button class="dropbtn">
                  <img src="../assets/dropdown.png" class="nav-icon" />
               </button>
               <div class="dropdown-content">
                  <a href="#" @click="editPost(post.post_id)">Edit</a>
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
         </div>
         <div class="post-image">
            <img :src="post.image_url" v-if="!post.image_url == ''" />
         </div>
      </div>
   </div>
</template>
<script>
import mainNav from "../components/nav.vue";
import axios from "axios";

export default {
   name: "profile",
   components: {
      mainNav,
   },
   data() {
      return {
         userId: "",
         firstName: "",
         lastName: "",
         email: "",
         userId: "",
         profilePic: "",
         profileImage: "",
         oldPass: "",
         newPass: "",
         changePassword: false,
         error: {
            passNotMuched: null,
         },
         storage: {
            userId: "",
            token: "",
         },
         posts: [],
      };
   },
   methods: {
      getFile(event) {
         this.profilePic = event.target.files[0];
         console.log("this is profile pic file", this.profilePic);
      },
      showPassInputs() {
         this.changePassword = !this.changePassword;
      },
      async changePass() {
         let thePass = {
            oldPass: this.oldPass,
            newPass: this.newPass,
         };

         await axios
            .put(
               `http://localhost:3000/api/auth/user/cp/` + this.storage.userId,
               thePass,
               {
                  headers: { Authorization: "Bearer " + this.storage.token },
               }
            )
            .then((result) => {
               if (result.status == 200) {
                  alert("Password Changed Successfully");
                  this.$router.go(this.$router.currentRoute);
               }
            })
            .catch((error) => {
               if (error) {
                  this.error.passNotMuched = "Password Not Matched";
               }
            });
      },
      async addPhoto() {
         let theImage = new FormData();

         theImage.append("theImage", this.profilePic);
         theImage.append("userUserId", this.storage.userId);

         await axios
            .put(
               `http://localhost:3000/api/auth/user/` + this.storage.userId,
               theImage,
               {
                  headers: { Authorization: "Bearer " + this.storage.token },
               }
            )
            .then((res) => {
               if (res.status == 200) {
                  this.$router.go(this.$router.currentRoute);
               }
            })
            .catch((error) => {
               console.log(error);
            });
      },

      async deleteUser() {
         await axios
            .delete(
               `http://localhost:3000/api/auth/user/` + this.storage.userId,
               {
                  headers: { Authorization: "Bearer " + this.storage.token },
               }
            )
            .then((res) => {
               if (res.status == 200) {
                  console.log(res);
                  localStorage.clear();
                  alert("User Deleted Successfully");
                  this.$router.push("/signup");
               }
            })
            .catch((err) => console.log(err));
      },
      editPost(pId) {
         this.$router.push({ path: `/editpost/${pId}` });
      },
      deletePost(pId, uId) {
         // const attachedId = document.getElementById("postId").textContent;

         let user = localStorage.getItem("userInfo");
         let parsed = JSON.parse(user);
         let userId = parsed.userId;
         let token = parsed.token;

         // const id = this.posts.post_id;
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
      this.storage.userId = parsed.userId;
      this.storage.token = parsed.token;

      if (!user) {
         this.$router.push("/signup");
      }

      await axios
         .get(`http://localhost:3000/api/auth/user/` + this.storage.userId, {
            headers: { Authorization: "Bearer " + this.storage.token },
         })
         .then((res) => {
            let userDate = res.data;
            this.userId = userDate.userId;
            this.firstName = userDate.firstName;
            this.lastName = userDate.lastName;
            this.email = userDate.email;
            this.profileImage = userDate.profilePic;
         })
         .catch((error) => {
            console.log(error);
         });
      await axios
         .get(`http://localhost:3000/api/post/user/` + this.storage.userId, {
            headers: { Authorization: "Bearer " + this.storage.token },
         })
         .then((res) => {
            this.posts = res.data.reverse();

            let userDate = res.data;
            console.log("This is res", res.data);
            // this.userId = userDate.userId;
            // this.firstName = userDate.firstName;
            // this.lastName = userDate.lastName;
            // this.email = userDate.email;
            // this.profileImage = userDate.profilePic;
            console.log("This is post array:", this.posts);
         })
         .catch((error) => {
            console.log(error);
         });
   },
};
</script>
