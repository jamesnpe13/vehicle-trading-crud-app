import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";

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

import { SignedInContext } from "./App";

export default function PageRouter({ postsData, fetchAllPosts }) {
	const [signedIn, setSignedIn] = useContext(SignedInContext);

	return (
		<Routes>
			<Route path="/" element={<Signin />} />
			<Route path="*" element={<Notfound />} />

			{signedIn && (
				<React.Fragment>
					<Route path="/listings" element={<Home />} />
					<Route path="/listings/:id" element={<Home />} />
					<Route path="/myListings" element={<MyListing />} />
					<Route path="/listings/:id/purchase" element={<Purchase />} />
					<Route path="/listings/:id/payment" element={<Payment />} />
					<Route path="/listings/:id/payment/confirmation" element={<Confirmation />} />
					<Route path="/mylistings/:id/edit" element={<EditList />} />
					<Route path="/listings/create" element={<CreateList />} />
					<Route path="/search" element={<Search />} />
				</React.Fragment>
			)}
		</Routes>
	);
}
