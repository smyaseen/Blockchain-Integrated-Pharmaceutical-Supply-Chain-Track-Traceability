import { RouteNames } from './RouteNames';
import Roles from '../utility/roles';

const routeConfig: { [key: string]: { [key: string]: string } } = {
  [Roles.public]: {
    default: RouteNames.root,
    [RouteNames.root]: RouteNames.root,
    [RouteNames.browseDictionary]: RouteNames.browseDictionary,
  },

  auth: {
    default: RouteNames.root,
    [RouteNames.signup]: RouteNames.signup,
  },

  [Roles.manufacturer]: {
    default: RouteNames.products,
    [RouteNames.products]: RouteNames.products,
    [RouteNames.manufacturerCreateBatch]: RouteNames.manufacturerCreateBatch,
    [RouteNames.manufacturerBatches]: RouteNames.manufacturerBatches,
    // [RouteNames.manufacturerBatchProgress]:
    //   RouteNames.manufacturerBatchProgress,
  },

  [Roles.distributor]: {
    default: RouteNames.distributorBatches,
    // [RouteNames.distributorOrders]: RouteNames.distributorOrders,
    [RouteNames.distributorBatches]: RouteNames.distributorBatches,
    [RouteNames.distributorCreateOrder]: RouteNames.distributorCreateOrder,
    // [RouteNames.distributorBatchProgress]: RouteNames.distributorBatchProgress,
  },

  [Roles.pharmacy]: {
    default: RouteNames.pharmacyOrders,
    [RouteNames.pharmacyOrders]: RouteNames.pharmacyOrders,
    [RouteNames.pharmacyCreateOrder]: RouteNames.pharmacyCreateOrder,
    // [RouteNames.pharmacyBatchProgress]: RouteNames.pharmacyBatchProgress,
  },
};

export default routeConfig;
