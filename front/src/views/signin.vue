<template>
   <div class="form-container">
      <h2>Log In</h2>
      <div class="form">
         <form>
            <p v-if="this.error.notPassed" class="error">
               Invalid Email or Password
            </p>

            <p v-if="this.error.email" class="error">Email Invalid</p>
            <label v-else for="email">Email</label>
            <input
               v-model="this.email"
               type="email"
               id="email"
               placeholder="example@example.com"
            />
            <p v-if="this.error.password" class="error">Password Invalid</p>
            <label v-else for="password">Password</label>
            <input
               v-model="this.password"
               type="password"
               id="password"
               placeholder="Enter your password"
            />
         </form>
         <div class="login-button">
            <button @click="signin" class="button">SignIn</button>
            <p>
               Not registered?
               <a href="./signup"> Sign Up</a>
            </p>
         </div>
      </div>
   </div>
</template>
<style scoped></style>
<script>
import axios from "axios";
//Creating regular expression
const emailRegex = /[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$/;
export default {
   name: "signin",
   data() {
      return {
         email: "",
         password: "",
         error: {
            email: null,
            password: null,
            notPassed: null,
         },
      };
   },
   methods: {
      async signin() {
         if (this.email == "" || emailRegex.test(this.email) == false) {
            this.error.email = "Email Invalid";
            return;
         }
         if (this.password == "" || this.password.length < 8) {
            this.error.password = "Password Invalid";
            return;
         }
         var getUser = {
            email: this.email,
            password: this.password,
         };
         let result = await axios
            .post(`http://localhost:3000/api/auth/signin`, getUser)
            .then((result) => {
               if (result.status == 200) {
                  console.log(result);
                  localStorage.setItem("userInfo", JSON.stringify(result.data));
                  this.$router.push("/");
               }
            })
            .catch((error) => {
               if (error) {
                  this.error.notPassed = "Invalid Email or Password";
                  console.log(error);
               }
            });
      },
   },
   mounted() {
      if (localStorage.length > 0) {
         this.$router.push("/");
      }
   },
};
</script>
