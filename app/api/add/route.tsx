import { NextRequest, NextResponse } from "next/server";
import PinataClient from "@pinata/sdk";

const pinata = new PinataClient(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

export const POST = async (req: NextRequest) => {
  let frame, owner: string;
  const now_timestamp = ((new Date().getTime() / 1000) | 0)
  try {
    const data = await req.json();
    frame = data.frame;
    frame.timestamp = now_timestamp.toString();
    owner = data.frame.owner;
    if (!frame || !owner || !frame.correctOptions || !frame.correctOptions.length) {
      throw new Error("Invalid JSON");
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const options = {
    pinataMetadata: {
      name: frame.name,
      keyvalues: {
        type: "framework-frames",
        owner,
      } as any,
    },
  };

  console.log(frame)
  const { IpfsHash } = await pinata.pinJSONToIPFS(frame, options);

  return NextResponse.json({ hash: IpfsHash });
};