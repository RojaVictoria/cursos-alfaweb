import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import Edit from "../views/Edit.vue";
import Store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: '/home',
    meta: {
      login: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      login: false
    }
  },{
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      login: true
    }
  },
  {
    path: "/admin/:id",
    name: "Edit",
    component: Edit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.login) {
    if(Store.state.access.currentUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
}); 

export default router;
