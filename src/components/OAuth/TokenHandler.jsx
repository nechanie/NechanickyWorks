import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TokenHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Create a URLSearchParams object to work with the query string
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            // Store the token (e.g., in localStorage)
            localStorage.setItem("access_token", token);
            // Remove the token from the query string
            params.delete("token");

            // Construct the new search string without the token.
            const newSearch = params.toString();
            // Navigate to the same pathname with the updated query parameters.
            navigate({
                pathname: location.pathname,
                search: newSearch ? `?${newSearch}` : "",
            }, { replace: true });
        }
    }, [location, navigate]);

    return null; // This component doesn't render any UI
};

export default TokenHandler;