import prismaDB from '@/lib/prismaDB'
import BillBoardForm from './components/BillBoardForm'

interface Props{
  params :  {billboardId: string}
}

async function BillBoardPage({params}:Props) {

  const billboard =  await prismaDB.billboard.findUnique({
    where:{
      id: params.billboardId
    }
  })

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillBoardForm initialData={billboard} />
      </div>

    </div>
  )
}

export default BillBoardPage
