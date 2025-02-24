import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import allProduct from "../views/allProduct.vue";
import notFound from "../views/notFound.vue";
import menu from "../views/menu.vue";
import profile from "../views/profile.vue";
import admin from "../views/admin.vue";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'Home',
        component: home
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/register',
        name: 'Register',
        component: register
    },
    {
        path: '/all-product',
        name: 'AllProduct',
        component: allProduct
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: notFound
    },
    {
        path: '/all-menu',
        name: 'Menu',
        component: menu
    },
    {
        path: '/profile',
        name: 'Profile',
        component: profile
    },
    {
        path: '/admin',
        name: 'Admin',
        component: admin
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token'); // Assuming user info is stored in localStorage

    if (isLoggedIn && (to.name === 'Login' || to.name === 'Register')) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;