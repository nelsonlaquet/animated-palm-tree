import * as React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import clsx from "clsx";

import { Choice } from "../model";

export interface ChoicesPanelProps {
	className?: string;
	choices: Choice[];
	isDisabled?: boolean;
	highlightChoiceId?: number;
	onChoiceClicked: (choice: Choice) => void;
}

const ChoiceButton = styled.button`
	margin: 0 10px;
	background: none;
	border: none;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	flex: 1 0 50px;
	background: #eee;
	padding: 10px;
	font-weight: bold;
	cursor: pointer;
	transition: box-shadow 250ms ease-out;

	&[disabled] {
		box-shadow: none;
		color: #888;
		cursor: default;
	}

	&:hover {
		background: #fff;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	}

	&:active {
		transform: translate(0, -1px);
	}
`;

export function ChoicesPanel({
	choices,
	onChoiceClicked,
	isDisabled,
	highlightChoiceId,
	className,
}: ChoicesPanelProps) {
	return (
		<div
			className={clsx(
				css`
					display: flex;
					margin: 0 -10px;
				`,
				className,
			)}>
			{choices.map(choice => (
				<ChoiceButton
					key={choice.id}
					className={
						choice.id === highlightChoiceId
							? css`
									&& {
										box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
									}
							  `
							: ""
					}
					onClick={() => onChoiceClicked(choice)}
					disabled={isDisabled}>
					{choice.name}
				</ChoiceButton>
			))}
		</div>
	);
}
