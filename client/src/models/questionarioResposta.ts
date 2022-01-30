export default class QuestionarioReposta {
    public questaoId!: number;
    public acertou!: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.questaoId = data.questaoId || 0;
        this.acertou = data.acertou || false;
    }
}
