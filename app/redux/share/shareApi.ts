import { HttpStatusCode } from "axios";
import { api } from "../baseApi"
import { RNS_TWITTER_PROXY } from "@/services/endpoints";

export interface Request {
    token?: string,
}

export interface TweetRequest extends Request {
    tweetId?: string
}

export interface WehbookRequest {
    futurePass?: string
}

export interface UserResponse {
    status?: HttpStatusCode,
    isSuccess: boolean,
    data?: {
        id: string,
        name: string,
        username: string
    }
}

export interface TweetResponse {
    status?: HttpStatusCode,
    isSuccess: boolean,
    data?: any
}

/** 
 * TODO: This should be in .env.local
 * Porcini Webhooks
 */
const webHook = "https://webhook.futurequest.cloud/callback/51893b7f-6c06-449b-8e20-bc01853f09c9"
const apiKey = "947dcdaf4c125a1984acfa93"

export const shareApi = api.injectEndpoints({
    endpoints: (builder) => ({
        triggerWebhook: builder.mutation<{}, WehbookRequest>({
            query: ({ futurePass }) => ({
                url: webHook,
                method: 'POST',
                data: {
                    "end_user_id": futurePass,
                    "end_user_type": "FUTUREPASS"
                },
                headers: {
                    "x-api-key": apiKey,
                    "Content-Type": "application/json",
                },
            }),
        }),
        getUserDetails: builder.query<UserResponse, Request>({
            query: () => ({
                url: `${RNS_TWITTER_PROXY}/users/me`,
                method: 'GET',
                credentials: "include",
            }),
        }),
        getTweetById: builder.query<TweetResponse, TweetRequest>({
            query: ({ tweetId }) => ({
                url: `${RNS_TWITTER_PROXY}/tweets/${tweetId}`,
                method: 'GET',
                credentials: "include",
            }),
        }),
    })
})

export const {
    useGetUserDetailsQuery,
    useGetTweetByIdQuery,
    useTriggerWebhookMutation
} = shareApi