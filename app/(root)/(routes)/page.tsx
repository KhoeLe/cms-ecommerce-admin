"use client"
import { useStoreMal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetUpPage = () => {

   const [isOpen, openModal] = useStoreMal((state) => [
    state.isOpen,
    state.openModal,
   ]);

   useEffect(() => {
    if(!isOpen) openModal()
   }, [isOpen, openModal])

   return null;
};

export default SetUpPage;
