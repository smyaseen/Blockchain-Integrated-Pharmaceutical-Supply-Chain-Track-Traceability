import { RouteNames } from './RouteNames';

const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  manufacturer: {
    default: RouteNames.manufacturer,
    [RouteNames.manufacturer]: RouteNames.manufacturer,
  },

  // admin: [],

  // customer: [],
  // distributor: [],

  // pharmacy: [],
};

export default routeConfig;
