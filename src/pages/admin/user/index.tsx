import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { IUserService } from '@service/modules/user/interface';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { UserPage } from '@ui/pages/admin/user/userPage';
import { observer } from 'mobx-react';
import { useToken } from '@hooks/useToken';
import cookie from '@utils/cookie';
import { useAuth } from '@hooks/useAuth';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query, req } = context;
  const { cookies } = req;

  const token = await useToken(cookies[cookie.names.refreshToken]);
  const serviceUser = useService<IUserService>(SERVICE.User);

  const users = (await serviceUser.getUsers(query, token)) || null;

  return { props: { users, token } };
};

const Users = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { users, token } = props;
  const { setToken } = useAuth();
  const {
    setList: setUsers,
    clearData: clearUser,
    clearUserData,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_USERS.path },
    },
  ];
  const router = useRouter();
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_USER.path,
      query,
    });
  };

  useEffect(() => {
    setToken(token);
    setUsers(users);
    clearUser();
    clearUserData();
  });

  return (
    <UserPage
      breadCrumbs={breadCrumbs}
      // onNewCallback={onNewCallback}
    />
  );
};

Users.Layout = MasterSchool;
export default observer(Users);
