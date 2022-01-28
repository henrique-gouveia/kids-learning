export default class Turma {
    public id!: number;
    public nome!: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || 0;
        this.nome = data.nome || '';
    }

    public toObject() {
        return {
            id: this.id,
            nome: this.nome
        }
    }
}
