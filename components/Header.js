import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Web3Context } from "../context/Web3Context";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "./connectors";
import UAuth from "@uauth/js";

function Header() {
  const { active, account, activate, deactivate } = useWeb3React();
  const router = useRouter();
  const web3Context = React.useContext(Web3Context);
  const { currentAddress, connectWallet } = web3Context;
  const [isSticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const uauth = new UAuth({
    clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,

    // Requested scopes.
    scope: "openid email wallet",

    postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
  });

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <header className={`bg-gredient`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  {}
                  <div id="logo">
                    <a href="/">
                      <h4 className="logo">Domain Hodler</h4>
                    </a>
                  </div>
                  {}
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                {}
                <ul
                  id="mainmenu"
                  className={` ${isSticky ? "" : "header-dark-text"}`}
                >
                  <li>
                    <Link href="/">Browse</Link>
                  </li>
                  <li>
                    <Link href="/sell">Sell</Link>
                  </li>

                  {/* <li id="profile">
                    <a href="profile.html">
                      Profile
                      <span />
                    </a>
                  </li> */}
                </ul>
                <a className="btn-main" onClick={handleLogin}>
                  <i className="icon_wallet_alt"></i>
                  <span>Login with Unstoppable</span>
                </a>
                {/* {Object.keys(connectors).map((v) => (
                  <a
                    className="btn-main"
                    key={v}
                    onClick={createConnectHandler(v)}
                  >
                    <i className="icon_wallet_alt"></i>
                    <span>Connect {v}</span>
                  </a>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
