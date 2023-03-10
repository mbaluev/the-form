import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { BlockContent } from '@ui/pages/block/blockContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BlockSubTitle } from '@ui/pages/block/blockSubTitle';
import './index.scss';

export const BlockPage = observer(() => {
  const { data: module } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.MODULES.path },
    },
    {
      label: module ? `${module.title}. ${module.name}` : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.MODULE.path,
        query: { id: module?.id },
      },
    },
    {
      label: block ? `${block.title}. ${block.name}` : 'loading...',
      url: { pathname: ROUTER_CONST_SCHOOL.MODULE.path },
      neighbors: module?.blocks?.map((d) => {
        return {
          label: `${d.title}. ${d.name}`,
          url: {
            pathname: ROUTER_CONST_SCHOOL.BLOCK.path,
            query: { id: d.id },
          },
          disabled: !d.enable,
          complete: d.complete,
          selected: d.id === block?.id,
        };
      }),
    },
  ];
  const cls = classNames('block-page', {
    'block-page_complete': Boolean(module && module.complete),
  });
  const progress = getProgress(block?.tabs.map((t) => t.complete));
  return (
    <Page
      title={block?.name}
      subTitle={<BlockSubTitle />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
    >
      <BlockContent />
    </Page>
  );
});
