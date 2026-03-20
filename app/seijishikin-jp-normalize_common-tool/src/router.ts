import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // トップ
    { path: "/", name: "ComponentCatalog",  component: () => import("./components/main/ComponentCatalog.vue")  },
    { path: "/base-component", name: "BaseComponent",  component: () => import("./components/main/BaseComponent.vue")  },
   { path: "/net-access", name: "NetAccessCatalog",  component: () => import("./components/main/NetAccessCatalog.vue")  },
];

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
});

export default router;