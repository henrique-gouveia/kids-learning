export default class QuestionarioRealizadoAlunoResultado {
    public id?: number;
    public matricula!: number;
    public nome!: string;
    public questionarioId!: number;
    public respondeu!: boolean;
    public acertosAudicao!: number;
    public errosAudicao!: number;
    public acertosLeitura!: number;
    public errosLeitura!: number;
    public acertosVocabulario!: number;
    public errosVocabulario!: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

		this.id = data.id || null;
		this.matricula = data.matricula || '';
		this.nome = data.nome || '';
		this.questionarioId = data.questionarioId || 0;
		this.respondeu = data.respondeu || false;
		this.acertosAudicao = data.acertosAudicao || 0;
		this.errosAudicao = data.errosAudicao || 0;
		this.acertosLeitura = data.acertosLeitura || 0;
		this.errosLeitura = data.errosLeitura || 0;
		this.acertosVocabulario = data.acertosVocabulario || 0;
		this.errosVocabulario = data.errosVocabulario || 0;
    }
}
