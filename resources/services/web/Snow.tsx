import { c } from "@vigilio/sweet";
import { useEffect } from "preact/hooks";
import enviroments from "~/config";

function Snow() {
	useEffect(() => {
		const body = document.body;
		const quantitySnow = window.matchMedia("(max-width: 600px)").matches
			? 10
			: 20;
		const widthSnowQuery = window.matchMedia("(max-width: 600px)").matches
			? 20
			: 30;
		for (let i = 0; i < quantitySnow; i++) {
			const leftNow = Math.floor(Math.random() * body.clientWidth);
			const topNow = Math.floor(Math.random() * body.clientWidth);
			const widthNow = Math.floor(Math.random() * widthSnowQuery);
			const timeSNow = Math.floor(Math.random() * 50 + 5);
			const div = c("div", {
				style: {
					left: `${leftNow}px`,
					top: `${topNow}px`,
					width: `${widthNow}px`,
					height: `${widthNow}px`,
					animationDuration: `${timeSNow}s`,
				} as CSSStyleDeclaration,
				className: "snow",
			});
			body.prepend(div);
		}
	}, []);
	return (
		<style jsx>
			{`
                .snow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50px;
                    height: 50px;
                    background-image: url(${enviroments.PUBLIC_URL}/images/settings/christmas-snow.webp);
                    background-size: cover;
                    animation: animationSnow 4s ease-in-out infinite;
                }

                @keyframes animationSnow {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }

                    50% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                        transform: translate(100px, 50vh);
                    }
                }
            `}
		</style>
	);
}

export default Snow;
