import "./Account.scss";

export default function Account() {
	const pageTitle = "My account";
	return (
		<div className="Account page">
			<div className="sidebar"></div>

			<div className="main">
				<div className="content-container">
					<div className="page-title">{pageTitle}</div>
					<section className="account-overview"></section>
					<section className="create-listing"></section>
					<section className="my-listings"></section>
					<section className="bookmarks"></section>
				</div>
			</div>
		</div>
	);
}
