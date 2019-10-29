import { hot } from "react-hot-loader/root";
import * as React from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
import { useDispatch } from "react-redux";

import { useTypedSelector, doInit, doPlay, Choice } from "../model";

import { ChoicesPanel } from "./ChociesPanel";
import { GameResultsPanel } from "./GameResultsPanel";

const Header1 = styled.div`
	font-size: 20px;
	margin-bottom: 20px;
`;

export const App = hot(function App() {
	const { init, choices, play } = useTypedSelector(a => ({
		init: a.actions.init,
		play: a.actions.play,
		choices: a.choices,
	}));

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(doInit());
	}, []);

	if (!init.isCalled || init.inProgress) {
		return <div>Loading...</div>;
	}

	if (init.error) {
		return (
			<div
				className={css`
					color: red;
				`}>
				could not init app: {init.error}
			</div>
		);
	}

	const error = [play.error, init.error].filter(Boolean).join(", ");
	const isPlaying = play.inProgress;

	return (
		<div
			className={css`
				max-width: 600px;
				margin: auto;
			`}>
			<Header1>Rock Paper Scissors Lizard Spock</Header1>
			{!error.length ? null : (
				<div
					className={css`
						color: red;
					`}>
					Error: {error}
				</div>
			)}
			<ChoicesPanel
				isDisabled={isPlaying}
				choices={choices}
				onChoiceClicked={onChoiceClicked}
				highlightChoiceId={play.request && play.request.choice}
				className={css`
					margin-bottom: 20px;
				`}
			/>
			<GameResultsPanel play={play} />
		</div>
	);

	function onChoiceClicked(choice: Choice) {
		dispatch(doPlay(choice.id));
	}
});
