"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [data, setData] = useState({
    email:'', lname:'', fname:'', password:''
  })
  const [error, setError] = useState(null);

  const handleChangeText = (e)=>{
    setData((prev)=>({
      ...prev,
        [e.target.name]:e.target.value,
        redirect:false
    }))
  }
  const router = useRouter();

  const handleLogin = async(e)=>{
    e.preventDefault();
    setError(null);
    try {
      const res = await signIn('credentials', data);
      if(res?.error){
        setError(res?.error)
      }
    } catch (err) {
      console.log(err);
      setError(err.message)
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
        <h1>Login</h1>
        <form onSubmit={handleLogin} className='content' >
            <input required onChange={handleChangeText} type="email" name="email" placeholder='enter email' />
            <input required onChange={handleChangeText} type="password" name="password" placeholder='enter password' />
            <button className='submit' >Login</button>
        </form>
        {
          error && <span style={{color:'crimson'}} >{error}</span>
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
        <Link href='/register' >
            <span className='goto' >Go to register page</span>
        </Link>
    </div>
  )
}

export default Login