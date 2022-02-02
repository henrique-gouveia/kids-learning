import QuestionarioRealizadoAlunoResultado from "./questionarioRealizadoAlunoResultado";

export default class QuestionarioRealizadoTurmaResultado {
    public totalAcertosAudicao!: number;
    public totalAcertosLeitura!: number;
    public totalAcertosVocabulario!: number;

    public totalErrosAudicao!: number;
    public totalErrosLeitura!: number;
    public totalErrosVocabulario!: number;

    public totalAcertos!: number;
    public totalErros!: number;
    public totalQuestoes!: number;

    public percentualAcertosAudicao!: number;
    public percentualAcertosLeitura!: number;
    public percentualAcertosVocabulario!: number;

    public percentualErrosAudicao!: number;
    public percentualErrosLeitura!: number;
    public percentualErrosVocabulario!: number;

    public percentualAcertos!: number;
    public percentualErros!: number;

    public items!: QuestionarioRealizadoAlunoResultado[];

    constructor(data: any[] = []) {
        if (!data) {
            data = []
        }

        this.items = data.map(qr => new QuestionarioRealizadoAlunoResultado(qr));

        this.totalAcertosAudicao = this.items.reduce((total, item) => total + item.acertosAudicao, 0);
        this.totalAcertosLeitura = this.items.reduce((total, item) => total + item.acertosLeitura, 0);
        this.totalAcertosVocabulario = this.items.reduce((total, item) => total + item.acertosVocabulario, 0);

        this.totalErrosAudicao = this.items.reduce((total, item) => total + item.errosAudicao, 0);
        this.totalErrosLeitura = this.items.reduce((total, item) => total + item.errosLeitura, 0);
        this.totalErrosVocabulario = this.items.reduce((total, item) => total + item.errosVocabulario, 0);

        this.totalAcertos = this.totalAcertosAudicao + this.totalAcertosLeitura + this.totalAcertosVocabulario;
        this.totalErros = this.totalErrosAudicao + this.totalErrosLeitura + this.totalErrosVocabulario;

        this.totalQuestoes = this.totalAcertos + this.totalErros;

        this.percentualAcertosAudicao = this.totalQuestoes ? Math.round((this.totalAcertosAudicao / this.totalQuestoes) * 100) : 0;
        this.percentualAcertosLeitura = this.totalQuestoes ? Math.round((this.totalAcertosLeitura / this.totalQuestoes) * 100) : 0;
        this.percentualAcertosVocabulario = this.totalQuestoes ? Math.round((this.totalAcertosVocabulario / this.totalQuestoes) * 100) : 0;

        this.percentualErrosAudicao = this.totalQuestoes ? Math.round((this.totalErrosAudicao / this.totalQuestoes) * 100) : 0;
        this.percentualErrosLeitura = this.totalQuestoes ? Math.round((this.totalErrosLeitura / this.totalQuestoes) * 100) : 0;
        this.percentualErrosVocabulario = this.totalQuestoes ? Math.round((this.totalErrosVocabulario / this.totalQuestoes) * 100) : 0;

        this.percentualAcertos = this.totalQuestoes ? Math.round((this.totalAcertos / this.totalQuestoes) * 100) : 0;
        this.percentualErros = this.totalQuestoes ? Math.round((this.totalErros / this.totalQuestoes) * 100) : 0;

    }
}
