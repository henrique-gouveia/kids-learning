import Arquivo from "./arquivo";
import Resposta from "./resposta";

export default class Questao {
    public id!: number;
    public arquivoId?: number;
    public arquivo?: Arquivo;
    public tipo!: string;
    public enunciado!: string;
    public texto?: string;
    private _acertou!: boolean;

    private _respostas: Resposta[] = [];

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
        this._acertou = false;

        this._respostas = (data.respostas || []).map(r => new Resposta(r));

        if (this._respostas.length === 0)
            this._respostas = [ new Resposta({ correta: true } )];
    }

    public get acertou(): boolean {
        return this._acertou;
    }

    public get alternativaCorreta(): number {
        const resposta = this._respostas.filter(r => r.correta === true)[0] || {};
        return resposta.alternativa || 0;
    }

    public set alternativaCorreta(value: number) {
        this._respostas = this._respostas.map(r => new Resposta({ ...r, correta: r.alternativa == value }));
    }

    public get respostas(): Resposta[] {
        return this._respostas;
    }

    public addResposta(): void {
        const alternativas = this._respostas.map(r => r.alternativa);
        const alternativa = alternativas.reduce((a, b) => Math.max(a, b)) + 1;

        this._respostas.push(new Resposta({ questaoId: this.id, alternativa }));
    }

    public selecionarResposta(alternativa: number): void {
        if (!this.haRespostaSelecionada()) {
            this._respostas = this._respostas.map(resposta => {
                const selecionada = resposta.alternativa === alternativa;

                const revelar = selecionada || resposta.correta;
                if (revelar) resposta.revelar();

                if (selecionada && resposta.correta)
                    this._acertou = true;

                return resposta;
            })
        }
    }

    public haRespostaSelecionada(): boolean {
        const respostasSelecionadas = this._respostas.filter(a => a.revelada == true) || [];
        return respostasSelecionadas.length > 0;
    }

    public haImagem(): boolean {
        return (this.tipo === 'Vocabulário' && !!this.arquivo?.url);
    }

    public haVideo(): boolean {
        return (this.tipo === 'Audição' && !!this.arquivo?.url);
    }

    public removerReposta(alternativa: number): void {
        if (this._respostas.length > 1)
            this._respostas = this._respostas.filter(r => r.alternativa !== alternativa);
    }
}
