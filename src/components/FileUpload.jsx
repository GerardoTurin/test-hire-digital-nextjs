"use client";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { FileList } from "./FileList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorAlert } from "./ErrorAlert";
import { useFileUpload } from "@/app/hooks/useFileUpload";

export function FileUpload() {

    const {
        file,
        errorBigFile,
        error,
        open,
        fileInputRef,
        uploadedFiles,
        loading,
        joke,
        user,
        apiError,
        setOpen,
        setUploadedFiles,
        addNewFile,
        changeFile,
    } = useFileUpload();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="file">Picture/File</Label>
                <Input id="file" type="file" className="cursor-pointer"  onChange={addNewFile} ref={ fileInputRef } />

                { errorBigFile &&
                    <AlertDialog
                        open={open}
                        onOpenChange={setOpen}
                        onEscapeKeyDown={() => setOpen(false)}  
                        onOutsideClick={() => setOpen(false)}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    File too large
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    The file you are trying to upload is too large. Please select a file that is smaller than 5MB.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={ changeFile }>
                                    Change file
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>

                    </AlertDialog>
                }

                {
                    loading && (
                        <Alert variant="success" className="space-y-2">
                            <AlertTitle>
                                Uploading...
                            </AlertTitle>
                            { joke?.icon_url && <Image src={joke.icon_url} alt="Chuck Norris" width={24} height={24} /> }
                            <AlertDescription>
                                {joke?.value}
                            </AlertDescription>
                        </Alert>
                    )
                }

                {
                    apiError && (
                        <Alert variant="destructive" className="space-y-2">
                            <AlertTitle className="font-bold">
                                Upload failed
                            </AlertTitle>
                            { apiError[0]?.flags && <Image src={apiError[0].flags.png} alt={apiError[0].flags.alt} width={100} height={100} /> }
                            <AlertDescription className="font-semibold">
                                {apiError[0]?.name.common} - {apiError[0]?.name.official}
                            </AlertDescription>
                        </Alert>
                    )
                }

                {
                    user && (
                        <Alert variant="complete" className="space-y-2">
                            <AlertTitle className="font-bold">
                                Upload completed
                            </AlertTitle>
                            { 
                                user?.results[0].picture.large && 
                                <Image 
                                    src={user.results[0].picture.large}
                                    className="rounded-full"
                                    alt="User" 
                                    width={100} 
                                    height={100} 
                                />
                            }
                            <AlertDescription className="font-semibold">
                                {user?.results[0].name.first} {user?.results[0].name.last} from {user?.results[0].location.country}
                            </AlertDescription>
                        </Alert>
                    )
                }
            </div>

            <div className="">
                {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
            </div>

            <div className="">
                <FileList 
                    files={uploadedFiles} 
                    setFiles={setUploadedFiles} 
                    loading={loading}  
                />
            </div>
        </div>
    );
}
