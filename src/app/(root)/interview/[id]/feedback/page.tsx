import React from 'react';
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId, getInterviewsById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

const FeedbackPage = async ({ params } : RouteParams) => {
    const { id } = await params;
    
    const user = await getCurrentUser();
    
    const interview = await getInterviewsById(id);
    
    if (!interview) redirect("/");
    
    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    })
    
    return (
        <div>FeedbackPage</div>
    )
}

export default FeedbackPage;
