import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { ModulePage } from '@ui/pages/module/[id]/modulePage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Loader } from '@components/loader';
import { observer } from 'mobx-react';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params } = context;

  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const modules = (await serviceModule.getModules()) || null;
  const module = (await serviceModule.getModule(params?.id)) || null;

  return {
    props: { modules, module },
    notFound: !Boolean(module),
  };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules, module } = props;
  const {
    setList: setModules,
    setData: setModule,
    setModuleData,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  useEffect(() => {
    setModules(modules);
    setModule(module);
    setModuleData(module);
  });
  const router = useRouter();
  if (router.isFallback || !module) return <Loader loading={true} relative />;
  return <ModulePage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
