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
    requiresAdmin?: boolean,
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
            {
                name: 'Questionários',
                path: 'questionarios'
            },
            {
                name: 'Usuários',
                path: 'usuarios',
                requiresAdmin: true
            }
        ]
    },
];

export default Menu;
