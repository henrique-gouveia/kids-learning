export default class QuestaoReposta {
    public questaoId!: number;
    public alternativa!: number;
    public descricao!: string;
    public correta!: boolean;
    public selecionada!: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.questaoId = data.questaoId || 0;
        this.alternativa = data.alternativa || 1;
        this.descricao = data.descricao || '';
        this.correta = data.correta || false;
        this.selecionada = false;
    }
}
