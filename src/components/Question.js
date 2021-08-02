import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
	const [timeRemaining, setTimeRemaining] = useState(10);

	// add useEffect code

	function handleAnswer(isCorrect) {
		setTimeRemaining(10);
		onAnswered(isCorrect);
	}

	const { id, prompt, answers, correctIndex } = question;

	useEffect(() => {
		if (!timeRemaining) {
			onAnswered(false);
			setTimeRemaining(10);
			return;
		}
		const timerId = setTimeout(
			() => setTimeRemaining((prevTime) => prevTime - 1),
			1000
		);
		return function () {
			clearTimeout(timerId);
		};
	}, [timeRemaining, onAnswered]);
	return (
		<>
			<h1>Question {id}</h1>
			<h3>{prompt}</h3>
			{answers.map((answer, index) => {
				const isCorrect = index === correctIndex;
				return (
					<button key={answer} onClick={() => handleAnswer(isCorrect)}>
						{answer}
					</button>
				);
			})}
			<h5>{timeRemaining} seconds remaining</h5>
		</>
	);
}

export default Question;
