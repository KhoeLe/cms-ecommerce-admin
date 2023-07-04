import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import SettingsForm from "./components/SettingsForm";

interface Props {
  params: {storeId: string}
}

async function SettingsPage({params}: Props) {

  const {userId} = auth();

  if(!userId) {
      redirect('/sign-in');
  }


  const store = await prismaDB.store.findFirst({
    where: {
        id: params.storeId,
        userId,
    }
})

if(!store) {
    redirect('/');
}

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
