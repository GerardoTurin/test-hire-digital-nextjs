import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

export function ErrorAlert({ message, onDismiss }) {
    return (
        <Alert variant="destructive" className="flex justify-between items-center">
            <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </div>
            <Button variant="ghost" onClick={onDismiss}>Dismiss</Button>
        </Alert>
    );
}
