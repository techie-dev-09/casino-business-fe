import React, { useEffect } from "react";
import WertModule from "@wert-io/module-react-component";
import { signSmartContractData } from "@wert-io/widget-sc-signer";

function WertWidget({
  author = "1buy",
  name = "1buy.io NFT",
  category = "1buy.io",
  commodity_amount = 3,
  author_image_url = "https://partner-sandbox.wert.io/sample_nft.png",
  image_url = "https://partner-sandbox.wert.io/sample_nft.png",
}) {
  const privateKey =
    "0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3";

  const signedData = signSmartContractData(
    {
      address: "0x0E976df9bb3ac63F7802ca843C9d121aE2Ef22ee", // user's address
      commodity: "MATIC",
      commodity_amount: commodity_amount, // the crypto amount that should be sent to the contract method
      network: "amoy",
      sc_address: "0x6af35a72b2490a44c0e88ae635b9b38516544db1", // your SC address
      sc_input_data:
        "0x3c168eab0000000000000000000000000e976df9bb3ac63f7802ca843c9d121ae2ef22ee0000000000000000000000000000000000000000000000000000000000000001",
    },
    privateKey
  );
  const options = {
    partner_id: "01HE2KXEGTAT7XDRGFW3WSQQAR",
    origin: "https://sandbox.wert.io",
    address: "0x0E976df9bb3ac63F7802ca843C9d121aE2Ef22ee",
    commodity: "MATIC",
    commodity_amount: commodity_amount,
    network: "amoy",
    sc_address: "0x6af35a72b2490a44c0e88ae635b9b38516544db1",
    sc_input_data:
      "0x3c168eab0000000000000000000000000e976df9bb3ac63f7802ca843c9d121ae2ef22ee0000000000000000000000000000000000000000000000000000000000000001",
    extra: {
      item_info: {
        author: author,
        author_image_url: author_image_url,
        image_url: image_url,
        name: name,
        category: category,
      },
    },

    ...signedData,
  };

  useEffect(() => {
    const iframe = document.querySelectorAll("iframe");
    if (iframe) {
      iframe.forEach((elem) => (elem.style.borderRadius = "24px"));
    }
  }, []);

  return <WertModule options={options} className="wert-container" />;
}

export default WertWidget;
