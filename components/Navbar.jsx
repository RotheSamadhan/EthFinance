import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "../Styles/Navbar.module.css";
import L_logo from "../madara.png";
import evm from "../evm.png";
import logo from "../GLANCE2.png";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";

const Navbar = () => {
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState("");
  const [openModel, setOpenModel] = useState(true);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState("");

  // calling from {style.right} and openModel is true when metamask will be on
  //
  const openUserInfo = () => {
    if (openModel) {
      setOpenModel(false);
    } else if (!openModel) {
      setOpenModel(true);
    }
  };

  // TO get the price of Ether by using API.
  // here is a API key but added now in .env file
  const getEtherPrice = async () => {
    try {
      await axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_ETHER_KEY}`
        )
        .then((response) => {
          setPrice(response.data.result);
          // console.log(price);

          const timestamp = Number(response.data.result.ethusd_timestamp);
          const date = new Date(timestamp * 1000);
          setUpdatedPriceDate(date.toLocaleTimeString());
        });
      // console.log(updatedPriceDate);
    } catch (error) {
      console.log(error);
    }
  };
  //set ether supply
  const set_ethSupply = async () => {
    try {
      await axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethsupply2&apikey=${API_ETHER_KEY}`
        )
        .then((res) => {
          setEtherSupply(res.data.result);
        });
      console.log(etherSupply);
    } catch (error) {
      console.log(error);
    }
  };

  //set user account
  const check_account = async () => {
    try {
      if (!window.ethereum) return console.log("please install metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setUserAccount(accounts[0]);
      }
      console.log(userAccount);
    } catch (error) {
      console.log(error);
    }
  };
  //set wallet account
  const wallet_account = async () => {
    try {
      if (!window.ethereum) return console.log("please install metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        userAccount(accounts[0]);
      } else {
        console.log("sorry you dont have account");
      }
      window.location.reload(); // once the account connected the page will reload
    } catch (error) {
      console.log("something is wrong");
    }
  };
  //once reload the page getEtherPrice function will be called.
  useEffect(() => {
    getEtherPrice();
    check_account();
    set_ethSupply();
  }, []);
  //Navbar all structuring
  return (
    <div>
      <div className={Style.navbar}>
        <div className={Style.navbar_container}>
          <div className={Style.left}>
            <Link href="/">
              <div>
                <h2 className={Style.desktop}>
                  <h2 className={Style.mobile}>Ether glance</h2>
                </h2>
              </div>
            </Link>
          </div>
          {/*if wallet account is present then button will show up */}
          <div className={Style.right}>
            {userAccount.length ? (
              <div className={Style.connected}>
                <button onClick={() => openUserInfo()}>
                  {" "}
                  {/* button of account created*/}
                  Acc:{userAccount.slice(0, 10)}...
                </button>
                {openModel ? (
                  <div className={Style.usermodal}>
                    <div className={Style.user_box}>
                      <div className={Style.closebtn}>
                        <MdOutlineClose onClick={() => openUserInfo()} />
                      </div>
                      <Image
                        src={L_logo}
                        alt="L_logo"
                        width={220}
                        height={50}
                      />
                      <p>
                        <b>Account :</b> &nbsp; {userAccount}
                      </p>
                      <p>
                        <b>Balance :</b> &nbsp; {balance} ETH
                      </p>
                      <p>
                        <b>Total Transaction :</b> &nbsp;count ETH
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <button onClick={() => wallet_account()}></button>
            )}
          </div>
        </div>
      </div>
      <div className={Style.price}>
        <div className={Style.price_box}>
          <div className={Style.etherPrice}>
            <div>
              <Image src={evm} alt="evm logo" width={40} height={40} />
            </div>
            <div>
              <h4>Ether Price</h4>
              <p>$ 23555</p>
              <p>BTC 3355</p>
              <p>Updated Price</p>
            </div>
            <div className={Style.supplyEther}>
              <AiOutlineAreaChart className={Style.supplyIcon} />
            </div>
            <div>
              <h4>TOTAL ETHER SUPPLY</h4>
              <p>$ 23555</p>
              <p>BTC 3355</p>
              <p>Updated Price</p>
            </div>
          </div>
        </div>
        <div className={Style.price_box}>
          <div className={Style.TokenBox_logo}>
            <Image src={logo} alt="loader logo" width={450} height={110} />
          </div>
          <div className={Style.logoWidth}>
            <p>ERC20</p>
            <p>ERC21 </p>
            <p>ERC1155</p>
            <p>CONTRACT</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
