import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import NftMinter from "./NftMinter.json";

const nftMinterAddress = "0x29701F882aD6F34DDaBa6bb4b4173E90049e4e9d";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nftMinterAddress,
        NftMinter.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
            value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="600px" className="main-box">
        <Text fontSize="80px">NFT Minter</Text>
        <Text fontSize="30px" letterSpacing="-5.5%">
          Praesent eleifend volutpat efficitur. Proin imperdiet odio vel massa
          fringilla, eget venenatis nunc sodales.Praesent eleifend volutpat
          efficitur. Proin imperdiet odio vel massa fringilla, eget venenatis
          nunc sodales.
        </Text>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#1cf9f1"
                borderRadius="5px"
                boxShadow="0 2px 2px 1px #0F0F0F"
                color="black"
                cursor="pointer"
                fontFamily="inherit"
                fontSize="30px"
                margin="0 20px"
                padding="20px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input 
                ReadOnly
                fontFamily="inherit"
                width="100px"
                textAlign="center"
                paddingLeft="center"
                marginTop="10px"
                type="number"
                value={mintAmount}
                />
              <Button
                backgroundColor="#1cf9f1"
                borderRadius="5px"
                boxShadow="0 2px 2px 1px #0F0F0F"
                color="black"
                cursor="pointer"
                fontFamily="inherit"
                fontSize="30px"
                margin="0 20px"
                padding="20px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
                backgroundColor="#1cf9f1"
                borderRadius="5px"
                boxShadow="0 2px 2px 1px #0F0F0F"
                color="black"
                cursor="pointer"
                fontFamily="inherit"
                fontSize="50px"
                margin="10px 20px"
                padding="30px"
                onClick={handleMint}
              >
                MINT
              </Button>
          </div>
        ) : (
          <Text 
          marginTop="70px"
          fontSize="50px"
          letterSpacing="-5.5%"
          color="#1cf9f1"
          >
            You must be connected to mint
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
