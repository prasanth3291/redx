import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
    title:'dashboard',
    icon:<HomeIcon/>,
    link:'/ad-dashboard'
    },
    {
    title:'Users',
    icon:<PeopleIcon/>,
    link:'/users'
    },
    {
    title:'Signout',
    icon:<LogoutIcon/>,
    link:'/logout',
    
    }
]


