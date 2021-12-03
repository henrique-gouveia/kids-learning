export default class Aluno {
    public id!: number;
    
    public turmaId!: number;
    private _turma?: string;

    public matricula!: string;
    public nome!: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || 0;
        this.turmaId = data.turmaId || 0;
        this._turma = data.turma || '';
        this.matricula = data.matricula || '';
        this.nome = data.nome || '';
    }

    public get turma(): string {
        return this._turma || '';
    }
}