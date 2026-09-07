import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useFormDataMethod = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(null);

    /**
     * Send FormData or an object containing files and text to the server.
     * 
     * Supported calling signatures:
     * - sendFormData(endPoint, method, body, options)
     * - sendFormData(endPoint, body, options) -> defaults method to "POST"
     */
    const sendFormData = async (endPoint, arg2, arg3, arg4) => {
        let method = "POST";
        let body = null;
        let options = {};

        if (typeof arg2 === "string" && ["POST", "PUT", "PATCH", "DELETE"].includes(arg2.toUpperCase())) {
            method = arg2.toUpperCase();
            body = arg3;
            options = arg4 || {};
        } else {
            body = arg2;
            options = arg3 || {};
        }

        if (!body) return null;

        setLoading(true);
        setMessage("");
        setStatus("idle");
        setAction(null);

        // Ensure payload is a FormData instance
        let formDataToSend = body;
        if (!(body instanceof FormData) && typeof body === "object" && body !== null) {
            formDataToSend = new FormData();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataToSend.append(key, value);
                }
            });
        }

        try {
            const headers = { ...(options.headers || {}) };
            // Let the browser set Content-Type with boundary for multipart/form-data
            if (headers["Content-Type"]) {
                delete headers["Content-Type"];
            }

            const response = await fetch(`${API_URL}${endPoint}`, {
                method: method,
                headers: headers,
                credentials: "include",
                body: formDataToSend
            });

            let result = {};
            try {
                result = await response.json();
            } catch {
                result = { message: response.statusText || "Unexpected response from server." };
            }

            if (!response.ok) {
                if (result.status === "validation") {
                    setStatus("validation");
                    setData(result.data || null);
                    setAction(result.action || null);
                    setMessage(result.message || "Validation error");
                    return {
                        success: "validation",
                        data: result.data || null,
                        message: result.message || "Validation error",
                        action: result.action || null
                    };
                }

                setStatus("fail");
                setData(null);
                setAction(result.action || null);
                setMessage(result.message || "Failed to process request.");
                return {
                    success: "fail",
                    data: null,
                    message: result.message || "Failed to process request.",
                    action: result.action || null
                };
            } else {
                setStatus("success");
                setAction(result.action || null);
                setData(result.data || null);
                setMessage(result.message || "Operation successful.");
                return {
                    success: "success",
                    data: result.data || null,
                    message: result.message || "Operation successful.",
                    action: result.action || null
                };
            }
        } catch (error) {
            console.error("Error sending FormData to server:", error);
            setStatus("fail");
            setData(null);
            setMessage(error.message || "Network error occurred.");
            return {
                success: "fail",
                data: null,
                message: error.message || "Network error occurred."
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        sendFormData,
        status_fd: status,
        message_fd: message,
        data_fd: data,
        action_fd: action,
        loading_fd: loading,
        // Standard aliases for flexibility
        status,
        message,
        data,
        action,
        loading
    };
};
