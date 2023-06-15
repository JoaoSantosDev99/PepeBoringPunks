import React, { useEffect } from "react";
import { useState } from "react";
import banner from "../assets/banner.jpg";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";
import abi from "../contracts/abi.json";
import { fromBn } from "../utils";

const Main = () => {
  const [inputAmount, setinputAmount] = useState(1);
  const [totalSupply, settotalSupply] = useState(7777);
  const [userBal, setuserBal] = useState(0);

  const increaseAmount = () => {
    if (inputAmount === 21) return;
    setinputAmount((prevState) => prevState + 1);
  };

  const decreaseAmount = () => {
    if (inputAmount === 1) return;
    setinputAmount((prevState) => prevState - 1);
  };

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { switchNetwork } = useSwitchNetwork();

  const contAdd = "0xC84AC7BF8b4cEc60d82fb93DFb61b03d5E4aCD39";

  const statProv = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  const nftContract = new ethers.Contract(contAdd, abi, statProv);

  const fetchData = async () => {
    if (isConnected) {
      const bal = await nftContract.balanceOf(address);
      setuserBal(fromBn(bal));
    }

    const ts = await nftContract.totalSupply();
    settotalSupply(fromBn(ts));
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  const mint = async () => {
    if (!isConnected) return alert("Not connected");

    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    try {
      const writeContract = new ethers.Contract(contAdd, abi, signer);
      const value =
        userBal > "0"
          ? ethers.utils.parseEther((0.004 * inputAmount).toString())
          : ethers.utils.parseEther((0.004 * (inputAmount - 1)).toString());

      const mintNFT = await writeContract.publicMint(inputAmount, {
        value: value,
      });

      await mintNFT.wait();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full flex justify-center">
      <div className="px-1 max-w-screen-xl w-full flex flex-col">
        {/* Paragraph */}
        <p className="w-full text-center px-2 md:text-start md:max-w-3xl mt-20 text-xl">
          We created 7777 unique collectibles pfps as an homage to the two epic
          projects Bored Ape YC and Cryptopunks. We reimagined what the PFP
          could look like with 120 hand made traits with an enhanced art style,
          Cryptopunk framing, and Bored Ape traits, spawning the BoringApes
          collection. There will never be more than 7777 BoringApes and each one
          is distinct with it's own set of rarities and attributes making each
          BoringApe different from one another. The BoringApes collection minted
          on the Ethereum blockchain on June 14th, 2023.{" "}
        </p>

        {/* Stats */}
        <div className="flex mt-10 font-bold text-2xl w-full justify-center md:justify-start md:text-3xl gap-5">
          <span>{7777 - totalSupply} / 4000 </span>{" "}
          <span className="text-[#747474]"> Mints Remaining</span>
        </div>

        {/* Input */}
        <div className="flex  w-full justify-center md:justify-start gap-5 md:gap-10 mt-10 items-center">
          <div className="flex w-fit gap-2  items-center">
            <button
              onClick={decreaseAmount}
              className="text-white font-bold w-[40px] h-[40px] bg-[#AAAAAA]"
            >
              {" "}
              -{" "}
            </button>
            <div className="border-2 h-[60px] w-[60px] flex justify-center text-[#5d5d5d] items-center text-2xl font-bold">
              {inputAmount}
            </div>
            <button
              onClick={increaseAmount}
              className="text-white font-bold w-[40px] h-[40px] bg-[#AAAAAA]"
            >
              {" "}
              +{" "}
            </button>{" "}
          </div>
          <button
            onClick={mint}
            className="text-[#5BEB34] bg-[#fafafa] hover:border-[#5BEB34] border-2 border-[#a8a8a8] w-[180px] h-[60px] flex justify-center items-center text-2xl font-bold"
          >
            Mint
          </button>
        </div>

        {isConnected && (
          <div className="flex w-full justify-center md:w-fit text-lg md:text-xl px-4 gap-4 md:gap-10 mt-7 p-2 bg-[#dadada]">
            <div>NFT Balance: {userBal}</div>
          </div>
        )}

        {/* Opensea */}
        <p className="mt-10 w-full mb-5 text-center md:text-start text-lg md:text-xl md:max-w-2xl">
          If you would like to purchase your own Boring Ape we encourage users
          to browse on{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://opensea.io/collection/boringapesnft"
          >
            <span className="bg-[#5BEB34] p-1 rounded-lg"> Opensea.</span>
          </a>
        </p>

        {/* Footer */}
        <footer className="flex my-1 md:my-5 max-w-screen-xl w-full">
          <img
            src={banner}
            alt="banner"
            className="rounded-lg md:rounded-2xl"
          />
        </footer>
      </div>
    </section>
  );
};

export default Main;
