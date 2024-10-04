import QuestionarioReposta from "./questionarioResposta";

export default class QuestionarioRealizado {
    public id?: number;
    public questionarioId!: string;
    public alunoId!: number;
    public data!: Date;

    public respostas: QuestionarioReposta[] = [];

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || null;
        this.questionarioId = data.questionarioId || '';
        this.alunoId = data.alunoId || 0;
        this.data = data.data ? new Date(data.data) : new Date();

        this.respostas = (data.respostas || []).map(r => new QuestionarioReposta(r));
    }
}
