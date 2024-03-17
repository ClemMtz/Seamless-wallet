"use client";

import { GetUsdcTransaction } from "@/actions/get-usdc-transaction";
import { usePublicAddress } from "@/hooks/use-public-address";
import useStore from "@/store";
import { ExtractedData } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import SkeletonTranscationHistory from "./ui/skeleton-transaction-history";
import TransactionTable from "./ui/transactions-table";

const TransactionHistory = () => {
  const publicAddress = usePublicAddress();
  const { truncateAddress, balance, dataLoading, setDataLoading } = useStore();
  const [transactionData, setTransactionData] = useState<ExtractedData[]>([]);
  const fetchTransactionsData = useCallback(async () => {
    try {
      setDataLoading(true);
      const apiKey = process.env.API_TOKEN_POLYGON;

      const transactions = await GetUsdcTransaction({
        module: "account",
        action: "tokentx",
        contractaddress: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
        address: publicAddress,
        page: 1,
        offset: 5,
        sort: "asc",
        apikey: apiKey,
      });

      const extractedData = transactions.result.map((transaction: any) => {
        const convertTimestamp = (timestamp: any) => {
          let d = new Date(timestamp * 1000);
          let yyyy = d.getFullYear();
          let mm = ("0" + (d.getMonth() + 1)).slice(-2);
          let dd = ("0" + d.getDate()).slice(-2);

          const time = yyyy + "-" + mm + "-" + dd;
          return time;
        };

        const date = convertTimestamp(transaction.timeStamp);
        const valueInUSDC = parseFloat(transaction.value) / 1e6;

        return {
          value: valueInUSDC.toFixed(2),
          from: transaction.from,
          to: transaction.to,
          date: date,
        };
      });

      setTransactionData(extractedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setDataLoading(false);
  }, [publicAddress, setDataLoading]);

  useEffect(() => {
    fetchTransactionsData();
  }, [balance, fetchTransactionsData]);

  const columns = ["From", "To", "Amount"];
  const rows = transactionData.map((transaction) => {
    // these values need to be toLowerCase() before beeing compared because they got different cases.
    const transactionToToLowerCase = transaction.to.toLowerCase();
    const publicAddressToLowerCase = publicAddress?.toLowerCase();

    const signs =
      transactionToToLowerCase === publicAddressToLowerCase ? "+" : "-";
    const signsColor = signs === "+" ? "positive-sign" : "negative-sign";

    return {
      From: truncateAddress(transaction.from),
      Date: transaction.date,
      To: truncateAddress(transaction.to),
      Amount: (
        <span className={signsColor}>
          {signs} ${transaction.value}
        </span>
      ),
    };
  });

  return (
    <div>
      <hr />
      {dataLoading ? (
        <SkeletonTranscationHistory />
      ) : (
        <TransactionTable columns={columns} rows={rows} />
      )}
    </div>
  );
};

export default TransactionHistory;
