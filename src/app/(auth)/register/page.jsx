"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

const Register = () => {
  const [data, setData] = useState({
    email:'', lname:'', fname:'', password:''
  })
  const [error, setError] = useState(false);

  const handleChangeText = (e)=>{
    setData((prev)=>({
      ...prev,
        [e.target.name]:e.target.value,
    }))
  }
  const router = useRouter();

  const handleRegister=async(e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch('/api/auth/register', {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      res.status === 201 && router.push('/login');
    } catch (error) {
      setError(true);
    }
  }


  const session = useSession();

  if(session.status === 'loading'){
    return(
      <div style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center', display:'flex'}} >
        <h1 style={{ta:'center'}} > Connecting... </h1>
      </div>
    )
  }
  else if(session.status === 'authenticated'){
    router.push('/');
  }

  return (
    <div className='login' >
        <h1>Register</h1>
        <form onSubmit={handleRegister} className='content' >
            <input required onChange={handleChangeText} type="email" name="email" placeholder='enter email' />
            <input required onChange={handleChangeText} type="text" name="fname" placeholder='enter first name' />
            <input required onChange={handleChangeText} type="text" name="lname" placeholder='enter last name' />
            <input required onChange={handleChangeText} type="password" name="password" placeholder='enter password' />
            <button className='submit' >Sign up</button>
        </form>
       {
         error && <span style={{color:'crimson'}} >Something went wrong. Retry</span>
       }
        <div onClick={()=>signIn('google')} className='google'>
            <Image  src={'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'} 
            alt='google'
            // className={styles.gimg}
            width={40}
            height={40}
            />
            <h4 >Login with Google</h4>
        </div>
        <Link href='/login' >
            <span className='goto' >Go to login page</span>
        </Link>
    </div>
  )
}

export default Register