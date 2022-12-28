export const userValueGetter = (params: any) => {
  return {
    title: `${params.node.rowIndex + 1}. ${params.data?.username}`,
    paid: Boolean(params.data.paid)
      ? { status: 'Paid', color: 'green' }
      : undefined,
    active: Boolean(params.data.active)
      ? { status: 'Active', color: 'blue' }
      : undefined,
    admin: Boolean(params.data.admin)
      ? { status: 'Admin', color: 'red' }
      : undefined,
  };
};
