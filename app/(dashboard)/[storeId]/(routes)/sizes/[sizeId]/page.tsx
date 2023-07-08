import prismaDB from '@/lib/prismaDB'
import CategoryForm from './components/SizeForm'

interface Props{
  params :  {sizeId: string}
}

async function BillBoardPage({params}:Props) {

  const size =  await prismaDB.size.findUnique({
    where:{
      id: params.sizeId
    }
  })



  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryForm initialData={size} />
      </div>

    </div>
  )
}

export default BillBoardPage
