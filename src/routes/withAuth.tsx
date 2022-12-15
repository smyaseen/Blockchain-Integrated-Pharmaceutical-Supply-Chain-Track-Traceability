import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthState } from '../store/slices/authSlice';
import { useSelector } from '../store/store';
import routeConfig from './RouteConfig';

const withAuth =
  (Component: React.FC) =>
  (allowedRole: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => {
    // getting the auth state from redux store
    const { isLoggedIn, role } = useSelector(getAuthState);
    const router = useRouter();

    // using a state to keep track if user is in correct state or path
    const [isValidRoute, setIsValidRoute] = useState(false);

    useEffect(() => {
      // first condition is to check if logged in and if on wrong path
      // then route to default route of the particular role user is of

      if (
        isLoggedIn &&
        !(role === allowedRole) &&
        !routeConfig[role][router.pathname]
      ) {
        setIsValidRoute(false);
        router.push(routeConfig[role].default);
      }

      // second condition is to check if not logged in and if on wrong path
      // then route to default not authenticated path
      else if (!isLoggedIn && !routeConfig.auth[router.pathname]) {
        setIsValidRoute(false);
        router.push(routeConfig.auth.default);
      }

      // if upper two conditions are not met then the route user is in correct and return the component
      else setIsValidRoute(true);
    }, []);

    return isValidRoute ? <Component {...props} /> : null;
  };

export default withAuth;