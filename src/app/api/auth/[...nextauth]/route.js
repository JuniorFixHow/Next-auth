import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/utils/db';
import User from '@/models/Users';

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            id:'credentials',
            name:'Credentials',

            async authorize(credentials){
                await connectDB();

                try {
                    const {email, password} = credentials;
                    const user = await User.findOne({email});
                    if(user){
                        const checkPassword = await bcrypt.compare(password, user.password);
                        if(checkPassword){
                            return user;
                        }
                        else{
                            throw new Error('Incorrect email or password');
                        }
                    }
                    else{
                        throw new Error('Incorrect email or password');
                    }
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        })
    ],

    callbacks:{
        async session({session}){
            try {
                const sessionUser = await User.findOne({email:session.user.email});
                if(sessionUser){
                    const sesData = {
                        _id:sessionUser._id,
                        email:sessionUser.email,
                        lname:sessionUser.lname,
                        fname:sessionUser.fname,
                    }

                    session.user = sesData;
                    return session;
                }
            } catch (error) {
                console.log(error);
                return false
            }
        },

        async signIn({profile, credentials}){
            await connectDB();
            try {
                const userEmail = profile?.email || credentials?.email;
                const userExists = await User.findOne({email:userEmail});
                
                if(!userExists && profile){
                    await User.create({
                        email:profile?.email,
                        lname:profile?.family_name,
                        fname:profile?.given_name,
                        password: 'dshsdjhvxcv'
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },

    pages:{
        error:'/login'
    }
})

export {handler as GET, handler as POST}