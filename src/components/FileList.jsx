"use client";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton"; 
import { useState } from "react";

export function FileList({ files, setFiles, loading }) {
    const [editingFile, setEditingFile] = useState(null);
    const [newFileName, setNewFileName] = useState("");


    const openEditModal = (file) => {
        setEditingFile(file);
        setNewFileName(file.pathname);
    };

    const onSave = () => {
        const updatedFiles = files.map(file => {
            if (file.url === editingFile.url) {
                return { ...file, pathname: newFileName };
            }
            return file;
        });

        setFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
        setEditingFile(null);
    };

    const handleClose = () => {
        setEditingFile(null);
    };


    const onDelete = (file) => {
        setFiles(files.filter(f => f.url !== file.url));
        localStorage.setItem('uploadedFiles', JSON.stringify(files.filter(f => f.url !== file.url)));
    };


    return (
        <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">
                File List
            </h3>

            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            ) : (
                !files || files.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center p-10">
                        No files uploaded yet
                    </p>
                ) : (
                    <ol className="space-y-5">
                        {files.map(file => (
                            <li key={file.url} className=" bg-slate-200 flex items-center justify-between space-x-2 p-2 rounded-md">
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    {file.pathname}
                                </a>
                                <div className="space-x-2">
                                    <a href={file.downloadUrl} download>
                                        <Button>Download</Button>
                                    </a>
                                    <Button variant="outline" size="icon" onClick={() => openEditModal(file)}>
                                        <Pen className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => onDelete(file)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ol>
                )
            )}
            

            <Dialog open={Boolean(editingFile)} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit File</DialogTitle>
                        <DialogDescription>
                            Edit the file name below
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <DialogFooter>
                        <Button onClick={onSave}>Save</Button>
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
