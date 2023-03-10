import React from 'react';
import { classNames } from '@utils/classNames';
import { BlockTabs } from '@ui/pages/block/blockTabs';
import { Page403 } from '@ui/pages/errors/403';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import './index.scss';

export const BlockContent = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const cls = classNames('block-content');
  if (!block) return <Loader loading relative />;
  return block.enable ? (
    <div className={cls}>
      <BlockTabs />
    </div>
  ) : (
    <Page403 />
  );
});
