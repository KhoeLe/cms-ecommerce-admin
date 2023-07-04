
"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { useParams ,useRouter} from "next/navigation";

function BillBoardClient() {
  const router = useRouter();
  const params = useParams();

  const onClick = ()=>{
    router.push(`/${params.storeId}/billboards/new`)
  }


  return (
    <>
       <div className="flex items-center justify-between">
        <Heading title={`Billboards (0})`} description="Manage billboards for your store" />
        {/* <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" /> */}
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}



    </>
  )
}

export default BillBoardClient
