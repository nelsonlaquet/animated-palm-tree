import * as React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import { useSpring, animated } from "react-spring";
import clsx from "clsx";

import { DEFAULT_STATE } from "../model";

export interface GameResultsPanelProps {
	play: typeof DEFAULT_STATE["actions"]["play"];
}

const ChoiceCellClass = css`
	padding: 5px 10px;
	margin-right: 5px;
`;

const ChoiceMessage = styled.div`
	background: #eee;
	border-radius: 5px;
`;

export function GameResultsPanel(props: GameResultsPanelProps) {
	const { play } = props;

	let content;
	if (!play.isCalled) {
		content = "Waiting for player input...";
	} else if (play.inProgress || !play.result) {
		content = "...";
	} else {
		const { ourChoice, theirChoice, status } = play.result;
		content = (
			<>
				<ChoiceMessage className={clsx(ChoiceCellClass)}>
					{ourChoice.name}
				</ChoiceMessage>
				<div className={clsx(ChoiceCellClass)}>VS</div>
				<ChoiceMessage className={clsx(ChoiceCellClass)}>
					{theirChoice.name}
				</ChoiceMessage>
				<div className={clsx(ChoiceCellClass)}>
					{status === "win"
						? "YOU WIN!"
						: status === "lose"
						? "YOU LOST!"
						: "YOU TIED!"}
				</div>
			</>
		);
	}

	return (
		<div
			className={css`
				display: flex;
				border-top: 2px solid #eee;
				padding: 20px 0;
				overflow: hidden;
			`}>
			<InnerPanel
				{...props}
				key={play.callCount}
				className={css`
					display: flex;
				`}>
				{content}
			</InnerPanel>
		</div>
	);
}

function InnerPanel({
	children,
	className,
}: GameResultsPanelProps & { children: any; className?: string }) {
	const props = useSpring({
		transform: "translateY(0)",
		opacity: 1,
		from: { opacity: 0, transform: "translateY(-100px)" },
		config: { mass: 3, tension: 500, friction: 50 },
	});

	return (
		<animated.div style={props} className={className}>
			{children}
		</animated.div>
	);
}
