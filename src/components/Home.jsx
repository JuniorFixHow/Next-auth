"use client"
import React from 'react';
import styles from './home.module.css';
import {signOut, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Main = () => {

  const router = useRouter();
  const session = useSession();


  if(session.status === 'loading'){
    return(
      <div style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center', display:'flex'}} >
        <h1 style={{ta:'center'}} > Connecting... </h1>
      </div>
    )
  }
  else if(session.status === 'unauthenticated'){
    router.push('/login');
  }

  // console.log(session.data.user)

  return (
    <div className={styles.main} >
      <h1>Home Page</h1>
      <div className={styles.container}>
        <h2 className={styles.name} >Hello {session.data.user.lname} </h2>
        <button onClick={()=>signOut()} className='submit' >Logout</button>
      </div>
    </div>
  )
}

export default Main