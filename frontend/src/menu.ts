export interface ISidebarMenuItem {
    heading?: string,
    name?: string,
    icon?: string,
    translate?: string,
    path?: string,
    label?: {
        value: string | number,
        color: string
    },
    submenu?: ISidebarMenu
}

export type ISidebarMenu = Array<ISidebarMenuItem>

const Menu: ISidebarMenu = [
    {
        name: 'Início',
        path: 'inicio',
        icon : 'icon-home',
    },
    {
        name: 'Administração',
        icon: 'icon-layers',
        submenu: [
            {
                name: 'Turmas',
                path: 'turmas'
            },
            {
                name: 'Alunos',
                path: 'alunos'
            },
            {
                name: 'Questões',
                path: 'questoes'
            },
        ]
    },
    {
        name: 'Questionário',
        icon: 'icon-note',
        submenu: [
            {
                name: 'Gerenciar',
                path: 'questionario'
            }
        ]
    },
    {
        name: 'Usuários',
        icon: 'icon-people',
        path: 'usuarios'
    }
];

export default Menu;