import prismaDB from "@/lib/prismaDB"

interface Props {
  params: {
    storeId: string
  }
}

async function DashboardPage({params} : Props) {

  const store = await prismaDB.store.findUnique({
    where: {
      id: params.storeId
    }
  })

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>StoreName : {store?.name}</h2>

    </div>
  )
}

export default DashboardPage
