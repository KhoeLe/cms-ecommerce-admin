import prismaDB from '@/lib/prismaDB'
import CategoryForm from './components/CategoryForm'

interface Props{
  params :  {categoryId: string, storeId: string}
}

async function BillBoardPage({params}:Props) {

  const category =  await prismaDB.category.findUnique({
    where:{
      id: params.categoryId
    }
  })

  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>

    </div>
  )
}

export default BillBoardPage
