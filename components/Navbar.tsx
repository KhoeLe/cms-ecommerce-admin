import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import {redirect} from 'next/navigation'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'
import prismaDB from '@/lib/prismaDB'

async function Navbar() {

  const {userId} = auth();

  if(!userId){
    redirect('/sign-in')
  }
  const stores = await prismaDB.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className='border-b'>
      <div className="flex h-16 items-center px-4">

        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />

        <div className='ml-auto flex items-center space-x-4'>
            <UserButton  afterSignOutUrl='/'/>
        </div>


      </div>

    </div>
  )
}

export default Navbar
