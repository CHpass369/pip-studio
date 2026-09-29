import { useSelector } from 'react-redux';

import { routes as buys_routes } from './buys/routes';
import { routes as orders_routes } from './orders/routes';
import { routes as invoices_routes } from './invoices/routes';
import { routes as sales_routes } from './sales/routes';
import { routes as terminates_routes } from './terminates/routes';

const routes = () => {
  const { area } = useSelector((state: any) => state.apps);
  const { account } = useSelector((state: any) => state.auth);

  if (!area || !account) {
    return null;
  }

  return (
    <>
      {sales_routes(area)}
      {buys_routes(area)}
      {orders_routes(area)}
      {invoices_routes(area)}
      {terminates_routes(area)}
    </>
  );
};

export { routes };
