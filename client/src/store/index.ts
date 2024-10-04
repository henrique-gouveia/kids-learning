import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { appKey } from '@/consts';

import SettingModule, { SettingState } from './modules/setting';
import SettingPlugin from './plugins/setting';

import AuthModule, { AuthState } from './modules/auth';

Vue.use(Vuex);

export interface ApplicationState {
    setting: SettingState,
    auth: AuthState
}

const store: StoreOptions<ApplicationState> = {
    modules: {
        setting: SettingModule,
        auth: AuthModule
    },
    plugins: [
        createPersistedState({
            key: appKey,
            reducer: persistedState => {
                const stateFilter = JSON.parse(JSON.stringify(persistedState)); // deep clone
                ['offsidebarOpen', 'asideToggled', 'horizontal'] // states which we don't want to persist.
                    .forEach(item => delete stateFilter.setting[item]);
                return stateFilter;
            }
        }),
        SettingPlugin
    ]
};

export default new Vuex.Store<ApplicationState>(store);
