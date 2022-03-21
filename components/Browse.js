import React, { useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";

function Browse() {
  const web3Context = React.useContext(Web3Context);
  const { loadDomains, domains, loading } = web3Context;

  const [blockchainDomains, setBlockchainDomains] = useState([]);
  const [web2Domains, setWeb2Domains] = useState([]);
  const [businessDomain, setBusinessDomains] = useState([]);

  useEffect(() => {
    loadDomains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(domains);
    let arr1 = domains.filter((domain) => domain.type === "Blockchain Domain");
    setBlockchainDomains(arr1);
    let arr2 = domains.filter((domain) => domain.type === "Web2 Domain");
    setWeb2Domains(arr2);
    let arr3 = domains.filter(
      (domain) => domain.type === "Website and business Domain"
    );
    setBusinessDomains(arr3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains]);

  return (
    <div className="no-bottom no-top" id="content">
      <section id="subheader" className="">
        <div className="no-bottom no-top" id="content">
          <section id="section-intro" className="no-top no-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-sm-30 ">
                  <div className="feature-box f-boxed style-3 info">
                    <i className="wow fadeInUp bg-color-2 i-boxed icon_wallet " />
                    <div className="text">
                      <h4 className="wow fadeInUp">
                        Tokenize Domain Names & Online Business
                      </h4>
                    </div>
                    <i className="wm icon_wallet" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-sm-30 ">
                  <div className="feature-box f-boxed style-3 info">
                    <i className="wow fadeInUp bg-color-2 i-boxed icon_wallet " />
                    <div className="text">
                      <h4 className="wow fadeInUp">Buy/Sell Tokenized NFTs</h4>
                    </div>
                    <i className="wm icon_wallet" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-sm-30 ">
                  <div className="feature-box f-boxed style-3 info">
                    <i className="wow fadeInUp bg-color-2 i-boxed icon_tags_alt " />

                    <div className="text">
                      <h4 className="wow fadeInUp">
                        Join Online Auction Clubs
                      </h4>
                    </div>
                    <i className="wm icon_wallet" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="section-collections" className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Blockchain Domains</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {loading === false && !blockchainDomains.length ? (
              <h4 className="text-center">No Domains in Blockchain Domains</h4>
            ) : (
              <>
                <ul className="list-group">
                  {blockchainDomains.map((domain) => {
                    return (
                      <li
                        key={domain.tokeId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <a href={`https://${domain.url}`} target={"blank"}>
                          {domain.url}
                        </a>
                        <span className="">{`Price  ${domain.price} Matic`}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="section-collections" className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Web2 Domains</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {loading === false && !web2Domains.length ? (
              <h4 className="text-center">No Domains in Web2 Domains</h4>
            ) : (
              <>
                <ul className="list-group">
                  {web2Domains.map((domain) => {
                    return (
                      <li
                        key={domain.tokeId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <a href={`https://${domain.url}`} target={"blank"}>
                          {domain.url}
                        </a>
                        <span className="">{`Price  ${domain.price} Matic`}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
      <section id="section-collections" className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Website and Online Business</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {loading === false && !businessDomain.length ? (
              <h4 className="text-center">
                No Domains in Website and Online Business Domains
              </h4>
            ) : (
              <>
                <ul className="list-group">
                  {businessDomain.map((domain) => {
                    return (
                      <li
                        key={domain.tokeId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <img
                            className="logoImg"
                            src={domain.image}
                            alt="true"
                          />
                          <a href={`https://${domain.url}`} className="urlclass" target={"blank"}>
                            {domain.name}
                          </a>
                        </div>
                        <span className="domainPrice">{`Price  ${domain.price} Matic`}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Browse;
