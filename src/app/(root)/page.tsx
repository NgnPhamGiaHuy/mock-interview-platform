import React from "react"
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";

const HomePage = async () => {
    const user = await getCurrentUser();
    
    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id!),
        await getLatestInterviews({ userId: user?.id! }),
    ])

    const hasPastInterviews = userInterviews?.length! > 0;
    const hasUpcomingInterviews = latestInterviews?.length! > 0;
    
    return (
        <>
            <section className={"card-cta"}>
                <div className={"max-w-lg flex flex-col gap-6"}>
                    <h2>
                        Get Interview-Ready with AI-Powered Practice & Feedback
                    </h2>
                    <p className={"text-lg"}>Practice on real interview questions & get instant feedback</p>
                    <Button asChild={true} className={"max-sm:w-full btn-primary"}>
                        <Link href={"/interview"}>Start an Interview</Link>
                    </Button>
                </div>
                <Image src={"/robot.png"} alt={"robo-dude"} width={400} height={400} className={"max-sm:hidden"}/>
            </section>
            <section className={"mt-8 flex flex-col gap-6"}>
                <h2>Your Interviews</h2>
                <div className={"interviews-section"}>
                    { hasPastInterviews ? (
                        userInterviews?.map((interview, index) => (
                             <InterviewCard key={index} {...interview} />
                        ))
                    ) : (
                        <p>You haven&apos;t taken any interviews yet</p>
                    ) }
                </div>
            </section>
            <section className={"mt-8 flex flex-col gap-6"}>
                <h2>Take an Interview</h2>
                <div className={"interviews-section"}>
                    { hasUpcomingInterviews ? (
                        latestInterviews?.map((interview, index) => (
                            <InterviewCard key={index} {...interview} />
                        ))
                    ) : (
                        <p>There are no new interviews available</p>
                    ) }
                </div>
            </section>
        </>
    )
}
export default HomePage;
