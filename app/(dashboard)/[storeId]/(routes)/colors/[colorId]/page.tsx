import prismaDB from '@/lib/prismaDB'
import CategoryForm from './components/ColorForm'

interface Props{
  params :  {colorId: string}
}

async function BillBoardPage({params}:Props) {

  const color =  await prismaDB.color.findUnique({
    where:{
      id: params.colorId
    }
  })



  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryForm initialData={color} />
      </div>

    </div>
  )
}

export default BillBoardPage
