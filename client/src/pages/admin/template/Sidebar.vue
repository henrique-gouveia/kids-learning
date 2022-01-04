<template>
  <aside class="aside-container">
    <div class="aside-inner">
      <nav class="sidebar" data-sidebar-anyclick-close="">
        <ul class="sidebar-nav">
          <template v-for="item in Menu">
            <template v-if="!item.requiresAdmin || item.requiresAdmin && userAdmin">
              <li class="nav-heading" v-if="item.heading" :key="item.name">
                <span>{{ item.heading }}</span>
              </li>
              <router-link tag="li" :to="item.path" active-class="active" v-if="!item.heading && !item.submenu" :key="item.name">
                <a :title="item.name">
                  <span v-if="item.label" :class="'float-right badge badge-'+item.label.color">{{item.label.value}}</span>
                  <em :class="item.icon"></em>
                  <span>{{ item.name }}</span>
                </a>
              </router-link>
              <li :class="routeActiveClass(getSubRoutes(item))" v-if="!item.heading && item.submenu" :key="item.name">
                <a :title="item.name" @click.prevent="toggleItemCollapse(item.name)" href>
                  <span v-if="item.label" :class="'float-right badge badge-'+item.label.color">{{item.label.value}}</span>
                  <em :class="item.icon"></em>
                  <span>{{ item.name }}</span>
                </a>
                <b-collapse tag="ul" class="sidebar-nav sidebar-subnav" id="item.name" v-model="collapse[item.name]">
                  <li class="sidebar-subnav-header">{{item.name}}</li>
                  <template v-for="sitem in item.submenu">
                    <template v-if="!sitem.requiresAdmin || sitem.requiresAdmin && userAdmin">
                      <router-link tag="li" :to="sitem.path" active-class="active" :key="sitem.name">
                          <a :title="sitem.name">
                            <span v-if="sitem.label" :class="'float-right badge badge-'+sitem.label.color">{{sitem.label.value}}</span>
                            <span>{{ sitem.name }}</span>
                          </a>
                      </router-link>
                    </template>
                  </template>
                </b-collapse>
              </li>
            </template>
          </template>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import { Watch } from 'vue-property-decorator';

import Menu, { ISidebarMenuItem } from '@/menu';
import { ApplicationState } from '@/store/index';

import SidebarRun from './Sidebar.run.js';

interface StringBoolArray { [index: string] : boolean }

@Component
export default class Sidebar extends Vue {
  Menu = Menu;
  collapse: StringBoolArray = {} as StringBoolArray

  @State((state: ApplicationState) => state.auth.admin) userAdmin!: boolean;
  @State((state: ApplicationState) => state.setting.showUserBlock) showUserBlock!: boolean;

  mounted(): void {
    this.collapse = this.buildCollapseList();
    SidebarRun(this.$router, this.closeSidebar)
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any): void {
    this.closeSidebar()
  }

  closeSidebar = () => {
    this.$store.commit('changeSetting', { name: 'asideToggled', value: false })
  }

  buildCollapseList(): StringBoolArray {
    let collapse = {} as StringBoolArray;
    Menu
      .filter(({heading}) => !heading)
      .forEach(({name, path, submenu}) => {
        if (name)
          collapse[name] = this.isRouteActive(submenu ? submenu.map(({path})=>path) : path)
      })
    return collapse;
  }

  getSubRoutes = (item: ISidebarMenuItem): Array<string> => {
      if(item.submenu)
        item.submenu.map(({path}) => path)
      return [];
  }

  isRouteActive(paths: string | Array<string|undefined> | undefined): any {
    paths = Array.isArray(paths) ? paths : [paths];
    return paths.some(p => {
      return p ? this.$route.path.indexOf(p) > -1 : false;
    })
  }

  routeActiveClass(paths: string | Array<string|undefined> | undefined): any {
    return { 'active': this.isRouteActive(paths) }
  }

  toggleItemCollapse(collapseName: string): void {
    for (let c in this.collapse) {
      if (this.collapse[c] === true && c !== collapseName)
        this.collapse[c] = false
    }
    this.collapse[collapseName] = !this.collapse[collapseName]
  }
}
</script>
