import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "./apialert";

interface Props {
    entityName: string;
    entityIdName: string;
}

function ApiList({ entityName, entityIdName }: Props) {
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`;

    return (
        <>
            <ApiAlert
                title="GET"
                description={`${baseUrl}/${entityName}`}
                variant="public"
            />
            <ApiAlert
                title="GET"
                description={`${baseUrl}/${entityName}/{$${entityIdName}}`}
                variant="public"
            />
            <ApiAlert
                title="POST"
                description={`${baseUrl}/${entityName}`}
                variant="admin"
            />
            <ApiAlert
                title="PATCH"
                description={`${baseUrl}/${entityName}/{$${entityIdName}}`}
                variant="admin"
            />
            <ApiAlert
                title="DELETE"
                description={`${baseUrl}/${entityName}/{$${entityIdName}}`}
                variant="admin"
            />
        </>
    );
}

export default ApiList;
