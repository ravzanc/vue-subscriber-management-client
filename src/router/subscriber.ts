export default [
  {
    name: "SubscriberList",
    path: "/subscribers/",
    component: () => import("@/views/subscriber/ViewList.vue"),
  },
  {
    name: "SubscriberCreate",
    path: "/subscribers/create",
    component: () => import("@/views/subscriber/ViewCreate.vue"),
  },
  {
    name: "SubscriberUpdate",
    path: "/subscribers/edit/:id",
    component: () => import("@/views/subscriber/ViewUpdate.vue"),
  },
  {
    name: "SubscriberShow",
    path: "/subscribers/show/:id",
    component: () => import("@/views/subscriber/ViewShow.vue"),
  },
];
