import { RouteNames } from './RouteNames';
import Roles from '../utility/roles';

const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  [Roles.manufacturer]: {
    default: RouteNames.manufacturer,
    [RouteNames.manufacturer]: RouteNames.manufacturer,
  },

  [Roles.customer]: {},
  [Roles.distributor]: {},

  [Roles.pharmacy]: {},
};

export default routeConfig;
