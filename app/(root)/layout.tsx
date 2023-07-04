import prismaDB from '@/lib/prismaDB';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

async function SetupLayout({children}: {children: React.ReactNode}) {

    const {userId} =  auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const store = await prismaDB.store.findFirst({
        where: {
            userId
        }
    })

    if(store) {
        redirect(`/${store.id}`);
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default SetupLayout
