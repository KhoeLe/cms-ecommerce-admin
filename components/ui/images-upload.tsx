import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface Props {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    values: string[];
}
function ImageUpload({ disabled, onChange, onRemove, values }: Props) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (value: any) => {
        onChange(value.info.secure_url);
    };
    if (!isMounted) return null;

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {values.map((url, index) => (
                    <div
                        key={index}
                        className="relative w-[300px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button onClick={() => onRemove(url)}>
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            className="object-cover"
                            width={400}
                            height={400}
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="next-cloudinary-unsigned">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            type="button"
                            onClick={onClick}
                            variant="secondary"
                            disabled={disabled}>
                            <ImagePlus className="w-4 h-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;
