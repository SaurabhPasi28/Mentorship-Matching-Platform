import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Token data: ", decodedToken);

        return decodedToken.id;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("Token verification failed:-", error.message);
            const url = new URL("/login", request.url);
            // router.push("/login")
            url.searchParams.set("alert", "session_expired");
        }

        return null;
    }
};

