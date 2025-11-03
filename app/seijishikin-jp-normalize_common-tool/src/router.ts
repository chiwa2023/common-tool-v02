import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // トップ
    { path: "/", name: "ComponentCatalog",  component: () => import("./components/main/ComponentCatalog.vue")  },
];

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
});

export default router;