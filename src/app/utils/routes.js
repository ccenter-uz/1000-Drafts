export const routes = [
  {
    path: "/",
    name: "Dashboard",
    redirect: { name: "Home" },
    children: [
      {
        path: "/history",
        name: "History",
        component: () => import("../../pages/History/History.vue"),
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("../../pages/Home/Home.vue"),
      },
    ],
  },
];
