export default [
  {
    name: "FieldList",
    path: "/fields/",
    component: () => import("@/views/field/ViewList.vue"),
  },
  {
    name: "FieldCreate",
    path: "/fields/create",
    component: () => import("@/views/field/ViewCreate.vue"),
  },
  {
    name: "FieldUpdate",
    path: "/fields/edit/:id",
    component: () => import("@/views/field/ViewUpdate.vue"),
  },
  {
    name: "FieldShow",
    path: "/fields/show/:id",
    component: () => import("@/views/field/ViewShow.vue"),
  },
];
