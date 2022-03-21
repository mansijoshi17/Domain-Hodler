## Unstopable Domain

_Unstopable Domain:_ Unstopable domain we have used to connect using domain name.

https://github.com/mansijoshi17/Domain-Hodler/blob/master/components/Header.js

```javascript
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
```

## IPFS

_💾Filecoin/IPFS:_ Data of all the a) domain NFT , b) user's sell domain NFT are stored NFT Metadata on IPFS.

https://github.com/mansijoshi17/Domain-Hodler/blob/master/components/create.js

```javascript
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
```

## Polygon

_Polygon:_ Deployed smart contracts on polygon network.

https://github.com/mansijoshi17/Domain-Hodler/blob/master/hardhat.config.js

```javascript
require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = "";
const ALCHEMY_API_KEY = "pqr-VAfSii011IkFlqrZTxCgzK5fWegs";

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
```
