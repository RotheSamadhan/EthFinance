import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Axios from "axios";
import Link from "next/link";
import style from "../styles/Navbar.module.css";
import avatrar from "../avatar.jpg";
import eth from "../eth1.png";
import evm from "../evm.png";
import loader from "../loader.gif";
import axios from "axios";

function Navbar() {
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState("");
  const [openModel, setOpenModel] = useState("True");
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState([]);

  // TO get the price of Ether by using API.

  const getEtherPrice = async () => {
    try {
      axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_ETHER_KEY}`
        )
        .then((response) => {
          // console.log (response.data.result);  to inspect in console for api data.
          setPrice(response.data.result);
          console.log(price);

          const timestamp = Number(response.data.result.ethusd_timestamp);
          console.log(timestamp);

          const date = new Date(timestamp);

          setUpdatedPriceDate(
            "Updated : " +
              date.getHours() +
              " : " +
              date.getMinutes() +
              " : " +
              date.getSeconds()
          );
          console.log(updatedPriceDate);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //once reload the page getEtherPrice function will be called.

  useEffect(() => {
    getEtherPrice();
  }, []);

  //Navbar all structuring

  return (
    <div>
      <div className={style.navbar}>
        <div className={style.navbar_container}>
          <div className={style.left}>
            <Link href="/">
              <div>
                <h1 className={style.desktop}>
                  <h1 className={style.mobile}>Ether Finance</h1>
                  <Image src={eth} alt="logo" width={50} height={50} />
                </h1>
              </div>
            </Link>
          </div>
          <h1 className={style.right}>Hey</h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
