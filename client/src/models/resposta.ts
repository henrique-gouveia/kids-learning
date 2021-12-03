export default class Resposta {
    public questaoId!: number;
    public alternativa!: number;
    public descricao!: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.questaoId = data.questaoId || 0;
        this.alternativa = data.alternativa || 1;
        this.descricao = data.nome || '';
    }
}