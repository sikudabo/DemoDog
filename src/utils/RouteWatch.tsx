import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationData, useStartupEmployeeData } from '../hooks';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';

export default function RouteWatch() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { organization } = useOrganizationData();
    const { employee } = useStartupEmployeeData();
    const isLoggedIn = typeof employee !== 'undefined' && employee !== null && typeof (employee as StartupEmployeeType)._id !== 'undefined';
    const acceptedRoutes = [
        '/',
        '/sign-in',
        '/sign-up',
        '/sign-up-decision',
        '/sign-up-organization',
        '/startup-dashboard/main',
        '/startup-dashboard/demo-upload',
        '/startup-dashboard/add-startup-employee',
        '/startup-dashboard/edit-page',
        '/startup-profile',
        '/search-companies',
    ];

    useEffect(() => {
        if (pathname !== '/startup-profile' && !pathname.includes('startup-profile') && typeof organization !== 'undefined' && typeof (organization as any).password !== 'undefined') {
            navigate('/search-companies');
        } else if (pathname.includes('/startup-dashboard') && !isLoggedIn) {
            navigate('/');
        } else if (!pathname.includes('/startup-dashboard') && isLoggedIn) {
            navigate('/startup-dashboard/main');
        }
    }, [pathname]);

    /* useEffect(() => {
        if (!isLoggedIn && pathname.includes('startup-dashboard')) {
            navigate('/');
            return;
        }

       else if (isLoggedIn && !pathname.includes('startup-dashboard')) {
            navigate('/startup-dashboard/main');
        }

        else if (isLoggedIn && (!acceptedRoutes.includes(pathname) && !pathname.includes('video'))) {
            navigate('/startup-dashboard/main');
        }

        else if (!isLoggedIn && !acceptedRoutes.includes(pathname)) {
            navigate('/');
        } else if (!isLoggedIn && pathname.includes('search')) {
            navigate('/search-companies');
        } else if (!isLoggedIn && pathname.includes('company-profile')) {
            return;
        }

        console.log('the pathname is:', pathname);
    }, [pathname]);*/

    return null;
}
