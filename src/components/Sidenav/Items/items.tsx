import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import CloudArrowUpIcon from "@heroicons/react/24/solid/CloudArrowUpIcon";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/main',
    icon: (
      <SvgIcon fontSize="small">
        <ComputerDesktopIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Upload',
    path: '/upload',
    icon: (
      <SvgIcon fontSize="small">
        <CloudArrowUpIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Add Employee',
    path: '/add-employee',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Edit',
    path: '/edit',
    icon: (
      <SvgIcon fontSize="small">
        <PencilSquareIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: (
      <SvgIcon fontSize="small">
        <ArrowLeftOnRectangleIcon />
      </SvgIcon>
    ),
  },
];
