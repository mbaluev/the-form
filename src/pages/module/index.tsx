import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ModulesPage } from '@ui/pages/module/index/modulesPage';
import { useRouter } from 'next/router';
import { Loader } from '@components/loader';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const modules = (await serviceModule.getModulesUser(query, token)) || [];
  return { props: { modules } };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules } = props;
  const { setList: setModules } = useViewModel<IModuleViewModel>(
    VIEW_MODEL.Module
  );
  useEffect(() => {
    setModules(modules);
  });
  const router = useRouter();
  if (router.isFallback) return <Loader loading={true} relative />;
  return <ModulesPage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
