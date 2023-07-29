import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "views/login/index.jsx";
import Home from "views/home/index.jsx";
import Profile from "views/profile/index.jsx";
import Protected from "router/Protector";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={ <Protected><Home /></Protected> } />
      <Route
        path="/profile/:userid"
        element={ <Protected><Profile /></Protected> }
      />
    </>
  ),
  {
    // setting the base/start url
    baseURL: "/",
    future: { v7_normalizeFormMethod: true },
  }
);

export default router;
