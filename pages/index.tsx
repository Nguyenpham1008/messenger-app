import type { NextPage } from "next";
import {  useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import Account from "./components/Account";

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<{id: number, name: string}[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/accounts",
      
    })
      .then((res) => {
        setAccounts(res.data)
        setIsLoading(false)
      })
      .catch(() => {
        console.log('fail api')
      });

  }, []);
  if(isLoading) return <CircularProgress />
  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '50px'}}>
    <h2>Select an Account</h2>
    {accounts.map(item => <div key={item.id}> <Account name={item.name} email='user@gmail.com' /></div> )}
    </div>;
};

export default Home;
