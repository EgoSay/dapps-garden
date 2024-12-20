const nftsMetadata = [
  {
    description: "NFT-Garden1",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn1.avif",
    name: "Buffalo",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 42,
      },
    ],
  },
  {
    description: "NFT-Garden2",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn2.avif",
    name: "Zebra",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 38,
      },
    ],
  },
  {
    description: "NFT-Garden3",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn3.avif",
    name: "Rhino",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 22,
      },
    ],
  },
  {
    description: "NFT-Garden4",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn4.avif",
    name: "Fish",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 15,
      },
    ],
  },
  {
    description: "NFT-Garden5",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn5.avif",
    name: "Flamingo",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 6,
      },
    ],
  },
  {
    description: "NFT-Garden6",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "https://3bcaf57.webp.li/myblog/dapps-garden-nftn6.avif",
    name: "Godzilla",
    attributes: [
      {
        trait_type: "Eyes",
        value: "googly",
      },
      {
        trait_type: "Stamina",
        value: 99,
      },
    ],
  },
];

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
