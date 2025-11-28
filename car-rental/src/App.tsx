// Rerouting pages through this 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListingPage from "./pages/ListingPage";
import CarDetailPage from "./pages/CarDetailPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import RentalHistory from "./pages/RentalHistory";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/listing", element: <ListingPage /> },
  { path: "/car/:id", element: <CarDetailPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/history", element: <RentalHistory /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
