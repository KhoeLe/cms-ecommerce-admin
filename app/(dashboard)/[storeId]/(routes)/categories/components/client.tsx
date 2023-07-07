
"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { useParams ,useRouter} from "next/navigation";
import { CategoriesColumn, columns } from "../[categoryId]/components/columns";
import ApiList from "@/components/ui/api-list";
interface Props {
  data: CategoriesColumn[]
}

function CategoryClient({data}: Props) {
  const router = useRouter();
  const params = useParams();

  const onClick = ()=>{
    router.push(`/${params.storeId}/categories/new`)
  }


  return (
    <>
       <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage Categories for your store" />
        <Button onClick={onClick}>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}

export default CategoryClient
