"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

/**
 * Creates a Firebase session cookie using the provided ID token and stores it in the request cookies.
 * This is used to maintain user sessions securely.
 *
 * @param idToken - Firebase ID token obtained after user signs in.
 */
export const setSessionCookie = async (idToken: string) => {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    });

    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    })
}

/**
 * Signs up a new user by creating a user document in Firestore if it doesn't already exist.
 *
 * @param params - An object containing uid, name, and email of the new user.
 * @returns An object indicating success or failure of the signup process.
 */
export const signUp = async (params: SignUpParams) => {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists. Please sign in instead.",
            }
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
        })

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        }
    } catch (error: any) {
        console.error("Error creating user:", error);

        if (error.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "This email is already in use."
            }
        }

        return {
            success: false,
            message: "Failed to create account. Please try again.",
        };
    }
}

/**
 * Signs in a user by verifying their existence via email and setting a session cookie.
 *
 * @param params - An object containing email and idToken of the user.
 * @returns An object indicating success or failure of the signin process.
 */
export const signIn = async (params: SignInParams) => {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "User does not exist. Create an account instead.",
            }
        }

        await setSessionCookie(idToken);

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Failed to log into an account",
        }
    }
}

/**
 * Retrieves the currently signed-in user based on the session cookie.
 *
 * @returns The user object if authenticated, otherwise null.
 */
export const getCurrentUser = async () : Promise<User | null> => {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Determines whether a user is currently authenticated based on the session cookie.
 *
 * This function delegates to `getCurrentUser` to verify if a valid user session exists.
 * It is typically used to protect server actions or gated UI components that require authentication.
 *
 * @returns {Promise<boolean>} True if a valid authenticated session exists, otherwise false.
 */
export const isAuthenticated = async () => {
    const user = await getCurrentUser();

    return !!user;
}

export const getInterviewsByUserId = async (userId: string) : Promise<Interview[] | null> => {
    const interviews = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
    
    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export const getLatestInterviews = async (params: GetLatestInterviewsParams): Promise<Interview[] | null> => {
    const { userId, limit = 20 } = params;
    
    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}