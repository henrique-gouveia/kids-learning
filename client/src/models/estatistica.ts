export default class Estatistica {
    public turmas!: number;
    public alunos!: number;
    public questoes!: number;
    public questionarios!: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.turmas = data.turmas || 0;
        this.alunos = data.alunos || 0;
        this.questoes = data.questoes || 0;
        this.questionarios = data.questionarios || 0;
    }
}
