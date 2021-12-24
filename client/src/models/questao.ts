import Arquivo from "./Arquivo";
import QuestaoReposta from "./questaoReposta";

export default class Questao {
    public id!: number;
    public arquivoId?: number;
    public arquivo?: Arquivo;
    public tipo!: string;
    public enunciado!: string;
    public texto?: string;

    private _respostas: QuestaoReposta[] = [];

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || 0;
        this.arquivoId = data.arquivoId || null;

        if (data.arquivo) {
            this.arquivo = new Arquivo(data.arquivo)
        }

        this.tipo = data.tipo || 'Vocabulário';
        this.enunciado = data.enunciado || '';
        this.texto = data.texto;

        this._respostas = data.respostas || [];

        if (this._respostas.length === 0)
            this._respostas = [ new QuestaoReposta({ correta: true } )];
    }

    public get alternativaCorreta(): number {
        const resposta = this._respostas.filter(r => r.correta === true)[0] || {};
        return resposta.alternativa || 0;
    }

    public set alternativaCorreta(value: number) {
        this._respostas = this._respostas.map(r => ({ ...r, correta: r.alternativa == value }));
    }

    public get respostas(): QuestaoReposta[] {
        return this._respostas;
    }

    public AddResposta(): void {
        const alternativas = this._respostas.map(r => r.alternativa);
        const alternativa = alternativas.reduce((a, b) => Math.max(a, b)) + 1;

        this._respostas.push(new QuestaoReposta({ questaoId: this.id, alternativa }));
    }

    public removeReposta(alternativa: number): void {
        if (this._respostas.length > 1)
            this._respostas = this._respostas.filter(r => r.alternativa !== alternativa);
    }
}
