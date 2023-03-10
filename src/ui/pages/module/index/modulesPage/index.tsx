import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { ModuleGrid } from '@ui/pages/module/index/moduleGrid';

export const ModulesPage = () => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.MODULES.path },
    },
  ];
  return (
    <Page title="Modules" breadCrumbs={breadCrumbs}>
      <ModuleGrid />
    </Page>
  );
};
