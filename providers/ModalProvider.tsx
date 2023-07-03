"use client"

import StoreModal from "@/components/modal/StoreModal"
import { useEffect, useState } from "react"

function ModalProvider() {

    const [isMounted , setIsMounted] = useState<boolean>(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])

  if(!isMounted) return null

    return (
        <>
        <StoreModal /> 
        </>
    )
}

export default ModalProvider
