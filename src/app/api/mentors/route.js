import { dbconnect } from "@/dbConfig/dbconnect";
import MentorshipRequest from "@/models/mentorshipModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

dbconnect();

export async function GET(request) {
    try {
        // Get the mentor's ID from the token
        const mentorId = getDataFromToken(request);

        // Fetch all requests where the mentor is the recipient
        const mentorshipRequests = await MentorshipRequest.find({ mentor: mentorId });

        return NextResponse.json({
            message: "Mentorship requests fetched successfully",
            data: mentorshipRequests,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { requestId, status } = await request.json(); // status: 'accepted' or 'rejected'

        const mentorId = getDataFromToken(request);

        // Find the mentorship request and update its status
        const mentorshipRequest = await MentorshipRequest.findByIdAndUpdate(requestId, {
            status,
            mentorResponseAt: new Date(),
        });

        if (!mentorshipRequest) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: `Request ${status} successfully`,
            data: mentorshipRequest,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
