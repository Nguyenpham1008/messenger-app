import React, { FC } from "react";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const Account: FC<{name: string, email: string}> = ({name, email}) => {
    return <Button variant="outlined" sx={{   marginTop: "10px", borderRadius: '10px'}}>
                <div style={{display: 'flex', alignItems:'center', paddingRight: '50px'}}>
                    <Avatar src="/broken-image.jpg"  sx={{marginRight: '10px'}}/>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                        <h5 style={{margin: '5px'}}>{name}</h5>
                        <h6 style={{margin: '5px'}}>{email}</h6>
                    </div>
                    
                </div>  
            </Button>
}

export default Account