export default class Usuario {
    public id!: number;
    public nome!: string;
    public email!: string;
    public admin!: boolean;
    public password?: string;
    public confirmPassword?: string;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || 0;
        this.nome = data.nome || '';
        this.email = data.email || '';
        this.admin = data.admin || false;
        this.password = data.password || undefined;
        this.confirmPassword = data.confirmPassword || undefined;
    }
}
