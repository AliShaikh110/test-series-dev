"use client";

import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { uploadSingleAction } from '@/data/actions/update-user-actions';
import { useRouter } from 'next/navigation';

const Add = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData(event.target);
        try {
            const result = await uploadSingleAction(formData);

            if (result?.uploadSuccess) {
                formRef.current?.reset();
                // toast.success(result.uploadSuccess);
                router.refresh();
            } else if (result?.uploadError) {
                setUploadError(result.uploadError);
                // toast.error(result.uploadError);
            }
        } catch (error: any) {
            setUploadError(error.message || 'Upload failed');
            // toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative inline-block">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    name="files"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.length) {
                            formRef.current?.requestSubmit();
                        }
                    }}
                    accept="image/*"
                />

                {/* Camera button */}
                <button
                    type="button"
                    onClick={handleCameraClick}
                    disabled={isUploading}
                    className=" bottom-01 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 translate-x-1/4 translate-y-1/4"
                >
                    {isUploading ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Camera className="w-3 h-3" />
                    )}
                </button>

                {/* Error message */}
                {uploadError && (
                    <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <span className="text-red-500 text-sm">{uploadError}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Add;