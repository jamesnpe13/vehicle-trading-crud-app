import { Routes, Route } from "react-router-dom";

// pages
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import EditList from "./pages/EditList";
import CreateList from "./pages/CreateList";
import Search from "./pages/Search";
// import Details from "./pages/Details";
import Purchase from "./pages/Purchase";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import MyListing from "./pages/MyListing";
import Signin from "./pages/Signin";

export default function PageRouter({ postsData, fetchAllPosts }) {
   return (
      <Routes>
         <Route path="/" element={<Signin  />} />
         <Route path="/listings" element={<Home  />} />
         <Route path="/listings/:id" element={<Home  />} />
         <Route path="/myListings" element={<MyListing  />} />
         <Route path="/listings/:id/purchase" element={<Purchase  />} />
         <Route path="/mylistings/:id/edit" element={<EditList   />} />
         <Route path="/listings/create" element={<CreateList />} />
         <Route path="/search" element={<Search />} />
         <Route path="*" element={<Notfound />} />
      </Routes>
   );
}
