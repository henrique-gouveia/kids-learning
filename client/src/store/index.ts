import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingModule, { SettingState } from './modules/setting';
import SettingPlugin from './plugins/setting';

Vue.use(Vuex);

export interface ApplicationState {
    setting: SettingState;
}

const store: StoreOptions<ApplicationState> = {
    modules: {
        setting: SettingModule
    },
    plugins: [
        createPersistedState({
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
