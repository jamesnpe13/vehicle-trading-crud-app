import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";

// pages
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Account from "./pages/Account";
import Details from "./pages/DetailsTest";

// useContext
import { SignedInContext } from "./App";
import CreateListing from "./pages/CreateListing";

export default function PageRouter() {
	const [signedIn, setSignedIn] = useContext(SignedInContext);

	return (
		<Routes>
			<Route path="/" element={<Signin />} />
			<Route path="*" element={<Notfound />} />

			{signedIn && (
				<React.Fragment>
					<Route path="/listings" element={<Home />} />
					<Route path="/account" element={<Account />} />
					<Route path="/account/listings/create" element={<CreateListing />} />
					<Route path="/account/listings/:id/edit" element={<CreateListing editMode={true} />} />
					<Route path="/listings/:id" element={<Details />} />
				</React.Fragment>
			)}
		</Routes>
	);
}
