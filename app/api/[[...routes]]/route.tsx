// @ts-nocheck
/** @jsxImportSource frog/jsx */

import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

import { abi } from '../abi'
import { baseSepolia } from 'viem/chains';
import { Button, Frog, TextInput, parseEther } from 'frog'
import { createWalletClient, getContract, http, parseUnits, createPublicClient } from "viem";
import { Box, Heading, Text, VStack, vars, Image } from './ui'
import axios from "axios";

function getTimeAgo(unixTimestamp: any) {
  const timestamp = unixTimestamp * 1000; // Convert Unix timestamp to milliseconds
  const now = Date.now();
  let seconds = Math.floor((timestamp - now) / 1000);
  const isFuture = seconds > 0;
  if (!isFuture) seconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeAgoString;
  // const isFuture = seconds > 0;

  console.log(seconds, " ", minutes, " ", hours, " ", days, " ",)

  if (isFuture) {
    if (days > 0) {
      timeAgoString = days === 1 ? `in ${days} day` : `in ${days} days`;
    } else if (hours > 0) {
      timeAgoString = hours === 1 ? `in ${hours} hour` : `in ${hours} hours`;
    } else if (minutes > 0) {
      timeAgoString = minutes === 1 ? `in ${minutes} minute` : `in ${minutes} minutes`;
    } else {
      timeAgoString = "in seconds"; // Handle cases very close to now (within seconds)
    }
  } else {
    // Logic for past dates remains the same
    if (days > 0) {
      timeAgoString = days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      timeAgoString = hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      timeAgoString = minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else {
      timeAgoString = "just now";
    }
  }

  return timeAgoString;
}

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
})

const wallet = createWalletClient({
  key: `${process.env.PRIVATE_KEY}`,
  chain: baseSepolia,
  transport: http(),
});

const contract = getContract({
  abi: abi,
  contract: `${process.env.SUBSCRIBTION_CONTRACT}`,
  walletClient: wallet,
  publicClient: wallet,
});

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
})

app.frame(`/`, async (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading>FrogUI. 🐸 </Heading>
          <Text color="text200" size="20">
            {c.frameData?.fid ? c.frameData.fid : "nulll."}
          </Text>
        </VStack>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter ypur farcaster name..." />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      <Button
                  action='/view/1'
                  >
      Next
    </Button>,
    ],
  
  })
})

app.frame(`/view/:frame/:story`, async (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  const { story, frame } = c.req.param()
  const frameID = frame;
  console.log(frame, " ", story)
  const nextPage = '/view/' + (parseInt(frameID) + 1).toString() + "/" + story;
  const previousPage = '/view/' + (parseInt(frameID) - 1).toString() + "/" + story;
  console.log(nextPage)
  let frameJson = ''
  if (story != ":story" && story) {
    frameJson = await axios.get(`https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/${story}`);
    console.log(frameJson.data)
  }

  function truncateString(str) {
    if (str.length <= 6) {
      return str; 
    }
    return str.slice(0, 3) + "..." + str.slice(-3); 
    }

  let pollSubmitted = 99;
  let data = -1;
  if (parseInt(frameID) > 0 && c.frameData) {
    // console.log(await contract.read.owner([]))
     data = await publicClient.readContract({
      address: `${process.env.SUBSCRIBTION_CONTRACT}`,
      abi: abi,
      functionName: 'fidToUserSubTimestamp',
      args: ["0xEB17c38ecE894A97c5cD0E5Be8a576F0f630450c", parseUnits(c.frameData?.fid?.toString(), "0")]
    })
    console.log("contract data ", parseInt(data))
  }
  const now_timestamp = ((new Date().getTime() / 1000) | 0)
  console.log("difference ", parseInt(now_timestamp) - parseInt(data))
  // console.log(parseInt(now_timestamp) - parseInt(data))

  if (parseInt(frameID) == 1) {
    return c.res({
      image: (
        <Box
          grow
          alignVertical="center"
          alignHorizontal="center"
          backgroundColor="background"
          padding="32"
        >
          <VStack gap="4">
            <Heading>{truncateString(frameJson.data.owner)}</Heading>
            <Text color="text200" size="20">
              Posted last time { getTimeAgo(parseInt(frameJson.data.timestamp))}.
              {/* Disappears {getTimeAgo(parseInt(frameJson.data.timestamp) + 86400)} */}
            </Text>
            <Text color="text200" size="20">
              { parseInt(now_timestamp) - parseInt(data) < 180 ? `You are already subscribed to ${truncateString(frameJson.data.owner)}` : `You don't have active subscribtion from  ${truncateString(frameJson.data.owner)}`}
            </Text>
          </VStack>
        </Box>
      ),
      intents: [
        <Button action={'/view/' + frameID + "/" + story}>Refresh</Button>,
        parseInt(now_timestamp) - parseInt(data) > 180 ? (
          <Button.Transaction target="/send-ether">Subscribe</Button.Transaction>
          // <Button action={'/view/' + frameID + "/" + story}>Refresh</Button>
        ) : (
          <Button action={nextPage}>View</Button>
        ),
      ],
    })
  } else if (parseInt(frameID) == 0) {
  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        alignHorizontal="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading>🎩 View Thegen Story 🎩</Heading>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action={nextPage}>
      Authorize
    </Button>,
    ],
  })
} else if (parseInt(frameID) > 1) {
  return c.res({
    image: (
      (frameJson.data.pages[parseInt(frameID - 2)].img ) ? (
        <Image src={`${frameJson.data.pages[parseInt(frameID - 2)].img}`} />
      ) : (
        <Box
        grow
        alignVertical="center"
        alignHorizontal="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading>{frameJson.data.pages[parseInt(frameID - 2)].question}</Heading>
        </VStack>
      </Box>
      )
    ),
    intents: [
      <Button action={previousPage}>Previous</Button>,
      (frameID - 1) >= frameJson.data.pages.length ? (
        <Button.Link href='https://my-second-frog.vercel.app'>Your Story</Button.Link>
      ) : (
        <Button action={nextPage}>Next</Button>
      ),
    ],
  })
} else {
  return c.res({
     image: (
       <Box
         grow
         alignVertical="center"
         alignHorizontal="center"
         backgroundColor="background"
         padding="32"
       >
         <VStack gap="4">
           <Heading>🐸</Heading>
         </VStack>
       </Box>
     ),
     intents: [
       <Button.Transaction target="/send-ether">Subscribe</Button.Transaction>,
     ],
   })
  }
})

app.transaction('/send-ether', (c) => {
  const { inputText } = c
  return c.contract({
    abi,
    chainId: `eip155:${baseSepolia.id}`,
      functionName: 'activateMointhSubscribtion',
    args: ["0xEB17c38ecE894A97c5cD0E5Be8a576F0f630450c", parseUnits(c.frameData?.fid?.toString(), "0")],
    to: `${process.env.SUBSCRIBTION_CONTRACT}`,
    value: parseEther("0"),//inputText?.toString()),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
