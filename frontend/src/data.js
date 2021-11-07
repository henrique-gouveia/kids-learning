export const questoes = [
	{
		id: 1,
		tipo: 'Textual',
		titulo: "Como se escreve o número 1?",
		respostas: [
			{
				id: 1,
				alternative: "A",
				text: "Eleven",
				selected: false,
			}, {
				id: 2,
				text: "One",
				alternative: "B",
				selected: false,
				isCorrect: true
			}, {
				id: 3,
				text: "Ten",
				alternative: "C",
				selected: false,
			}
		]
	}, {
		id: 2,
		tipo: 'Textual',
		titulo: "Como se diz são 9 horas?",
		respostas: [
			{
				id: 4,
				text: "It's nine o'clock",
				alternative: "A",
				selected: false,
				isCorrect: true
			}, {
				id: 5,
				text: "It's ten past nine",
				alternative: "B",
				selected: false,
			}, {
				id: 6,
				text: "It's eleven o'clock",
				alternative: "C",
				selected: false,
			}
		]
	}, {
		id: 3,
		tipo: 'Textual',
		titulo: "Como se diz mamão?",
		respostas: [
			{
				id: 7,
				text: "Strawberry",
				alternative: "A",
				selected: false,
			}, {
				id: 8,
				text: "Watermelon",
				alternative: "B",
				selected: false,
			}, {
				id: 9,
				text: "Papaya",
				alternative: "C",
				selected: false,
				isCorrect: true
			}
		]
	}, {
		id: 4,
		tipo: 'Visual',
		titulo: "Qual automóvel você vê na imagem?",
		imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCLifzLr7b-ju6NU8rr9RC-lorLjwtnPn4A&usqp=CAU",
		respostas: [
			{
				id: 10,
				text: "Bus",
				alternative: "A",
				selected: false,
				isCorrect: true
			}, {
				id: 11,
				text: "Motocycle",
				alternative: "B",
				selected: false,
			}, {
				id: 12,
				text: "Airplane",
				alternative: "C",
				selected: false,
			}
		]
	}, {
		id: 5,
		tipo: 'Auditiva',
		titulo: "Qual alternativa possui somente frutas citadas no audio?",
		audioUrl: "@/assets/audios/fruits.mp3",
		respostas: [
			{
				id: 13,
				text: "Meat, Pears, Grapes",
				alternative: "A",
				selected: false,
			}, {
				id: 14,
				text: "Apple, Orange, Pineapple, Lemon and Banana",
				alternative: "B",
				selected: false,
				isCorrect: true
			}, {
				id: 15,
				text: "Apple, Orange, Milk and eggs",
				alternative: "C",
				selected: false,
			}
		]
	}
];