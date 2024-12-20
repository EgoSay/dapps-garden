import nftsMetadata from "./nftsMetadata";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});
const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

// 上传到 IPFS
export async function uploadToPinata(data: any) {
  try {
    const result = await pinata.upload.json(data).addMetadata({
      name: `NFT-Metadata-${Date.now()}`,
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return undefined;
  }
}

// 从 IPFS 获取 NFT 元数据
export async function getNFTMetadataFromIPFS(ipfsHash: string, tokenId: bigint) {
  const fetchPromises = IPFS_GATEWAYS.map(gateway => {
    const url = `${gateway}${ipfsHash}`;
    console.log("尝试从以下地址获取数据:", url);

    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(1000),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  });

  try {
    // 使用 Promise.race 获取最快返回的结果
    const data = await Promise.race(fetchPromises);
    console.log("成功获取数据:", data);
    return data;
  } catch (error) {
    console.error("所有 IPFS 网关都失败了:", error);
    return nftsMetadata[Number(tokenId) % nftsMetadata.length];
  }
}
