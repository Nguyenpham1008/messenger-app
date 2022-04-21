import { ArrowBack, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { FC } from "react";

export const SearchConversation: FC<{}> = () => {
  return (
    <Box sx={{ p:1,textAlign:'left',display:'flex' }}>
      <IconButton sx={{ color: 'action.active', mr: 1 }} >
          <ArrowBack/>
      </IconButton>
      <TextField
        placeholder="Search conversation ... "
        size="small"
        fullWidth
        style={{paddingRight:"20px"}}
        className={"inputRounded"}
        InputProps={
        {
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
