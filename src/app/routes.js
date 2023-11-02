import { lazy } from "react";

const Routes = [
  // DEFAULT PAGES
  {
    path: "/:pageSection",
    component: lazy(() => import("pages/Home")),
    name: "Home",
  },
  // {
  //   path: "/edit2/:language/:pageSection/:id",
  //   component: lazy(() => import("pages/Edit")),
  //   name: "Edit",
  // },
  {
    path: "/edit/:language/:pageSection/:id",
    component: lazy(() => import("pages/EditCard")),
    name: "EditCard",
  },
  /*
   ---------------------------------------------
    YOUR URL PAGES
   ---------------------------------------------
  */
  {
    path: "/example",
    component: lazy(() => import("pages/Example")),
    name: "Example",
  },
  /*
    ---------------------------------------------
    PLEASE KEEP PUT IT AT THE BOTTOM
    ---------------------------------------------
  */
  {
    path: "*",
    component: lazy(() => import("pages/404")),
    name: "Page not found",
  },
];

export default Routes;
