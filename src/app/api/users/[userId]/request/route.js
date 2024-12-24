import User from "@/models/userModel";
import { dbconnect } from "@/dbConfig/dbconnect";
import { getDataFromToken } from "@/utils/getDataFromToken";


export async function POST(req, { params }) {
  try {
    await dbconnect();
    const { userId } = params;

    // Get logged-in user ID from token
    const loggedInUserId = getDataFromToken(req);
    // console.log("----------->",loggedInUserId)
    // console.log("----------->",userId)
    if (!loggedInUserId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Ensure user cannot send a request to themselves
    if (loggedInUserId === userId) {
      return new Response(JSON.stringify({ message: "Cannot send request to yourself" }), { status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Check if request already exists
    if (user.requests.includes(loggedInUserId)) {
      return new Response(JSON.stringify({ message: "Request already sent" }), { status: 400 });
    }

    // Add the request to the user's requests array
    user.requests.push(loggedInUserId);
    await user.save();

    return new Response(JSON.stringify({ message: "Request sent successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}




// import User from "@/models/user";
// import { connectToDatabase } from "@/utils/db";
// import { getDataFromToken } from "@/utils/getDataFromToken";

export async function GET(req, { params }) {
  try {
    await dbconnect();
    const { userId } = params;

    const loggedInUserId = getDataFromToken(req);
    if (!loggedInUserId || loggedInUserId !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const user = await User.findById(userId).populate("requests", "username email");
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user.requests), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
