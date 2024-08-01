"use client";
import { FileList } from "@/components/FileList";
import { useEffect, useState } from 'react';



export default function FilesListPage() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedFiles = localStorage.getItem("uploadedFiles");
        if (savedFiles) {
            setUploadedFiles(JSON.parse(savedFiles));
        }
    }, []);
    
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center">
                Files List Page
            </h1>
            <FileList 
                files={uploadedFiles} 
                setFiles={setUploadedFiles} 
                loading={loading}  
            />
        </div>
    );
}