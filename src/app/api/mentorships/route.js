import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/utils/getDataFromToken';
import { MentorshipRequest } from '@/models/mentorshipModel';
import { User } from '@/models/userModel'; // Assuming user model is imported here

// Create a mentorship request (mentee -> mentor)
export async function POST(request) {
  try {
    const currentUserId = getDataFromToken(request); // Get the user ID from the token (mentee)
    const { mentorId } = await request.json(); // Mentor the mentee wants to request

    // Check if the mentor exists in the database
    const mentor = await User.findById(mentorId);
    if (!mentor) {
      return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
    }

    // Create a new mentorship request
    const newRequest = new MentorshipRequest({
      mentorId,
      menteeId: currentUserId,
      status: 'pending', // Default status is 'pending'
    });

    // Save the request to the database
    await newRequest.save();

    return NextResponse.json({ message: 'Request created successfully', data: newRequest });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Update the mentorship request status (mentor accepts or rejects)
export async function PUT(request) {
  try {
    const { mentorshipRequestId, status } = await request.json(); // Mentorship request ID and new status (accepted/rejected)

    // Validate the status
    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Find the mentorship request and update the status
    const mentorshipRequest = await MentorshipRequest.findById(mentorshipRequestId);
    if (!mentorshipRequest) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    // Update the status
    mentorshipRequest.status = status;
    await mentorshipRequest.save();

    return NextResponse.json({ message: `Request ${status}` });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Get all mentorship requests for a specific user (either mentee or mentor)
export async function GET(request) {
  try {
    const currentUserId = getDataFromToken(request); // Get the user ID from the token
    const path = new URL(request.url).pathname;
    let requests;

    if (path.includes('/mentees')) {
      // Get all mentorship requests for a specific mentee
      requests = await MentorshipRequest.find({ menteeId: currentUserId }).populate('mentorId', 'username email');
    } else if (path.includes('/mentors')) {
      // Get all mentorship requests for a specific mentor
      requests = await MentorshipRequest.find({ mentorId: currentUserId }).populate('menteeId', 'username email');
    }

    return NextResponse.json({ data: requests });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
