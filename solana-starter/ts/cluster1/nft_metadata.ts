import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/FE8RXgjYZaHchFFHnkCvB7ZcrhcjoUEwrdxrUwY57VyR"
        const metadata = {
            name: "Jeff Rug - Lets Go",
            symbol: "JR",
            description: "Jeff Rug - Lets Go",
            image,
            attributes: [
                {trait_type: 'type', value: 'legendary'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
        // https://gateway.irys.xyz/FqXcDR9qrUSDD7MM5wJLXPwWMwQnA7GoyFFtNgbvufA4
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
