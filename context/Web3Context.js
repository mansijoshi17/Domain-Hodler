import React, { useState, createContext, useEffect } from "react";

import Web3Modal from "web3modal";
import Web3 from "web3";
import axios from "axios";
import { domainTokenaddress, domainMarketaddress } from "../config";
import DomainToken from "../artifacts/contracts/DomainToken.sol/DomainToken.json";
import DomainMarket from "../artifacts/contracts/DomainMarket.sol/DomainMarket.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const Web3Context = createContext(undefined);

export const Web3ContextProvider = (props) => {
  const router = useRouter();
  const [domains, setDomains] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.onunload = () => {
      // Clear the local storage
      window.Storage.clear();
    };
    let account = localStorage.getItem("account");
    if (account !== null) {
      setCurrentAddress(account);
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length > 0) {
        setCurrentAddress(accounts[0]);
        localStorage.setItem("account", accounts[0]);
      } else {
        setCurrentAddress("");
        localStorage.setItem("account", null);
      }
      setIsRefreshing(false);
      loadMyNfts();
    });
  }, [currentAddress]);

  async function connectWallet() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function (accounts) {
          setCurrentAddress(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          window.ethereum.on("accountsChanged", function (accounts) {
            setCurrentAddress(accounts[0]);
            localStorage.setItem("account", accounts[0]);
          });
        });
      } catch (e) {
        alert("User rejected the MetaMask connection request !");
        localStorage.setItem("account", null);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("You have to install MetaMask !");
    }
  }

  async function loadDomains() {
    setLoading(true);
    let web3 = new Web3();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
      domainTokenaddress,
      DomainToken.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      domainMarketaddress,
      DomainMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = web3.utils.fromWei(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          name: meta.data.name,
          type: meta.data.type,
          seller: i.seller,
          image: meta.data.image,
          category: meta.data.category,
          url: meta.data.url,
        };
        return item;
      })
    );
    setDomains(items);
    setLoading(false);
  }

  return (
    <Web3Context.Provider
      value={{
        loadDomains,
        currentAddress,
        domains,
        loading,
        connectWallet,
      }}
      {...props}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
