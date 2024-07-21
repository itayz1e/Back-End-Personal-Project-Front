export class ErrorsService {

    public getError(err: any) {

        if (typeof err === "string") return err;
        if (typeof err.error === "string") return err.error;

        if (Array.isArray(err.error)) {
            let allErrors = "";
            for (const item of err.error) {
                allErrors += item + "<br>";
            }
            return allErrors;
        }

        if (err.response?.data) return err.response.data;

        if (typeof err.message === "string") {
            if (err.message.startsWith("Network Error")) {
                return "The server is down or your network \n please try again.";
            }
            return err.message;
        }

        return "Some error occurred, please try again later.";

    }

    public getFormValidationErrors(formData: any): string[] {
        const errors: string[] = [];
    
        if (!formData.password) errors.push("Password is required");
        if (!formData.username) errors.push("Username is required");
        if (!formData.email) errors.push("Email is required");
        if (!formData.url) errors.push("Url is required");
        return errors;
    }
}
export const errorsService = new ErrorsService();

