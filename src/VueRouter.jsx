import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: "/about",
        name: "About",
        component: About,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = false; // Here, you can check actual authentication status
    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login"); // Redirect to login page if not authenticated
    } else {
        next(); // Proceed to the route
    }
});

export default router;
