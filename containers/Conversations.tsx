import { Grid } from "@mui/material";
import React from "react";

interface propsOfConservations {
    search: React.ReactNode,
    convervations: React.ReactNode,
    children: React.ReactNode,
}

export const ConversationContainer = (props: React.PropsWithChildren<propsOfConservations>) => {
    return (
        <Grid container direction={"row"} spacing={0} style={{height:"100vh"}}>
            <Grid item xs={12} md={3} style={{textAlign:'center',borderRight:'1px solid'}}>
                {props.search && props.search}
                {props.convervations}
            </Grid>
            <Grid item md={9} style={{position:'relative'}}>{props.children}</Grid>
        </Grid>
    )
}