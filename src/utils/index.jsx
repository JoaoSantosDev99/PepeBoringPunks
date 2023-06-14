import { ethers } from "ethers";

export const addressShortener = (address) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const longAddressCrop = (address) => {
  return address.slice(0, 10) + " . . . " + address.slice(-10);
};

export const twoDecimals = (num) => {
  return Math.trunc(num * 100) / 100;
};

export const fiveDecimals = (num) => {
  return Math.trunc(num * 100000) / 100000;
};

export const formatCommas = (number) => {
  return Math.trunc(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fromBn = (num) => {
  return ethers.utils.formatUnits(num, 0);
};

export const fromBn18 = (num) => {
  return ethers.utils.formatUnits(num, 18);
};
