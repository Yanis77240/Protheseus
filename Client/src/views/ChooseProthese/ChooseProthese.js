import React, { useState, useEffect } from "react";
import "./ChooseProthese.css";
const ChooseProthese = () => {
	const questions1 = [
		{
			questionText: "Quel est votre budget?",
			answerOptions: ["Faible", "Elevé"],
		},
		{
			questionText: "Quel est le critère le plus important pour vous?",
			answerOptions: ["Esthétique", "Fonctionnel"],
		},
		{
			questionText: "Vous préférez une prothèse...",
			answerOptions: ["Réaliste", "Customisable"],
		},
	];

	const questions2 = [
		{
			questionText: "Quel est votre budget?",
			answerOptions: ["Faible", "Elevé"],
		},
		{
			questionText: "Quel est le critère le plus important pour vous?",
			answerOptions: ["Esthétique", "Fonctionnel"],
		},
		{
			questionText: "Qu'est-ce qui est le plus important pour vous?",
			answerOptions: [
				"Une prothèse simple d'utilisation à la prise en main rapide",

				"Une prothèse performante mais à la prise en main plus longue",
			],
		},
	];

	const questions3 = [
		{
			questionText: "Quel est votre budget?",
			answerOptions: ["Faible", "Elevé"],
		},
		{
			questionText: "Quel est le critère le plus important pour vous?",
			answerOptions: ["Esthétique", "Fonctionnel", "Les deux"],
		},
	];

	const [currentQuestions, setCurrentQuestions] = useState(questions1);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [showPreResult, setShowPreResult] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [text, setText] = useState("");

	const handleAnswerOptionClick = (answer) => {
		const nextQuestion = currentQuestion + 1;
		setAnswers((answers) => [...answers, answer]);
		if (currentQuestion === 0) {
			if (answer === "Faible") {
				setCurrentQuestion(questions1);
			} else {
				setCurrentQuestions(questions3);
			}
		}
		if (currentQuestion === 1 && answers[0] === "Faible") {
			if (answer === "Esthétique") {
				setCurrentQuestion(questions1);
			} else {
				setCurrentQuestions(questions2);
			}
		}
		if (nextQuestion < currentQuestions.length) {
			setCurrentQuestion(nextQuestion);
		} else if (nextQuestion === currentQuestions.length) {
			setCurrentQuestion(nextQuestion);
			setShowPreResult(true);
		} else {
			console.log(answers);
			if (answers[0] === "Faible") {
				if (answers[1] === "Esthétique") {
					if (answers[2] === "Réaliste") {
						setText(
							"Vous semblez intéressé par la prothèse en pvc légère et discrète qui reprennent votre couleur de peau"
						);
					} else {
						setText(
							"Vous semblez intéressé par la prothèse en pvc légère et personnalisable au niveau de la couleur"
						);
					}
				} else {
					if (
						answers[2] ===
						"Une prothèse simple d'utilisation à la prise en main rapide"
					) {
						setText(
							"Vous semblez intéressé par des prothèses fonctionnelles permettant la préhension d’objet simples"
						);
					} else {
						setText(
							"Vous semblez intéressé par des prothèses plus complexe (myoélectrique ou bionique) à prix abordable"
						);
					}
				}
			} else {
				if (answers[1] === "Esthétique") {
					setText(
						"Vous semblez intéressé par de prothèses esthétiques discrètes qui cache le membre visible à la perfection. En silicone et sur mesure"
					);
				} else if (answers[1] === "Fonctionnel") {
					setText(
						"Vous semblez intéressé par de prothèses myoélectrique et bionique à haute performance"
					);
				} else {
					setText(
						"Vous semblez intéressé par de prothèses alliant réalisme et hautes performances"
					);
				}
			}
			setShowResult(true);
			setShowPreResult(false);
		}
	};

	const result = () => {
		if (showResult === false && showPreResult === false) {
			return (
				<>
					<div className="question-section">
						<div className="question-count">
							<span>Question {currentQuestion + 1}</span>
						</div>
						<div className="question-text">
							{currentQuestions[currentQuestion].questionText}
						</div>
					</div>
					<div className="answer-section">
						{currentQuestions[currentQuestion].answerOptions.map(
							(answerOption) => (
								<button
									className="button"
									onClick={() => handleAnswerOptionClick(answerOption)}
								>
									{answerOption}
								</button>
							)
						)}
					</div>
				</>
			);
		} else if (showResult === false && showPreResult === true) {
			return (
				<div className="score-section">
					<button
						className="button"
						onClick={() => handleAnswerOptionClick("")}
					>
						Ready
					</button>
				</div>
			);
		} else {
			return (
				<div className="answer-section">
					<div className="score-section">{text}</div>
					<button className="button" onClick={seeMoreHandle}>
						See More
					</button>
				</div>
			);
		}
	};

	const seeMoreHandle = () => {
		window.location.replace("/protheses");
	};
	return (
		<div className="container">
			<div className="app">{result()}</div>
		</div>
	);
};

export default ChooseProthese;
