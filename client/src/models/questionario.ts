import moment from 'moment';

export default class Questionario {
    public id!: string;

    public turmaId!: number;
    private _turma?: string;

    public dataInicio!: Date;
    public dataFim!: Date;
    public quantidadeQuestoes!: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || '';
        this.turmaId = data.turmaId || 0;
        this._turma = data.turma || '';
        this.dataInicio = data.dataInicio ? new Date(data.dataInicio) : new Date();
        this.dataFim = data.dataFim ? new Date(data.dataFim) : new Date();
        this.quantidadeQuestoes = data.quantidadeQuestoes || 10;
    }

    public get turma(): string {
        return this._turma || '';
    }

    public toObject(): any {
        return {
            id: this.id,
            turmaId: this.turmaId,
            dataInicio: moment(this.dataInicio).format(),
            dataFim: moment(this.dataFim).format(),
            quantidadeQuestoes: this.quantidadeQuestoes
        }
    }
}
