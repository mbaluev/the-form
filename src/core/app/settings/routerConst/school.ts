import { ROLES } from '@app/settings/roles';

export const ROUTER_CONST_SCHOOL: Record<string, any> = {
  ERROR403: {
    name: '403',
    path: '/403',
  },
  ERROR404: {
    name: '404',
    path: '/404',
  },
  ERROR500: {
    name: '500',
    path: '/500',
  },
  HOME: {
    name: 'home',
    label: 'The Form',
    path: '/',
  },
  MODULES: {
    name: 'modules',
    label: 'Modules',
    path: '/module',
    roles: [ROLES.STUDENT],
  },
  MODULE: {
    name: 'module',
    label: 'Module',
    path: '/module/[id]',
    roles: [ROLES.STUDENT],
  },
  BLOCK: {
    name: 'block',
    label: 'Block',
    path: '/block/[id]',
    roles: [ROLES.STUDENT],
  },
  PROFILE: {
    name: 'profile',
    label: 'Profile',
    path: '/account/profile',
    roles: [ROLES.DISABLE],
  },
  LOGIN: {
    name: 'login',
    label: 'login',
    path: '/account/login',
    roles: [ROLES.NONE],
  },
  SIGNUP: {
    name: 'signup',
    label: 'signup',
    path: '/account/signup',
    roles: [ROLES.NONE],
  },
  ADMIN_MODULES: {
    name: 'adminModules',
    label: 'Modules',
    path: '/admin/module',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE: {
    name: 'adminModule',
    label: 'Module',
    path: '/admin/module/[id]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE_BLOCKS: {
    name: 'adminModuleBlocks',
    label: 'Blocks',
    path: '/admin/module/[id]/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_MODULE_BLOCK: {
    name: 'adminModuleBlock',
    label: 'Block',
    path: '/admin/module/[id]/block/[blockId]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_BLOCKS: {
    name: 'adminBlocks',
    label: 'Blocks',
    path: '/admin/block',
    roles: [ROLES.ADMIN],
  },
  ADMIN_BLOCK: {
    name: 'adminBlock',
    label: 'Block',
    path: '/admin/block/[id]',
    roles: [ROLES.ADMIN],
  },
  ADMIN_USERS: {
    name: 'adminUsers',
    label: 'Users',
    path: '/admin/user',
    roles: [ROLES.ADMIN],
  },
  ADMIN_USER: {
    name: 'adminUser',
    label: 'User',
    path: '/admin/user/[id]',
    roles: [ROLES.ADMIN],
  },
};
