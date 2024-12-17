

import { PinataSDK } from "pinata-web3"

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})

// 上传到 IPFS
export async function uploadToPinata(data: any) {
    try {
      const result = await pinata.upload.json(data).addMetadata({
        name: `NFT-Metadata-${Date.now()}`
      });
      return result;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      return undefined;
    }
  }
  
  // 从 IPFS 获取 NFT 元数据
  export async function getNFTMetadataFromIPFS(ipfsHash: string) {
    try {
      const gateway = "https://gateway.pinata.cloud/ipfs/";
      const response = await fetch(`${gateway}${ipfsHash}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from IPFS:", error);
      return undefined;
    }
  }