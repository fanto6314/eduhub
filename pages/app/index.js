import React from 'react';
import Layout from '../../src/ui/components/layout';
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { MdGroups } from 'react-icons/md';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {getToken} from "next-auth/jwt";

async function getMyGroups() {
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

export default function Home({token}) {
  const router = useRouter();
  const [myGroups, setMyGroups] = React.useState([]);

  useEffect(() => {
    if (token === null) {
      router.push('/auth/sign-in');
    }
  }, [token, router]);

  useEffect(() => {
    getMyGroups().then(data => {
      setMyGroups(data.Groups);
    });
  }, []);

  return (
    <Layout token={token}>
      <div className="flex flex-col">
        <div className="p-24 sm:p-10 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
          <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
            <span className="flex items-end" delay="300">
              <a className="text-3xl font-bold fnt-fmly">Home Page</a>
            </span>
          </div>
        </div>
      </div>

      <Typography className='text-base ml-10 mb-2 mt-3 text-[#112715] fnt-fmly'> My Groups </Typography>
      <div className='flex items-center justify-center'>
        <Box className='rounded-2xl flex justify-start flex-row'
            sx={{
                width: 20/21,
                height: 220,
                backgroundColor: '#f6f9fb',
            }}
        >
          {myGroups.map(group => (
        <Link href={"/app/workspace/" + group.id} style={{textDecoration: 'none'}} key={group.id}>
          <Box className='rounded-2xl ml-5 mt-10 flex flex-col items-center justify-center'
            key={group.id}
            sx={{
                width: 140,
                height: 140,
                backgroundColor: '#ffffff',
            }}
          >
            <div>
                <span className='text-[#bdbdbd] text-lg flex justify-center text-center fnt-fmly mt-2'>
                  
                  <MdGroups size={60} className='-mt-1 text-[#bdbdbd]'/>
                  <Box className="absolute left-auto ml-24 bottom-12 rounded text-xs font-semibold fnt-fmly text-[#bdbdbd] w-8 h-4"
                    sx={{
                        zIndex: '1',
                    }}
                  >
                  </Box>
                </span>
              <span className='text-[#112715] text-base flex justify-center text-center mt-3 fnt-fmly'>
                    {group.name}
              </span>
            </div>
          </Box>
        </Link>
          ))}
        </Box>
      </div>
    </Layout>
  );
}

export async function getServerSideProps (context) {
  const token = await getToken({ req:context.req , secre:process.env.NEXTAUTH_JWT_SECRET});
  return {
      props: {token: token}
  }
}