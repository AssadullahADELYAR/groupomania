<template>
   <div class="form-container">
      <h2>Sign Up</h2>

      <div class="form">
         <form>
            <p v-if="this.error.emailExsit" class="error">
               Email Already Exsit
            </p>

            <p v-if="this.error.firstName" class="error">First Name Invalid</p>
            <label v-else for="first-name">First name</label>
            <input
               v-model="this.userInfo.firstName"
               type="text"
               id="first-name"
               placeholder="Enter your first name"
            />
            <p v-if="this.error.lastName" class="error">Last Name Invalid</p>
            <label v-else for="last-name">Last name</label>
            <input
               v-model="this.userInfo.lastName"
               type="text"
               id="last-name"
               placeholder="Enter Your last name"
            />
            <p v-if="this.error.email" class="error">Email Invalid</p>
            <label v-else for="email">Email</label>
            <input
               v-model="this.userInfo.email"
               type="email"
               id="email"
               placeholder="example@example.com"
            />
            <p v-if="this.error.password" class="error">Password Invalid</p>
            <label v-else for="password">Password</label>
            <input
               type="password"
               id="password"
               placeholder="Choose a password"
               v-model="this.userInfo.password"
            />
         </form>
         <div class="signup-button">
            <button class="button" type="submit" @click="signup">
               Sign Up
            </button>
            <p>
               Already have an account
               <a href="./signin"> Log In</a>
            </p>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
//Creating regular expression
const nameRegex = /^[A-Za-z. ]{3,30}$/;
const emailRegex = /[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$/;

export default {
   name: "signup",

   data() {
      return {
         userInfo: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
         },
         error: {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            emailExsit: null,
         },
      };
   },
   methods: {
      async signup() {
         if (
            this.userInfo.firstName == "" ||
            nameRegex.test(this.userInfo.firstName) == false
         ) {
            this.error.firstName = "First Name Invalid";
            return;
         }
         if (
            this.userInfo.lastName == "" ||
            nameRegex.test(this.userInfo.firstName) == false
         ) {
            this.error.lastName = "Last Name Invalid";
            return;
         }
         if (
            this.userInfo.email == "" ||
            emailRegex.test(this.userInfo.email) == false
         ) {
            this.error.email = "Email Invalid";
            return;
         }
         if (
            this.userInfo.password == "" ||
            this.userInfo.password.length < 8
         ) {
            this.error.password = "Password Invalid";
            return;
         }
         let addUser = {
            first_name: this.userInfo.firstName,
            last_name: this.userInfo.lastName,
            email: this.userInfo.email,
            password: this.userInfo.password,
         };
         await axios
            .post("http://localhost:3000/api/auth/signup", addUser)
            .then((res) => {
               if (res.status != 201) {
                  // alert("The Email Already Exsit");
                  this.error.emailExsit = "Email Already Exsit";
                  // console.log(res);
                  return;
               }
               if (res.status == 201) {
                  axios
                     .post("http://localhost:3000/api/auth/signin", {
                        email: this.userInfo.email,
                        password: this.userInfo.password,
                     })
                     .then((userData) => {
                        if (userData.status === 200) {
                           localStorage.setItem(
                              "userInfo",
                              JSON.stringify(userData.data)
                           );
                           this.$router.push("/profile");
                        }
                     });
               } else {
                  alert(
                     "Something Went Wrong, Please Contact the Administrator"
                  );
               }
            });
      },
   },
   mounted() {
      if (localStorage.length > 0) {
         this.$router.push("/profile");
      }
   },
};
</script>
