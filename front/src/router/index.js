import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import signup from "../views/signup.vue";
import signin from "../views/signin.vue";
import profile from "../views/profile.vue";
import post from "../components/post.vue";
import EditPost from "../components/EditPost.vue";
import allPost from "../components/allPost.vue";
import PageNotFound from "../components/PageNotFound.vue";

const routes = [
   {
      path: "/",
      name: "home",
      component: home,
   },
   {
      path: "/signup",
      name: "signup",
      component: signup,
   },
   {
      path: "/signin",
      name: "signin",
      component: signin,
   },
   {
      path: "/profile",
      name: "profile",
      component: profile,
   },
   {
      path: "/post",
      name: "post",
      component: post,
   },
   {
      path: "/editpost/:id",
      name: "editpost",
      component: EditPost,
   },
   {
      path: "/allPost",
      name: "allPost",
      component: allPost,
   },
   {
      path: "/:pathMatch(.*)*",
      name: "pageNotFound",
      component: PageNotFound,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
