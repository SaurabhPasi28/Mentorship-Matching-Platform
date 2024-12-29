import User from "@/models/userModel";
import { dbconnect } from "@/dbConfig/dbconnect";
import { getDataFromToken } from "@/utils/getDataFromToken";

export async function POST(req, { params }) {
  try {
    await dbconnect();
    const { userId } = await params;
    const loggedInUserId = getDataFromToken(req);

    if (!loggedInUserId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { action } = await req.json(); // Expecting { action: "accept" | "reject" }

    // Fetch the logged-in user's profile
    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser.requests.includes(userId)) {
      return new Response(JSON.stringify({ message: "No such request found" }), { status: 400 });
    }

    if (action === "accept") {
      // Move userId to connected array
      loggedInUser.connected.push(userId);
      const senderUser = await User.findById(userId);
      senderUser.connected.push(loggedInUserId);
      await senderUser.save();
    }

    // Remove the request from the requests array regardless of action
    loggedInUser.requests = loggedInUser.requests.filter((id) => id.toString() !== userId);
    await loggedInUser.save();

    return new Response(
      JSON.stringify({
        message: action === "accept" ? "Request accepted" : "Request rejected",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function GET(req, { params }) {
  try {
    await dbconnect();
    const { userId } = await params;

    const loggedInUserId = getDataFromToken(req);
    console.log(loggedInUserId)
    console.log(userId)
    if (!loggedInUserId || loggedInUserId !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const user = await User.findById(userId).populate("connected", "username email bio profilePicture");
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user.connected), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
