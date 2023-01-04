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
    [RouteNames.createBatch]: RouteNames.createBatch,
    [RouteNames.manufacturerBatches]: RouteNames.manufacturerBatches,
    [RouteNames.seeBatch]: RouteNames.seeBatch,
  },

  [Roles.customer]: {},
  [Roles.distributor]: {},

  [Roles.pharmacy]: {},
};

export default routeConfig;
