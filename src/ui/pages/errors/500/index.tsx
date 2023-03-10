import React from 'react';
import { ErrorPage } from '@ui/pages/errors/errorPage';

export const Page500 = () => {
  return <ErrorPage code="500" description="Internal server error" />;
};
