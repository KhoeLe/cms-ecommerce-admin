import Navbar from '@/components/Navbar';
import prismaDB from '@/lib/prismaDB';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'



interface Props {
    children: React.ReactNode
    params: {storeId: string}
}

function DashBoardLayout({children, params}: Props) {

    const {userId} = auth();

    if(!userId) {
        redirect('/sign-in');
    }


    const store =  prismaDB.store.findFirst({
        where: {
            id: params.storeId,
        userId,
        }
    })

    if(!store) {
        redirect('/');
    }

  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default DashBoardLayout
