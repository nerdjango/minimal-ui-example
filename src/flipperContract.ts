import { Signer as EthersSigner } from "@ethersproject/abstract-signer";
import { ethers } from "ethers";
import { Signer as EvmSigner } from "@reef-defi/evm-provider/Signer";
import { isMainnet } from "@reef-defi/evm-provider/utils";
import { Signer as SignerType } from "@ethersproject/abstract-signer/lib/index";

export function getFlipperContract(signer) {
    if (isMainnet(signer as EvmSigner)) {
        throw new Error("Please connect to testnet");
    }
    const flipperContractAddressTestnet =
        "0x6252dC9516792DE316694D863271bd25c07E621B";
    const FlipperAbi = [
        {
            inputs: [
                {
                    internalType: "bool",
                    name: "initvalue",
                    type: "bool"
                }
            ],
            stateMutability: "nonpayable",
            type: "constructor"
        },
        {
            inputs: [],
            name: "flip",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            inputs: [],
            name: "get",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            stateMutability: "view",
            type: "function"
        }
    ];
    return new ethers.Contract(
        flipperContractAddressTestnet,
        FlipperAbi,
        signer as SignerType
    );
}

export async function flipIt(signer: EvmSigner) {
    const flipperContract = getFlipperContract(signer);
    return await flipperContract.flip();
}

export async function getFlipperValue(signer: EvmSigner) {
    const flipperContract = getFlipperContract(signer);
    return await flipperContract.get();
}
