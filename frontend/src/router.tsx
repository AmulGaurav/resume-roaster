import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoastPage from "./pages/RoastPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/roast",
    element: <RoastPage />,
  },
]);

export default router;
