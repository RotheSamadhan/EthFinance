import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Axios from "axios";
import Link from "next/link";
import Style from "../Styles/Navbar.module.css";
import avatrar from "../avatar.jpg";
import eth from "../eth1.png";
import evm from "../evm.png";
import loader from "../loader.gif";
import axios from "axios";

const Navbar = () => {
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState("");
  const [openModel, setOpenModel] = useState(true);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState("");

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
                <h1 className={Style.desktop}>
                  <h1 className={Style.mobile}>Ether Finance</h1>
                  <Image src={eth} alt="logo" width={50} height={50} />
                </h1>
              </div>
            </Link>
          </div>
          <div className={Style.right}>hey</div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
