import React, { useState } from "react";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Web3Context } from "../context/Web3Context";

import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { domainTokenaddress, domainMarketaddress } from "../config";
import DomainToken from "../artifacts/contracts/DomainToken.sol/DomainToken.json";
import DomainMarket from "../artifacts/contracts/DomainMarket.sol/DomainMarket.json";
import web3 from "web3";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function Create() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: "",
    price: "",
    type: "",
    url: "",
    category: "",
  });
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const web3Context = React.useContext(Web3Context);
  const { currentAddress, userData, userId } = web3Context;

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createItem() {
    const { name, price, type, url, category } = formInput;
    if (!name || !type || !price || !url || !category) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      type,
      image: fileUrl,
      category,
      url,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createSale(url) {
    setLoader(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(domainTokenaddress, DomainToken.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = web3.utils.toWei(formInput.price, "ether");

    const listingPrice = web3.utils.toWei("0.1", "ether");

    contract = new ethers.Contract(domainMarketaddress, DomainMarket.abi, signer);
    transaction = await contract.createMarketItem(domainTokenaddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();
    setLoader(false);
    router.push("/");
  }

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      {}
      <section id="subheader" className="text-light bg-container">
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Sell</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {}
      {}
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form
                id="form-create-item"
                className="form-border"
                method="post"
                action="email.php"
              >
                <div className="field-set">
                  <h5>Name</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, name: e.target.value })
                    }
                    className="form-control"
                    placeholder="e.g. 'abc"
                  />
                  <div className="spacer-10" />
                  <h5>Type</h5>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          type: e.target.value,
                        })
                      }
                    >
                      <option selected value="">
                        Type
                      </option>
                      <option value="Blockchain Domain">
                        Blockchain Domain
                      </option>
                      <option value="Web2 Domain">Web2 Domain</option>
                      <option value="Website and business Domain">
                        Website and business Domain
                      </option>
                    </select>
                  </div>
                  <div className="spacer-10" />
                  <h5>Upload Photo</h5>
                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG.</p>
                    <label
                      htmlFor="files"
                      id="get_file"
                      name="Asset"
                      className="btn-main"
                      style={{ color: "white" }}
                    >
                      Browse
                    </label>
                    <input
                      id="files"
                      onChange={onChange}
                      style={{ display: "none" }}
                      type="file"
                    />
                  </div>
                  <div className="spacer-10" />
                  <h5>Url</h5>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, url: e.target.value })
                    }
                    className="form-control"
                    placeholder="e.g. 'abc.com"
                  />
                  <div className="spacer-10" />
                  <h5>Category</h5>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          category: e.target.value,
                        })
                      }
                    >
                      <option selected value="">
                        Category
                      </option>
                      <option value="Crypto-Blockchain">Crypto-Blockchain</option>
                      <option value="Ecommerce">Ecommerce</option>
                      <option value="Realestate">Realestate</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Envoirment">Envoirment</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                  <h5>Price</h5>
                  <input
                    type="text"
                    name="item_price"
                    id="item_price"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, price: e.target.value })
                    }
                    className="form-control"
                    placeholder="enter price(MATIC)"
                  />
                  <div className="spacer-10" />
                  <h5>Verify Ownership</h5>
                  <span>Txt record - domainhodler.com/tokken=vzeeasgrx24</span>
                  <div className="spacer-10" />
                  <input
                    type="button"
                    id="submit"
                    className="btn-main"
                    defaultValue={
                      loader == true
                        ? "Loading...! Please wait it will take time"
                        : "Create"
                    }
                    onClick={createItem}
                    disabled={loader ? true : false}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Create;
