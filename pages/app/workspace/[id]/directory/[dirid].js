import Layout from '../../../../../src/ui/components/layout';
import React from 'react';
import { useRouter } from 'next/router'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FiPlus, FiFolder, FiSave } from "react-icons/fi";
import { Typography } from '@mui/material';
import { AiOutlineFileText } from "react-icons/ai";
import Link from '@mui/material/Link';
import { MdDelete } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import {getToken} from "next-auth/jwt";
import { useEffect } from 'react';
import { useState } from 'react';
import AWS from 'aws-sdk';
import Image from 'material-ui-image';

async function getSubject(id, directory) {
    var axios = require('axios');
  
    var config = {
      method: 'get',
      url: 'http://localhost:3000/api/group/'+id+'/directory/'+directory,
      headers: { },
      withCredentials: true,
    };
    
    let response = await axios(config);
    return response.data;
}

async function getGroup(id) {
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

async function createFolder(name, id, directory) {
  const axios = require('axios');
  let data = JSON.stringify({
    "name": name,
    "parentId": directory
  });

  let config = {
    method: 'post',
    url: 'http://localhost:3000/api/group/'+id+'/directory',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  let response = await axios(config);
  return response.data;
}

async function deleteFolder(id, directory) {
  const axios = require('axios');

  let config = {
    method: 'delete',
    url: 'http://localhost:3000/api/group/'+id+'/directory/'+directory,
    headers: { }
  };

  let response = await axios(config);
  return response.data;
}

async function deleteFile(id, directory, file) {
  var axios = require('axios');

  var config = {
    method: 'delete',
    url: 'http://localhost:3000/api/group/'+id+'/directory/'+directory+'/file/'+file,
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

async function uploadFile(name, url, id, directory) {
  var axios = require('axios');
  var data = JSON.stringify({
    "name": name,
    "url": url
  });

  var config = {
    method: 'post',
    url: 'http://localhost:3000/api/group/'+id+'/directory/'+directory+'/file',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  let response = await axios(config);
  return response.data;

}

async function getDirectory(id, directory) {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:3000/api/group/'+id+'/directory/'+directory,
    headers: { }
  };

  let response = await axios(config);
  return response.data;
}

async function removeFromGroup(id, userId) {
  var axios = require('axios');

  var config = {
    method: 'delete',
    url: 'http://localhost:3000/api/group/'+id+'/users/'+userId,
    headers: { }
  };

  let response = await axios(config);
  return response.data;

}

export default function Folder({token, currenGroup, id, directory, accessKeyId, secretAccessKey}) {
  const currenGroupName = currenGroup.name;
  const router = useRouter();
  const deleteFolderId = router.query.deleteFolder;
  const deleteFileId = router.query.deleteFile;

  const [folders, setFolders] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [folderName, setFolderName] = React.useState(currenGroupName);
  const [members, setMembers] = React.useState([]);

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(accessKeyId);
  console.log(secretAccessKey);

  const S3_BUCKET ='s3-eduhub';
  const REGION ='eu-central-1';

  AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
  })

  const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET},
      region: REGION,
  })

  useEffect(() => {
    getSubject(id, directory).then(data => {
      setFolders(data.Child);
      setFiles(data.Files);
    })
  }, [id, directory]);

  useEffect(() => {
    getDirectory(id, directory).then(data => {
      setFolderName(data.name);
    })
  }, [id, directory]);

  useEffect(() => {
    if(deleteFolderId) {
      deleteFolder(id, deleteFolderId).then(data => {
        router.push('/app/workspace/'+id+"/directory/"+directory+"/");
      })
    }
  }, [id, deleteFolderId, directory, router]);

  useEffect(() => {
    if(deleteFileId) {
      deleteFile(id, directory, deleteFileId).then(data => {
        router.push('/app/workspace/'+id+"/directory/"+directory+"/");
      })
    }
  }, [deleteFileId, id, directory, router]);

  useEffect(() => {
    getGroup(id).then(data => {
      setMembers(data.Users);
    })
  }, [id]);

  const handleFileInput = (e) => {
      const file = e.target.files[0];

      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    myBucket.putObject(params)
        .send((err) => {
            if (err) console.log(err)
        })

      const uploadedFileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${file.name}`;
      uploadFile(file.name, uploadedFileUrl, id, directory);
  }
  
    return (
        <Layout token={token}>
        <div className="flex flex-col">
          <div className="p-24 sm:p-10 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
              <span className="flex items-end" delay="300">
                <a className="text-3xl font-bold">File Manager</a>
                <a className="text-lg text-[#6b8071] fnt-fmly ml-5">&gt; Workspace / {currenGroupName} / {folderName}</a>
              </span>
            </div>
            <div className="flex items-center">
              <Button
                className="bg-[#183d1f] text-white hover:bg-[#183d1f]/80"
                variant="contained"
                component="label"
              >
                <FiPlus size={24} className="mr-1" />
                Upload File
                <input type="file" onChange={handleFileInput} hidden/>
              </Button> 
            </div>
          </div>
        </div>
  
        <Typography className='text-base ml-10 mt-3 text-[#112715] fnt-fmly'> Folders </Typography>
        <div className='flex items-center ml-10'>
          <Box className='rounded-2xl flex justify-start flex-row'
              sx={{
                  width: 15/20,
                  height: 220,
                  backgroundColor: '#f6fbf7',
              }}
          >
            {folders.length>0 && folders.map(folder => {
              return (
            <Box className='rounded-2xl ml-5 mt-10 flex flex-col items-center justify-center'
              key={folder.id}
              sx={{
                  width: 140,
                  height: 140,
                  backgroundColor: '#ffffff',
              }}
            >
              <div>
                <div className='relative'>
                  <span className='text-[#bdbdbd] text-lg flex justify-center text-center fnt-fmly mt-2'>
                    <Link href={"/app/workspace/"+id+"/directory/"+folder.id} style={{textDecoration: 'none'}}>
                    <FiFolder size={60} className='-mt-1 text-[#bdbdbd]'/>
                    </Link>
                    <Box className="absolute left-auto ml-24 bottom-12 rounded text-xs font-semibold fnt-fmly text-[#bdbdbd] w-8 h-4"
                      sx={{
                          zIndex: '1',
                      }}
                    >
                      <Link href={"/app/workspace/"+id+"/directory/"+directory+"?deleteFolder="+folder.id}>
                        <MdDelete size={20} className='-mt-3 ml-2 text-[#bdbdbd]'/>
                      </Link>
                      
                    </Box>
                  </span>
                </div>
                <Link href={"/app/workspace/"+id+"directory/"+folder.id} style={{textDecoration: 'none'}}>
                <span className='text-[#112715] text-base flex justify-center text-center mt-3 fnt-fmly'>
                    {folder.name}
                </span>
                </Link>
              </div>
            </Box>
          )})}
    
          </Box>
        </div>
  
        <Typography className='text-base ml-10 mt-5 text-[#112715] fnt-fmly'> Files </Typography>
        <div className='flex items-center ml-10'>
          <Box className='rounded-2xl flex justify-start flex-row'
              sx={{
                  width: 15/20,
                  height: 220,
                  backgroundColor: '#f6fbf7',
              }}
          >
            {files.length>0 && files.map(file => {
              return (
            <Box className='rounded-2xl ml-5 mt-10 flex flex-col items-center justify-center'
              key={file.id}
              sx={{
                  width: 140,
                  height: 140,
                  backgroundColor: '#ffffff',
              }}
            >
              <div>
                <div className='relative'>
                  <span className='text-[#bdbdbd] text-lg flex justify-center text-center fnt-fmly mt-2'>
                    <Link href={file.url} style={{textDecoration: 'none'}} className="text-[#bdbdbd]">
                    <AiOutlineFileText size={60} className='-mt-1' />
                    <Box className="absolute -left-0.5 bottom-0 rounded text-xs font-semibold fnt-fmly text-white w-8 h-4"
                      sx={{
                          backgroundColor: file.fileTypeColor,
                          color: '#ffffff',
                          zIndex: '1',
                      }}
                    >
                      {file.fileType}
                    </Box>
                    </Link>
                    <Box className="absolute left-12 bottom-12 rounded text-xs font-semibold fnt-fmly text-[#bdbdbd] w-8 h-4"
                      sx={{
                          zIndex: '1',
                      }}
                    >
                      <Link href={"/app/workspace/"+id+"/directory/"+directory+"?deleteFile="+file.id} className="text-[#bdbdbd]">
                        <MdDelete size={20} className='-mt-3 ml-7'/> 
                      </Link>
                    </Box>
                  </span>
                </div>
                <Link href={file.url} style={{textDecoration: 'none'}}>
                <span className='text-[#112715] text-base flex justify-center text-center mt-3 fnt-fmly'>
                    {file.name}
                </span>
                </Link>
              </div>
            </Box>
          )})}
          </Box>
        </div>
        <div className='absolute -top-4 mt-56 right-0 mr-5 '>
          <Box className='rounded-2xl'
              sx={{
                  width: 350,
                  height: 600,
                  backgroundColor: '#f6fbf7',
              }}
          >
            <div className='mb-2'>
              <div className=''>
              <Typography className='text-base ml-7 text-[#112715] fnt-fmly'> Create Folder </Typography>
              </div>
              <TextField
                required
                id="folder-name"
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
                onClick={() => createFolder(document.getElementById('folder-name').value, id, directory).then(router.reload('/app/workspace/'+id+'/directory/'+directory+'/'))}
              >
                Create
              </Button>
              <Typography className='text-base ml-7 mt-5 text-[#112715] fnt-fmly'> Members </Typography>
              <div className='flex justify-start flex-row'>
                <ul className='list-none ml-4 mt-14'>
                  {members.map(member => {
                    return (
                      <li className='mt-2' key={members.id}>
                        <div className='flex flex-row items-center'>
                            <Image src="http://www.gravatar.com/avatar/?d=identicon" className='rounded-full w-8 h-8' alt='x'/>
                            <span className='ml-3 mr-2 text-base text-[#112715] fnt-fmly'>{member.name}</span>
                            <Button className='flex items-center'
                              onClick={() => removeFromGroup(id, member.id).then(router.reload('/app/workspace/'+id+'/directory/'+directory+'/'))}
                            ><MdDelete className='ml-auto text-sm -ml-2 text-red-600' size={20}/></Button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </Box>
        </div>
      </Layout>
    );
}

export async function getServerSideProps (context) {
    const token = await getToken({ req:context.req , secre:process.env.NEXTAUTH_JWT_SECRET});
    const directory = context.params.dirid;
    const id = context.params.id;
    const currenGroup = await getGroup(id);
    const accessKeyId = process.env.S3_ID;
    const secretAccessKey = process.env.S3_SECRET;

    return {
        props: {token: token, currenGroup: currenGroup, directory: directory, id: id, accessKeyId: accessKeyId, secretAccessKey: secretAccessKey},
    }
}