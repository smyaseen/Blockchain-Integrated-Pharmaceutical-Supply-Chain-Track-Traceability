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
    const { isLoggedIn, role } = useSelector(getAuthState);
    const router = useRouter();
    const [isValidRoute, setIsValidRoute] = useState(false);

    useEffect(() => {
      if (
        isLoggedIn &&
        !(role === allowedRole) &&
        !routeConfig[role][router.pathname]
      ) {
        setIsValidRoute(false);
        router.push(routeConfig[role].default);
      } else if (!isLoggedIn && !routeConfig.auth[router.pathname]) {
        setIsValidRoute(false);
        router.push(routeConfig.auth.default);
      } else setIsValidRoute(true);
    }, []);

    return isValidRoute ? <Component {...props} /> : null;
  };

export default withAuth;
