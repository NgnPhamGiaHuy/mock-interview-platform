import React from 'react'
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt } : InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");
    
    return (
        <div className={"w-[360px] max-sm:w-full min-h-96 card-border"}>
            <div className={"card-interview"}>
                <div>
                    <div className={"w-fit px-4 py-2 top-0 right-0 rounded-bl-lg bg-light-600 absolute"}>
                        <p className={"badge-text"}>
                            { normalizedType }
                        </p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt={"cover image"} width={90} height={90} className={"size-[90px] rounded-full object-fit"}/>
                    <h3 className={"mt-5 capitalize"}>{ role } Interview</h3>
                    <div className={"mt-3 flex flex-row gap-5"}>
                        <div className={"flex flex-row gap-2"}>
                            <Image src={"/calendar.svg"} alt={"calendar"} width={22} height={22}/>
                            <p>{ formattedDate }</p>
                        </div>
                        <div className={"flex flex-row items-center gap-2"}>
                            <Image src={"/star.svg"} alt={"star"} width={22} height={22}/>
                            <p>{ feedback?.totalScore || "---" }</p>
                        </div>
                    </div>
                    <p className={"mt-5 line-clamp-2"}>
                        { feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills." }
                    </p>
                </div>
                <div className={"flex flex-row justify-between"}>
                    <DisplayTechIcons techStack={techstack}/>
                    <Button className={"btn-primary"}>
                        <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                            { feedback ? "Check Feedback" : "View Interview" }
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default InterviewCard
