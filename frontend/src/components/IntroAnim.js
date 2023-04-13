import { useEffect, useState } from "react";
import logo from "../images/logo2.svg";

import "./IntroAnim.scss";

export default function IntroAnim() {
	const transitionDelay = 500;
	const [elemNum, setElemNum] = useState([0]);

	const sequenceElements = [
		() => {
			return <p>ready</p>;
		},
		() => {
			return <p>set</p>;
		},
		() => {
			return <p>go</p>;
		},
		() => {
			return <img src={logo} />;
		},
	];

	function timer() {
		setTimeout(() => {
			setElemNum(elemNum < sequenceElements.length ? setElemNum(elemNum + 1) : setElemNum(0));
			timer();
		}, transitionDelay);
	}

	useEffect(() => {
		timer();
	}, []);

	return (
		<div className="IntroAnim">
			<div className="container">{elemNum}</div>
		</div>
	);
}
