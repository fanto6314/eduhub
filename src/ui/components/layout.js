import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FiUsers, FiPlus } from 'react-icons/fi';
import { MdGroups } from 'react-icons/md';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

async function getMe() {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:3000/api/user/me',
    headers: { },
    withCredentials: true,
  };
  
  let response = await axios(config);
  return response.data;
}

function Layout({ children, token }) {
  const router = useRouter();
  const [myGroups, setMyGroups] = React.useState([]);
  const [myProfile, setMyProfile] = React.useState({});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    getMe().then(data => {
      setMyGroups(data.Groups);
      setMyProfile(data);
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      title: "Profile",
      href: "/app/users/1",
    },
    {
      title: "Settings",
      href: "/app/users/edit/1",
    },
    {
      title: "Logout",
      href: "/auth/signout",
    },
  ];

  // const adminMenuItems = [
  //   {
  //     href: '/app/admin/users',
  //     title: 'Users',
  //     icon: <FiUsers />,
  //   },
  //   {
  //     href: '/app/admin/workspaces',
  //     title: 'Workspaces',
  //     icon: <MdOutlineWorkspaces />,
  //   },
  // ];

  const utilsMenuItems = [
    {
      href: '/app/workspace/join',
      title: 'Join workspace',
      icon: <FiPlus />,
    },
    {
      href: '/app/workspace/new',
      title: 'Create workspace',
      icon: <FiPlus />,
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-[#183d1f] sticky top-0 h-14 flex items-center font-semibold'>
        <div className='flex-1 ml-5'>
          <Link href='/app/'>
            <a className='text-white'>
              <span className='ml-2 mt-20 leading-7 react-text'>EduHub</span>
              <img src='https://i.imgur.com/6YLPwde.png' alt='logo' className='h-8 align-middle' align="left"/>
            </a>
          </Link>
        </div>
        <div className='flex-1 text-right mx-5'>
          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <h1 className='text-white text-lg mr-2 fnt-fmly'>{token.name}</h1>
                  <Avatar alt="Remy Sharp" src={myProfile.picture} className='align-middle'/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link href={setting.href} style={{textDecoration: 'none'}}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
        </div>
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-[#112715] w-full md:w-60'>
          <div className='flex flex-col items-center justify-center mt-5 fnt-fmly'>
            <img src={myProfile.picture} alt='profile' className='h-24 w-24 rounded-full'/>
            <h1 className='text-white mt-4'>{token.name}</h1>
            {/* <h2 className='text-[#94a3b8] text-sm'>Admin</h2> */}
          </div>
          <nav className='mt-10'>
            <ul>
              <li className='ml-7 mt-10'>
                <h2 className='text-[#a7b4c7] text-sm'>My Groups</h2>
              </li>
              {myGroups.map(({ id, name }) => (
                <li className='m-3 text-lg fnt-fmly' key={name}>
                  <Link href={"/app/workspace/" + id}>
                    <a
                      className={`flex p-2 rounded hover:bg-green-500/10 cursor-pointer text-white`
                    }
                    >
                      <span className='flex items-center justify-center'>
                        <MdGroups color='white'/>
                        <span className='ml-4'>{name}</span>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
              {utilsMenuItems.map(group => (
                <li className='m-3 text-lg fnt-fmly' key={group.title}>
                  <Link href={group.href}>
                    <a
                      className={`flex p-2 rounded hover:bg-green-500/10 cursor-pointer text-white`
                    }
                    >
                      <span className='flex items-center justify-center'>
                        <FiPlus />
                        <span className='ml-4'>{group.title}</span>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <br />
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

export default Layout;