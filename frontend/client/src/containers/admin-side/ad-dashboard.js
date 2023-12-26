import React,{ useState } from 'react'
import './ad-dashboard.css'
import { SidebarData } from './sidebarData'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navb from 'components/ad/navbar';
import UserTable from 'components/ad/user-table';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';

 
function Ad_dashboard() {
    const [tab,setTab]=useState('/dashboard')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    const handleTabClick = (link) => {        
        setTab(link);   
        console.log(tab)
        if (link==='/logout'){
            console.log('logouth')
            dispatch(logout())        
            navigate('/')
        }
        
      };
      

    if (!isAuthenticated && !loading && user === null)
          return <Navigate to='/login' />;
  return (
    <div className='dashboard'>
        <Navb/>
        <div className='side-content' >
        <div className='sidebar'>
            <div className='profile-pic'>
                <AccountCircleIcon style={{width:'150px',height:'120px',padding:'10px',marginLeft:'31px'}}/>
            </div>
            <ul className='sidebarUL'>
                {SidebarData.map((val,key)=>{
                    return <li className={`sidebarList ${tab === val.link ? 'active' : ''}`}
                     key={key} onClick={() => handleTabClick(val.link)}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>{val.title}</div>
                            </li>
                })}
            </ul>    
        </div>
        <div className='content' >
        {tab === '/users' && <UserTable />}
        
        </div>
        </div>
    </div>
  )}

export default Ad_dashboard
