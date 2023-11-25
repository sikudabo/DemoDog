import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStartupEmployeeData } from '../hooks';
import { StartupEmployeeType } from '../typings/StartupEmployeeType';

export default function RouteWatch() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { employee } = useStartupEmployeeData();
    const isLoggedIn = typeof employee !== 'undefined' && employee !== null && typeof (employee as StartupEmployeeType)._id !== 'undefined';
    const acceptedRoutes = [
        '/',
        '/sign-in',
        '/sign-up',
        '/sign-up-decision',
        '/startup-dashboard/main',
        '/startup-dashboard/demo-upload',
        '/startup-dashboard/add-startup-employee',
        '/startup-dashboard/edit-page',
    ];

    useEffect(() => {
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
        }

        console.log('the pathname is:', pathname);
    }, [pathname])

    return null;
}
