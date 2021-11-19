export const turmas = [
	{
		id: 1,
		nome: 'Turma A',
	},
];

export const alunos = [
	{
		id: 1,
		matricula: 123,
		turma: 'Turma A',
		nome: 'Aluno 1',
	},
]

export const questoes = [
	{
		id: 1,
		tipo: 'Textual',
		titulo: "Como se escreve o número 1?",
		respostas: [
			{
				id: 1,
				alternativa: "A",
				texto: "Eleven",
				selecionada: false,
			}, {
				id: 2,
				texto: "One",
				alternativa: "B",
				selecionada: false,
				correta: true
			}, {
				id: 3,
				texto: "Ten",
				alternativa: "C",
				selecionada: false,
			}
		]
	}, {
		id: 2,
		tipo: 'Visual',
		titulo: "Qual automóvel você vê na imagem?",
		imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCLifzLr7b-ju6NU8rr9RC-lorLjwtnPn4A&usqp=CAU",
		respostas: [
			{
				id: 10,
				texto: "Bus",
				alternativa: "A",
				selecionada: false,
				correta: true
			}, {
				id: 11,
				texto: "Motocycle",
				alternativa: "B",
				selecionada: false,
			}, {
				id: 12,
				texto: "Airplane",
				alternativa: "C",
				selecionada: false,
			}
		]
	}, {
		id: 3,
		tipo: 'Auditiva',
		titulo: "Qual alternativa possui somente frutas citadas no audio?",
		audioUrl: "@/assets/audios/fruits.mp3",
		respostas: [
			{
				id: 13,
				texto: "Meat, Pears, Grapes",
				alternativa: "A",
				selecionada: false,
			}, {
				id: 14,
				texto: "Apple, Orange, Pineapple, Lemon and Banana",
				alternativa: "B",
				selecionada: false,
				correta: true
			}, {
				id: 15,
				texto: "Apple, Orange, Milk and eggs",
				alternativa: "C",
				selecionada: false,
			}
		]
	}
];

export const questionarios = [
	{
		id: '35c6cd75-7c4b-47d1-84ba-ad7d7e2c5aed',
		turma: 'Turma 1',
		inicio: '01/11/2021',
		fim: '03/11/2021',
		link: 'http://localhost:8080/questionarios/35c6cd75-7c4b-47d1-84ba-ad7d7e2c5aed'
	},
	{
		id: 'c11d1e9c-9360-447f-9c66-c085fd0f70bf',
		turma: 'Turma 2',
		inicio: '01/11/2021',
		fim: '03/11/2021',
		link: 'http://localhost:8080/questionarios/c11d1e9c-9360-447f-9c66-c085fd0f70bf'
	},
	{
		id: '40d975dc-d3f9-4831-b47a-444b3356c4ee',
		turma: 'Turma 3',
		inicio: '01/11/2021',
		fim: '03/11/2021',
		link: 'http://localhost:8080/questionarios/40d975dc-d3f9-4831-b47a-444b3356c4ee'
	},
];