// "use client";

// import { useState, useEffect } from 'react'
import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from './page.module.css'
import axios from "axios";

// export async function generateMetadata(): Promise<Metadata> {
//   const frameTags = await getFrameMetadata(
//     `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
//   )
//   return {
//     other: frameTags,
//   }
// }

export default function Home() {

  // useEffect(() => {
  //   console.log("+++++++++++++++++")
  // }, [])

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     // let frameJson = await axios.get(`https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/${story}`);
  //     const frameJson = await axios.post('http://localhost:3000/api/add', {
  //       "frame": {
  //     "name": "Test",
  //     "pages": [
  //       {
  //         "question": "What is your name?",
  //         "img": "https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/QmPgNFac9gNcNCu47JNNiqArRp28FQ8fNTcoMv7p5nw4VG",
  //         "options": ["Alice", "Bob", "Charlie"]
  //       },
  //       {
  //         "question": "Lots of programming today, it was ton of work!",
  //         "options": ["Red", "Green", "Blue"]
  //       },
  //       {
  //         "question": "What is your favorite food?",
  //         "img": "https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/QmbJ2oA3vU89TFd5ejZ7mXFGHr9FUZG2FihjsZnuPT7UEH",
  //         "options": ["Pizza", "Pasta", "Salad"]
  //       }
  //     ],
  //     "correctOptions": ["Alice", "Green", "Salad"],
  //     "owner": "0xEB17c38ecE894A97c5cD0E5Be8a576F0f630450c"
  //   }
  //   });
  //     console.log('txhash', frameJson.data)
  //   };

  //   console.log('test')

  //   fetchDataAsync();
  // }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>
            Get started by editing!!!&nbsp;
            <code className={styles.code}>app/page.tsx</code>
          </p>
          <p>
            Head to{' '}
            <a
              href="/api/dev"
              style={{ display: 'inline', fontWeight: 'semibold' }}
            >
              <code className={styles.code}>localhost:3000/api</code>
            </a>{' '}
            for your frame endpoint.
          </p>
        </div>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
