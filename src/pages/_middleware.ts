import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Jwt } from '@utils/jwt';
import cookie from '@utils/cookie';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ROLES } from '@app/settings/roles';
import { ROUTER_CONST_DEV } from '@app/settings/routerConst/dev';
import { isAccess } from '@ui/permission/permissionWrapper';

const getClaimRoles = (token?: string) => {
  let claimRoles;
  if (token) {
    claimRoles = new Jwt(token).decodedClaims?.roles as string[];
  } else {
    claimRoles = [ROLES.NONE];
  }
  return claimRoles;
};

const handleRouteDev = () => {
  return ROUTER_CONST_SCHOOL.HOME.path;
};

const handleRouteSchool = (
  key: string,
  token?: string,
  claimRoles?: string[]
) => {
  const routeRoles = ROUTER_CONST_SCHOOL[key].roles || [];
  const routeHasRoles = routeRoles.length > 0;
  const routeAccess = isAccess(claimRoles, routeRoles);
  if (routeHasRoles && !routeAccess) {
    if (token) {
      return ROUTER_CONST_SCHOOL.ERROR403.path;
    } else {
      return ROUTER_CONST_SCHOOL.LOGIN.path;
    }
  }
  return undefined;
};

export async function middleware(request: NextRequest) {
  const nextPath = request.page.name;
  const token = request.cookies[cookie.names.token];
  const claimRoles = getClaimRoles(token);

  for (const key in ROUTER_CONST_SCHOOL) {
    if (nextPath === ROUTER_CONST_SCHOOL[key].path) {
      const url = handleRouteSchool(key, token, claimRoles);
      if (url) return NextResponse.rewrite(new URL(url, request.url));
    }
  }

  for (const key in ROUTER_CONST_DEV) {
    const path = ROUTER_CONST_DEV[key].path;
    if (nextPath === path && process.env.NODE_ENV !== 'development') {
      const url = handleRouteDev();
      if (url) return NextResponse.rewrite(new URL(url, request.url));
    }
  }

  return NextResponse.next();
}
