import { dbconnect } from "@/dbConfig/dbconnect";
import MentorshipRequest from "@/models/mentorshipModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

dbconnect();

export async function POST(request) {
    try {
        const { mentorId } = await request.json();
        const menteeId = getDataFromToken(request);

        // Create a new mentorship request
        const mentorshipRequest = new MentorshipRequest({
            mentee: menteeId,
            mentor: mentorId,
            status: "pending", // Initial status is 'pending'
        });

        await mentorshipRequest.save();

        return NextResponse.json({
            message: "Mentorship request sent successfully",
            data: mentorshipRequest,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const menteeId = getDataFromToken(request);

        // Fetch all requests where the mentee is the requester
        const mentorshipRequests = await MentorshipRequest.find({ mentee: menteeId });

        return NextResponse.json({
            message: "Your mentorship requests",
            data: mentorshipRequests,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
