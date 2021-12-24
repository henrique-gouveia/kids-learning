export default class Arquivo {
    public id?: number;
    public nomeOriginal?: string;
    public nome?: string;
    public tipo?: string;
    public tamanho?: number;
    public url?: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || null;
        this.nomeOriginal = data.nomeOriginal || null;
        this.nome = data.nome || null;
        this.tipo = data.tipo || null;
        this.tamanho = data.tamanho || null;
        this.url = data.url || null;
    }
}
