import User from '@/models/Users';
import { connectDB } from '@/utils/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async(request)=>{
    const {email, fname, lname, password} =  await request.json();

    await connectDB();

    try {
        const user = await User.findOne({email});
        if(!user){
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({
                email, lname, fname, password:hash
            })
            const savedUser = await newUser.save();
            return new NextResponse(JSON.stringify(savedUser), {status:201})
        }
        else{
            return new NextResponse('User exists already', {status:422});
        }
    } catch (error) {
        return new NextResponse(error.message, {status:500});
    }
}