export default class Resposta {
    public questaoId!: number;
    public alternativa!: number;
    public alternativaCor!: string;
    public descricao!: string;
    public correta!: boolean;
    public revelada!: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.questaoId = data.questaoId || 0;
        this.alternativa = data.alternativa || 1;
        this.alternativaCor = `#${parseInt((`${Math.random() * 0xFFFFFF}`)).toString(16).padStart(6, '0')}`;
        this.descricao = data.descricao || '';
        this.correta = data.correta || false;
        this.revelada = false;
    }

    public revelar(): void {
        this.revelada = true;
    }
}
