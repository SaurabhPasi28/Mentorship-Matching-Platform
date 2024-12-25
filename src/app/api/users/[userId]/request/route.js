import User from "@/models/userModel";
import { dbconnect } from "@/dbConfig/dbconnect";
import { getDataFromToken } from "@/utils/getDataFromToken";

export async function POST(req, { params }) {
  try {
    await dbconnect();
    const { userId } =await params;

    const loggedInUserId = getDataFromToken(req);
    if (!loggedInUserId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (loggedInUserId === userId) {
      return new Response(JSON.stringify({ message: "Cannot send request to yourself" }), { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    if (user.requests.includes(loggedInUserId)) {
      return new Response(JSON.stringify({ message: "Request already sent" }), { status: 400 });
    }

    if (user.connected.includes(loggedInUserId)) {
      return new Response(JSON.stringify({ message: "Already connected" }), { status: 400 });
    }

    user.requests.push(loggedInUserId);
    await user.save();

    return new Response(JSON.stringify({ message: "Request sent successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function GET(req, { params }) {
  try {
    await dbconnect();
    const { userId } =await params;

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
