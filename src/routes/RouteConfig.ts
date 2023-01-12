import { RouteNames } from './RouteNames';
import Roles from '../utility/roles';

const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  [Roles.manufacturer]: {
    default: RouteNames.products,
    [RouteNames.products]: RouteNames.products,
    [RouteNames.manufacturerCreateBatch]: RouteNames.manufacturerCreateBatch,
    [RouteNames.manufacturerBatches]: RouteNames.manufacturerBatches,
    [RouteNames.manufacturerBatchProgress]:
      RouteNames.manufacturerBatchProgress,
  },

  [Roles.distributor]: {
    default: RouteNames.distributorOrders,
    [RouteNames.distributorOrders]: RouteNames.distributorOrders,
    [RouteNames.distributorBatches]: RouteNames.distributorBatches,
    [RouteNames.distributorCreateOrder]: RouteNames.distributorCreateOrder,
    [RouteNames.distributorBatchProgress]: RouteNames.distributorBatchProgress,
  },

  [Roles.pharmacy]: {},
};

export default routeConfig;
