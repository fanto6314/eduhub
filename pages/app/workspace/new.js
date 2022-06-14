import Layout from '../../../src/ui/components/layout';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {getToken} from "next-auth/jwt";
import {useRouter} from "next/router";

async function newWorkspace(name) {
    var axios = require('axios');
    var data = JSON.stringify({
      "name": name
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3000/api/group',
      headers: {
        'Content-Type': 'application/json',
      },
      data : data
    };

    let response = await axios(config);
    return response.data;
}

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

export default function New({token, id}) {
    const router = useRouter();
    const classes = useStyles();

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
                        height: 600,
                        backgroundColor: '#183d1f',
                    }}
                >
                    <span className='text-[#0fb13a] text-2xl flex itemps-center justify-center text-center mt-10'>
                        EduHub
                    </span>
                    <span className='text-white text-lg flex itemps-center justify-center text-center fnt-fmly mt-10'>
                        Create a new workspace by entering a name,<br /> you will be the administrator of the workspace and<br /> you will be able to add other users once created.
                    </span>
                    <span className='flex items-center justify-center mt-12'>
                        <TextField
                            id="group-name"
                            label="Name"
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
                        <Button variant="contained" color="success" onClick={() => newWorkspace(document.getElementById('group-name').value,).then(router.push('/app/'))}>
                            Create
                        </Button>
                    </span>
                </Box>
            </div>
        </Layout>
    );
}

export async function getServerSideProps (context) {
    const token = await getToken({ req:context.req , secre:process.env.NEXTAUTH_JWT_SECRET});
    const id = context.query.id;
    return {
        props: {token: token}
    }
  }