'use client';

import { useState, useRef, ChangeEvent  } from "react";
import { OutlineButton, PrimaryButton } from "@/app/ui/buttons";
import Image from 'next/image';
import uploadIcon from '@/public/icons/upload.svg';
import uploadedIcon from '@/public/icons/uploaded.svg';

export default function Details() {
    const [disabled, setDisabled] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        console.log(selectedImage);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-0 m-5 rounded-lg">
            <div className="min-h-[70vh] rounded-t-lg px-6 space-y-5">
                <div className="flex flex-col gap-10">
                    <div className="space-y-3">
                        <h1 className='font-bold text-2xl text-black'>Profile Details</h1>
                        <p className="text-md text-darkGrey">Add your details to create a personal touch to your profile.</p>
                    </div>
                </div>

                <div className="p-5 text-darkGrey bg-lightGrey space-y-8 block lg:grid lg:grid-cols-3 lg:justify-items-start lg:place-items-center">
                    <h3>Profile picture</h3>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    <button onClick={handleButtonClick}
                    className="relative overflow-hidden h-48 w-48 bg-lightPrimary font-bold rounded-lg text-primary">
                        {
                            selectedImage ? (
                                <div className="">
                                    <Image
                                    src={selectedImage}
                                    alt="Preview"
                                    layout="fill"
                                    objectFit="cover"
                                    unoptimized
                                    />
                                    <span className='flex-col absolute top-0 z-10 w-full h-full bg-[#000] flex items-center gap-4 justify-center bg-opacity-50 text-white left-0 bg-[]'>
                                        <Image src={uploadedIcon} alt="Upload" />
                                        Change Image
                                    </span>
                                </div>
                            ) : (
                                <span className="flex flex-col items-center justify-center gap-4">
                                    <Image src={uploadIcon} alt="Upload" />
                                    + Upload Image
                                </span>
                            )
                        }
                    </button>

                    <p className="text-xs">
                        Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                </div>

                <form className="space-y-3 text-darkGrey text-sm p-5 bg-grey/10 rounded-md">
                <div className="flex-1">
                    <div className="w-full">
                    <div className="block lg:grid lg:grid-cols-3">
                        <label
                        className="mb-3 mt-5 block font-normal col-span-1"
                        htmlFor="firstname"
                        >
                        First name*
                        </label>
                        <div className="relative lg:col-span-2">
                        <input
                            className="peer block w-full rounded-md border border-grey py-3 px-4 text-sm autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                            id="firstname"
                            type="text"
                            name="firstname"
                            placeholder="Ben"
                            required
                        />
                        </div>
                    </div>
                    <div className="mt-4 block lg:grid lg:grid-cols-3">
                        <label
                        className="mb-3 mt-5 block text-xs font-normal"
                        htmlFor="lastname"
                        >
                        Last name*
                        </label>
                        <div className="relative lg:col-span-2">
                        <input
                            className="peer block w-full rounded-md border border-grey py-3 px-4 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                            id="lastname"
                            type="text"
                            name="lastname"
                            placeholder="Wright"
                            required
                        />
                        </div>
                    </div>
                    <div className="mt-4 block lg:grid lg:grid-cols-3">
                        <label
                        className="mb-3 mt-5 block text-xs font-normal"
                        htmlFor="lastname"
                        >
                        Email
                        </label>
                        <div className="relative lg:col-span-2">
                        <input
                            className="peer block w-full rounded-md border border-grey py-3 px-4 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="ben@example.com"
                            required
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </form>
            </div>
            <div className="rounded-b-lg w-full flex justify-end border-t p-6">
                <PrimaryButton className="w-full flex justify-center lg:w-[10vw] lg:self-end" aria-disabled={disabled}>Save</PrimaryButton>
            </div>
        </div>
    )
}