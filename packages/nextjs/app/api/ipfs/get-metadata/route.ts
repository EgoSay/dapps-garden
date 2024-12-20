import { getNFTMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-pinata";

export async function POST(request: Request) {
  try {
    const { ipfsHash, tokenId } = await request.json();
    const res = await getNFTMetadataFromIPFS(ipfsHash, tokenId);
    return Response.json(res);
  } catch (error) {
    console.log("Error getting metadata from ipfs", error);
    return Response.json({ error: "Error getting metadata from ipfs" });
  }
}
