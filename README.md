# SHARE VIA TWITTER

## Setup Twitter Configurations

1. Create a Project via [Twitter Developer Portal](https://developer.x.com/en/portal/dashboard)

   > **Note:** Free plan only includes POST and DELETE /tweets and GET users/me endpoints. To be able to verify if a tweet has been posted using GET /tweets/:id, developers need to subscribe to a [Basic Plan](https://developer.x.com/en/portal/products/basic).

2. Setup Keys and Tokens

   > From the Project, navigate to Keys and Tokens tab and create the following:
   >
   > - API Key and Secret
   > - Bearer Token
   > - Access Token and Secret
   > - Client ID and Client Secret

3. Update User authentication settings
   > - **App permissions:** Read and write
   > - **Type of App:** Web App
   > - **App Info:**
   >   > **Callback URI / Redirect URL:** <br/> Only urls listed here will be allowed as redirect urls when the user performed twitter authentication
   >   >
   >   > - Production server url of your app (e.g https://api.rootnameservice.com)
   >   > - Add local server http://127.0.0.1:3001/ for development purpose.

## Setup Proxy Server - (Backend)

1. Setup Local Server - http://127.0.0.1:3001/ as Twitter does not support CORS

   > Here is a public repo that you may use as a guide:
   > [Share-Twitter-Server](https://github.com/rootnameservice/share-twitter-server)
   >
   > ```ts
   > // .env
   > NODE_ENV=development
   > CLIENT_ID={TWITTER_CLIENT_ID}
   > CLIENT_SECRET={TWITTER_CLIENT_SECRET}
   >
   > // After authentication, the server will redirect to this url
   > APP_DOMAIN=127.0.0.1
   > APP_ENDPOINT=http://127.0.0.1:3000/
   > ```

2. Run the local server using `npm run start`

## Setup Share App - (Frontend)

Here is a public repo that you may use as a guide: [Share-Identity](https://github.com/rootnameservice/share-identity) <br/>

```ts
# Sample .env.local file
# Rename this to .env
NEXT_PUBLIC_CHAIN_ID = 7672 #porcini
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = #wallet connect project id - temporarily remove wallet connect if not needed
NEXT_PUBLIC_TWITTER_API_CLIENT_ID = #client id generated from twitter dashboard
NEXT_PUBLIC_TWITTER_API_URL = http://127.0.0.1:3001 #local server

# Porcini
NEXT_PUBLIC_WEBHOOK_URL = #webhook url provided by
NEXT_PUBLIC_WEBHOOK_API = #webhook api provided by
```

```ts
pnpm install
pnpm run dev
```

Setup app with the following action buttons: `Link`, `Tweet`, `Verify`

1. ### **Link**

   > This will call Twitter Authentication Page
   >
   > _ShareRegistration.tsx / Line 92-103_ > **Note:** Make sure to pass the `scope`, the `state (data)` as part of the url and the `local server` as redirectUri
   >
   > ```ts
   > const redirectUri = `${process.env.NEXT_PUBLIC_TWITTER_API_URL}/auth/twitter`;
   > const clientId = process.env.NEXT_PUBLIC_TWITTER_API_CLIENT_ID;
   > const handleLink = () => {
   >   document.cookie = `isAccessRequested=${true}; path=/`;
   >   const scope = "tweet.read%20tweet.write%20users.read";
   >   const url = `${TWITTER_AUTH}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=modal-Share RNS&code_challenge=challenge&code_challenge_method=plain`;
   >   if (typeof window !== "undefined") {
   >     window.open(url, "_self");
   >   }
   > };
   > ```

2. ### **Tweet**

   > _ShareRegistration.tsx / Line 105-116_
   >
   > ```ts
   > const handleTweet = () => {
   >   const content =
   >     TWEETS_RNS[Math.floor(Math.random() * TWEETS_RNS.length)];
   >   const imageTweet = "https://t.co/x0QM05p4ia";
   >   const url = `http://twitter.com/intent/tweet?text=${encodeURIComponent(
   >     `${content} ${imageTweet}`
   >   )}`;
   >   if (typeof window !== "undefined") {
   >     window.open(url, "_blank");
   >   }
   > };
   > ```

3. ### **Verify**

   > _ShareRegistration.tsx / Line 118-127_ > <br/> **Note:** `useGetTweetByIdQuery` hook is listening to tweetId, so when the value of this changes, the query will run. Also, this hook will not run unless the user performed authentication through `LINK`
   >
   > ```ts
   > const handleVerify = () => {
   >   const pattern = new RegExp(/status\//g);
   >   const tweetId = link.toLowerCase().split(pattern)[1];
   >   if (tweetId) {
   >     setTweetId(tweetId);
   >   } else {
   >     setInvalidTweet("Invalid tweet url");
   >   }
   > };
   > ```
   >
   > _ShareRegistration.tsx / Line 70-88_ > <br/> Hook `useGetUserDetailsQuery` checks for access_token while `useGetTweetByIdQuery` will verify if the tweet has been posted.
   >
   > ```ts
   > const { data: userResponse } = useGetUserDetailsQuery(
   >   {},
   >   { skip: !isAccessRequested }
   > );
   >
   > const isGranted = !isEmpty(userResponse?.data?.id);
   >
   > // Skip this call when there is no tweetId and access_token provided
   > const {
   >   data: verifyResponse,
   >   isFetching: isVerifying,
   >   isSuccess: isVerified,
   >   isError: isVerifyFailed,
   > } = useGetTweetByIdQuery(
   >   { tweetId: tweetId || "" },
   >   { skip: !isGranted || isEmpty(tweetId) }
   > );
   > ```

4. ### Trigger Webhook after Verification

   > _ShareRegistration.tsx / Line 138_ and _shareApi.ts Line 38-51_ > <br/> **Note:** Webhook URL, Web API and FuturePass Address are required.
   >
   > ```ts
   > triggerWebhook({ futurePass: futurePassAddress });
   > ```

## How to test locally?

Since access_token only works when the App (frontend) and the server are both in the same domain, here is how the end to end local testing is done. Feel free to suggest another way ;)

1. Run the local server http://127.0.0.1:3001
2. From the App http://127.0.0.1:3000, authenticate twitter via `Link` Action
   > - This will route to twitter auth page, when the user approves, this will redirect to local server. <br/>
   > - The local server will then route to the App url and passing the access_token as a cookie
   > - To enable the Tweet and Verify Button, copy the `accessToken` from the Browser's Application
   > - Replace `token` with the `accessToken` in the following files in the local server
   >   > - app.controller.ts Line 24
   >   > - authGaurd.ts Line 16
   >   > - users.controller.ts Line 16
   > - Rerun the local server and refresh the app
