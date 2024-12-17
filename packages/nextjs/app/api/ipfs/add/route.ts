import { uploadToPinata } from "~~/utils/simpleNFT/ipfs-pinata";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const result = await uploadToPinata(body);
    console.log(result);
    if (!result) {
      throw new Error("Failed to upload to Pinata");
    }
    
    return Response.json({
      IpfsHash: result.IpfsHash,
      PinSize: result.PinSize,
      Timestamp: result.Timestamp
    });
  } catch (error) {
    console.error("Error adding to IPFS:", error);
    return Response.json({ error: "Error adding to IPFS" }, { status: 500 });
  }
}