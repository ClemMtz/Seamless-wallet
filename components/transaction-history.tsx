"use client";

import { getTransactions } from "@/actions/get-transactions";
import { extractTransactionsData } from "@/utils/extract-transactions-data";
import { ExtractedData, TransactionHistoryTypes } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import TransactionTable from "./ui/transactions-table";

const TransactionHistory = ({
  balance,
  truncateAddress,
  publicAddress,
}: TransactionHistoryTypes) => {
  const [transactionData, setTransactionData] = useState<ExtractedData[]>([]);
  //   useEffect(() => {
  const fetchTransactionsData = useCallback(async () => {
    try {
      const apiKey = process.env.API_TOKEN_POLYGON;
      const address = publicAddress;

      const transactions =
        (await getTransactions(
          address as string,
          0,
          99999999,
          1,
          10,
          "asc",
          apiKey as string
        )) || [];

      const extractedDataPromises = transactions.map((transaction: any) => {
        const extracted = extractTransactionsData(transaction);
        return extracted;
      });

      const extractedData = await Promise.all(extractedDataPromises);

      setTransactionData(extractedData as ExtractedData[]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [publicAddress]);

  //     fetchTransactionsData();
  //   }, [balance, publicAddress]);

  useEffect(() => {
    fetchTransactionsData();
  }, [balance, fetchTransactionsData]);

  const columns = ["From", "To", "Amount"];
  const rows = transactionData.map((transaction) => {
    // these value need to be toLowerCase() before beeing compared because they got different cases.
    const transactionToToLowerCase = transaction.to.toLowerCase();
    const publicAddressToLowerCase = publicAddress?.toLowerCase();

    const signs =
      transactionToToLowerCase === publicAddressToLowerCase ? "+" : "-";
    const signsColor = signs === "+" ? "positive-sign" : "negative-sign";

    return {
      From: truncateAddress(transaction.from),
      Date: transaction.timestamp,
      To: truncateAddress(transaction.to),
      Amount: (
        <span className={signsColor}>
          {signs} ${Number(transaction.valueInUSD / 1e18).toFixed(3)}
        </span>
      ),
    };
  });

  return (
    <div>
      <hr />
      <TransactionTable columns={columns} rows={rows} />
    </div>
  );
};

export default TransactionHistory;
