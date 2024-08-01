
# File Upload Component with Custom Hook

This project contains a React component for file uploads with integration to Vercel Blob Storage, including error handling, persistent state management, and API interactions. The logic for handling file uploads has been encapsulated in a custom hook for better modularity and reusability.

## Features

- Upload files to Vercel Blob Storage
- Persist uploaded files using `localStorage`
- Display success or error alerts
- Load and display uploaded files on a separate page
- Custom hook `useFileUpload` to handle all upload-related logic


## Technologies

- Next.js
- React
- Vercel Blob Storage
- Tailwind CSS
- Shadcn/ui

## Installation

1.Clone the repository:

 ```sh
    git clone https://github.com/GerardoTurin/test-hire-digital-nextjs.git
    ```
2.Install dependencies:

    ```sh
        npm install
    ```

3.Initialize the project:
    
    ```sh
    npm npm run dev
    ```
4.Envarioment variables:
    BLOB_READ_WRITE_TOKEN=your_token
