import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockPage } from '@ui/pages/admin/block/blockPage';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/block/interface';
import { IModuleService } from '@service/modules/module/interface';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterSelect } from '@ui/filter/filterSelect';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const blocks = (await serviceBlock.getBlocks(query, token)) || null;
  const modules = (await serviceModule.getModules(undefined, token)) || null;

  return { props: { blocks, modules } };
};

const Block = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { blocks, modules } = props;
  const {
    setList: setBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const {
    setList: setModules,
    clearData: clearModule,
    clearModuleData,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.path },
    },
  ];
  const filtersLeft: JSX.Element[] = [
    <FilterSelect
      name="moduleId"
      placeholder="Module"
      style={{ flexBasis: '50%' }}
      items={modules?.map((item) => {
        return {
          value: item.id,
          label: item.title,
        };
      })}
    />,
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flexBasis: '50%' }}
    />,
  ];
  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, id: params.data.id };
    router.push({ pathname: ROUTER_CONST_SCHOOL.ADMIN_BLOCK.path, query });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_BLOCKS.path,
    });
  };
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id: id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_BLOCK.path,
      query,
    });
  };

  useEffect(() => {
    setBlocks(blocks);
    clearBlock();
    clearBlockData();
    setModules(modules);
    clearModule();
    clearModuleData();
  });

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onDelete={onDelete}
      // onNewCallback={onNewCallback}
    />
  );
};

Block.Layout = MasterSchool;
export default observer(Block);
