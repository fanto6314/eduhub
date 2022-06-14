import Layout from '../../../src/ui/components/layout';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {getToken} from "next-auth/jwt";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useStyles = makeStyles (theme => ( {
    TextField: {
        '& label.Mui-focused': {
            color: '#0fb13a',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#0fb13a',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#0fb13a',
            },
            '&:hover fieldset': {
              borderColor: '#0fb13a',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0fb13a',
            }
        },
        '& label.Mui-focused': {
            color: 'white',
        }
    },
    floatingLabelFocusStyle: {
        color: "white"
    },
}));

async function joinGroup(id, code) {
    const axios = require('axios');
    let data = JSON.stringify({
        "code": code
    });

    let config = {
    method: 'post',
    url: 'http://localhost:3000/api/group/'+id+'/users',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    let response = await axios(config);
    return response.data;
}

export default function Join({token}) {
    const classes = useStyles();
    const router = useRouter();

    return (
        // <div className="grid grid-cols-2 divide-x h-full">
        //     <div className='bg-red-200'>1</div>
        //     <div className="bg-[url('https://i.imgur.com/Mpn1BSi.png')]">
                
        //     </div>
        // </div>
        <Layout token={token}>
            <div className='flex items-center justify-center mt-10'>
                <Box className='rounded-2xl'
                    sx={{
                        width: 500,
                        height: 700,
                        backgroundColor: '#183d1f',
                    }}
                >
                    <span className='text-[#0fb13a] text-2xl flex itemps-center justify-center text-center mt-10'>
                        EduHub
                    </span>
                    <span className='text-white text-lg flex itemps-center justify-center text-center fnt-fmly mt-10'>
                        Enter the code that was gave to <br />you by a workspace Administrator
                    </span>
                    <span className='text-white text-base flex itemps-center justify-center text-center fnt-fmly mt-10'>
                        Example:
                    </span>
                    <span className='text-white text-base flex itemps-center justify-center text-center fnt-fmly mt-3'>
                        <em>fb214090-2274-4227-a290-c46e72ed1a55</em>
                    </span>
                    <span className='flex items-center justify-center mt-12'>
                        <TextField
                            id="group-id"
                            label="Group ID"
                            variant="outlined"
                            margin="normal"
                            className={classes.TextField}
                            color="success"
                            autoFocus
                            sx={{ 
                                width: '35ch',
                                input: {
                                    color: 'white',
                                },
                                color: 'white'
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </span>
                    <span className='flex items-center justify-center'>
                        <TextField
                            id="join-code"
                            label="Join Code"
                            variant="outlined"
                            margin="normal"
                            className={classes.TextField}
                            color="success"
                            autoFocus
                            sx={{ 
                                width: '35ch',
                                input: {
                                    color: 'white',
                                },
                                color: 'white'
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </span>
                    <span className='flex items-center justify-center mt-3'>
                            <Button variant="contained" color="success" 
                                onClick={() => joinGroup(document.getElementById('group-id').value, document.getElementById('join-code').value).then(router.push('/app/'))}
                            >
                                Join
                            </Button>
                    </span>
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