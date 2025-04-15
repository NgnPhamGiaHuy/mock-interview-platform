import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";

const InterviewDetailsPage = async ({ params } : RouteParams) => {
    const { id } = await params;
    
    const user = await getCurrentUser();
    
    const interview = await getInterviewById(id);
    
    if (!interview) redirect("/");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });
    
    return (
        <>
            <div className={"flex flex-row justify-between gap-4"}>
                <div className={"flex flex-row max-sm:flex-col items-center gap-4"}>
                    <div className={"flex flex-row items-center gap-4"}>
                         <Image src={getRandomInterviewCover()} alt={"Cover image"} width={40} height={40} className={"size-[40px] rounded-full object-cover"}/>
                        <h3 className={"capitalize"}>
                            { interview.role }
                        </h3>
                    </div>
                    <DisplayTechIcons techStack={interview.techstack}/>
                </div>
                <p className={"h-fit px-4 py-2 capitalize rounded-lg bg-dark-200"}>{ interview.type }</p>
            </div>
            <Agent userName={user?.name!} userId={user?.id} interviewId={id} feedbackId={feedback?.id} type={"interview"} questions={interview.questions} />
        </>
    )
}
export default InterviewDetailsPage
