import { useState, useEffect, useRef } from 'react';

export function useFileUpload() {
    const [file, setFile] = useState(null);
    const [errorBigFile, setErrorBigFile] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState(null);
    const [user, setUser] = useState(null);
    const [apiError, setApiError] = useState(null);

    const saveFilesToLocalStorage = (files) => {
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
    };

    const loadFilesFromLocalStorage = () => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setUploadedFiles(JSON.parse(storedFiles));
        }
    };

    useEffect(() => {
        loadFilesFromLocalStorage();
    }, []);


    useEffect(() => {
        const savedFiles = localStorage.getItem("uploadedFiles");
        if (savedFiles) {
            setUploadedFiles(JSON.parse(savedFiles));
        }
    }, []);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
        }
    }, [uploadedFiles]);

    const addNewFile = async (evt) => {
        const selectedFile = evt.target.files[0];
        if (selectedFile.size > 5 * 1024 * 1024) {
            setErrorBigFile(true);
            setOpen(true);
            return;
        }

        setLoading(true);
        setFile(selectedFile);
        setErrorBigFile(false);

        try {
            const jokeData = await fetch('https://api.chucknorris.io/jokes/random').then(res => res.json());
            setJoke(jokeData);

            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadResponse = await fetch(`/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
                method: 'POST',
                body: selectedFile,
            });

            if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                const updatedFiles = [...uploadedFiles, result];
                setUploadedFiles(updatedFiles);
                saveFilesToLocalStorage(updatedFiles);

                const randomUserData = await fetch('https://randomuser.me/api/?nat=br').then(res => res.json());
                setUser(randomUserData);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            try {
                const apiFailed = await fetch('https://restcountries.com/v3.1/translation/argentina').then(res => res.json());
                setApiError(apiFailed);
            } catch (apiFailed) {
                console.error('Error fetching fallback API:', apiFailed);
            }
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const changeFile = () => {
        setOpen(false);
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (user || apiError) {
            const timer = setTimeout(() => {
                setUser(null);
                setApiError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [user, apiError]);

    return {
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
        setUploadedFiles,
        addNewFile,
        changeFile,
    };
}
