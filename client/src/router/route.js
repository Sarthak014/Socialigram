import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      component: () => import("../views/login/index"),
    },
    {
      path: "/home",
      component: () => import("../views/home/index"),
    },
    {
      path: "/profile/:id",
      component: () => import("../views/profile/index"),
    },
  ],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  }
);

export default router;
