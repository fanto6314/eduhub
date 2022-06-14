import React from 'react';
import Layout from '../../../../src/ui/components/layout';
import { useRouter } from 'next/router'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FiFolder, FiSave } from "react-icons/fi";
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { MdDelete } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import {getToken} from "next-auth/jwt";
import { useEffect } from 'react';

async function getMySubject(id) {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:3000/api/group/' + id,
    headers: { },
    withCredentials: true,
  };
  
  let response = await axios(config);
  return response.data;
}

async function newSubject(name, id) {
  const axios = require('axios');
  let data = JSON.stringify({
    "name": name
  });

  let config = {
    method: 'post',
    url: 'http://localhost:3000/api/group/'+id+'/subjects',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  let response = await axios(config);
  return response.data;
}

async function deleteSubject(id, subId) {
  const axios = require('axios');

  let config = {
    method: 'delete',
    url: 'http://localhost:3000/api/group/'+id+'/subjects/'+subId,
    headers: { }
  };

  let response = await axios(config);
  return response.data;
}

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

async function getCode(id) {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:3000/api/group/'+id+'/code',
    headers: { }
  };

  let response = await axios(config);
  return response.data;
}

async function deleteGroup(id) {
  var axios = require('axios');
  var data = '';
  
  var config = {
    method: 'delete',
    url: 'http://localhost:3000/api/group/' + id,
    headers: { },
    data : data
  };
  
  let response = await axios(config);
  return response.data;
  
}

const User = ({token, group, id}) => {
  const subjects = group.Subjects;
  const groupName = group.name;
  const router = useRouter();
  const deleteSubjectId = router.query.deleteSubject;

  const [me, setMe] = React.useState([]);
  const [code, setCode] = React.useState([]);

  useEffect(() => {
    getMe().then(data => {
      setMe(data);
    });
    getCode(id).then(data => {
      setCode(data.code);
    });
  }, [id]);

  useEffect(() => {
    if(deleteSubjectId) {
      deleteSubject(id, deleteSubjectId).then(data => {
        router.push('/app/workspace/'+id);
      })
    }
  }, [id, deleteSubjectId, router]);

  return(
    <Layout token={token}>
        <div className="flex flex-col">
          <div className="p-24 sm:p-10 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
              <span className="flex items-end" delay="300">
                <a className="text-3xl font-bold">{groupName} Subjects</a>
              </span>
            </div>
          </div>
        </div>

      <div className='flex items-center justify-star ml-5'>
        <Box className='rounded-2xl flex justify-start flex-row'
            sx={{
                width: 15/20,
                height: 220,
                backgroundColor: '#f6fbf7',
            }}
        >
          {subjects.map(subjects => {
              return (
                  <Box className='rounded-2xl ml-5 mt-10 flex flex-col items-center justify-center'
                  key={subjects.id}
                    sx={{
                        width: 140,
                        height: 140,
                        backgroundColor: '#ffffff',
                    }}
                  >
                    <div>
                      <div className='relative'>
                        <span className='text-[#bdbdbd] text-lg flex justify-center text-center fnt-fmly mt-2'>
                          <Link href={"/app/workspace/"+id+"/directory/"+subjects.id} style={{textDecoration: 'none'}}>
                            <FiFolder size={60} className='-mt-1 text-[#bdbdbd]'/>
                          </Link>
                          <Box className="absolute left-auto ml-24 bottom-12 rounded text-xs font-semibold fnt-fmly text-[#bdbdbd] w-8 h-4"
                            sx={{
                                zIndex: '1',
                            }}
                          >
                            <Link href={"/app/workspace/"+id+"?deleteSubject="+subjects.id} style={{textDecoration: 'none'}}>
                              <button>
                                <MdDelete size={20} className='-mt-14 ml-1 text-[#bdbdbd]'/>
                              </button>
                            </Link>
                            
                          </Box>
                        </span>
                        <Link href={"/app/workspace/"+id+"/directory/"+subjects.id} style={{textDecoration: 'none'}}>
                          <span className='text-[#112715] text-base flex justify-center text-center mt-3 fnt-fmly'>
                              {subjects.name}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Box>
              )
          })}
        </Box>
      </div>

        <div className='absolute -top-12 mt-56 right-0 mr-5 '>
          <Box className='rounded-2xl'
              sx={{
                  width: 350,
                  height: 600,
                  backgroundColor: '#f6fbf7',
              }}
          >
            <div className='mb-2'>
              <div className=''>
              <Typography className='text-base ml-7 text-[#112715] fnt-fmly'> Group Code: <Typography className='text-sm'>{code}</Typography></Typography>
              <Typography className='text-base ml-7 text-[#112715] fnt-fmly'> Group Id: {id} </Typography>
              </div>
              <div className=''>
              <Typography className='text-base ml-7 mt-5 text-[#112715] fnt-fmly'> Create Subject </Typography>
              </div>
              <TextField
                required
                id="subject-name"
                label="Name"
                defaultValue="name"
                size='small'
                sx={{ width: '150px' }}
                className="ml-7 mt-5"
              />
              <br />
              <Button
                className="bg-[#183d1f] text-white hover:bg-[#183d1f]/80"
                variant="contained"
                color="secondary"
                startIcon={<FiSave />}
                sx={{ marginTop: '20px', marginLeft: '28px' }}
                onClick={() => newSubject(document.getElementById('subject-name').value, id).then(router.push('/app/workspace/'+id))}
              >
                Create
              </Button>
              <Typography className='text-base ml-7 mt-5 text-[#112715] fnt-fmly'> Delete Group </Typography>
              <Button
                className="bg-[#d11515] text-white hover:bg-[#d11515]/80"
                variant="contained"
                color="secondary"
                startIcon={<FiSave />}
                sx={{ marginTop: '20px', marginLeft: '28px' }}
                onClick={() => deleteGroup( id).then(router.push('/app/workspace/'+id))}
              >
                Delete
              </Button>
            </div>
          </Box>
        </div>
    </Layout>
  )
}
export default User

export async function getServerSideProps (context) {
  const token = await getToken({ req:context.req , secre:process.env.NEXTAUTH_JWT_SECRET});
  const id = context.params.id;
  const group = await getMySubject(id);

  return {
      props: {token: token, id: id, group: group }
  }
}