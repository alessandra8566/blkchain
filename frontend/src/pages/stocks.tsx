import { getAccounts, postBuyStocks, transferStocks } from "@/api/stock";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  stockBuy,
  stockBuyDefault,
  stockTransfer,
  stockTransferDefault,
} from "./utils";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormSelect } from "@/components/form/select";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLoadingDialogState } from "@/stores/dialog";
import { FormInput } from "@/components/form/input";

const Stocks = () => {
  const setDialogOpenState = useLoadingDialogState(
    (state) => state.setLoadingDialogState
  );

  const { data: accounts, refetch } = useQuery({
    queryKey: ["stocks", "accounts"],
    queryFn: getAccounts,
    select: (res) => res.data,
  });

  const transferStockForm = useForm<z.infer<typeof stockTransfer>>({
    resolver: zodResolver(stockTransfer),
    values: stockTransferDefault,
  });

  const { watch: transferWatch, handleSubmit: transferHandleSubmit } =
    transferStockForm;
  const transferWatchValues = transferWatch();

  const buyStockForm = useForm<z.infer<typeof stockBuy>>({
    resolver: zodResolver(stockBuy),
    values: stockBuyDefault,
  });
  const { watch: buyWatch, handleSubmit: buyHandleSubmit } = buyStockForm;
  const buyWatchValues = buyWatch();

  const buyerAccount = useMemo(() => {
    return accounts?.accounts.find(
      (account) => account.address === buyWatchValues.buyer
    );
  }, [accounts?.accounts, buyWatchValues.buyer]);

  const transferFromAccount = useMemo(() => {
    return accounts?.accounts.find(
      (account) => account.address === transferWatchValues.from_account
    );
  }, [accounts?.accounts, transferWatchValues.from_account]);

  const transferToAccount = useMemo(() => {
    return accounts?.accounts.find(
      (account) => account.address === transferWatchValues.to_account
    );
  }, [accounts?.accounts, transferWatchValues.to_account]);

  const buyStock = async (values: z.infer<typeof stockBuy>) => {
    await buyStockMutation.mutateAsync({
      ...values,
      amounts: Number(values.amounts),
    });
    refetch();
  };

  const transferStock = async (values: z.infer<typeof stockTransfer>) => {
    await transferStockMutation.mutateAsync({
      ...values,
      amounts: Number(values.amounts),
    });
    refetch();
  };

  const buyStockMutation = useMutation({
    onMutate: () => setDialogOpenState({ isLoading: true }),
    mutationFn: postBuyStocks,
    onSuccess: () => {
      setDialogOpenState({
        isLoading: false,
        respondState: "success",
        message: "股票購買成功",
      });
    },
    onError: () =>
      setDialogOpenState({
        isLoading: false,
        respondState: "error",
        message: "股票購買失敗",
      }),
  });

  const transferStockMutation = useMutation({
    onMutate: () => setDialogOpenState({ isLoading: true }),
    mutationFn: transferStocks,
    onSuccess: () => {
      setDialogOpenState({
        isLoading: false,
        respondState: "success",
        message: "股票轉移成功",
      });
    },
    onError: () =>
      setDialogOpenState({
        isLoading: false,
        respondState: "error",
        message: "股票轉移失敗",
      }),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl text-primary">台積電股票管理系統</h1>
      <Card className="max-w-screen-md w-full">
        <CardHeader className="p-4">
          <CardTitle className="text-xl text-primary">剩餘股票數量</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <p>{accounts?.remainingStock ?? 0}</p>
        </CardContent>
      </Card>

      <Card className="max-w-screen-md w-full">
        <FormProvider {...buyStockForm}>
          <form onSubmit={buyHandleSubmit(buyStock)}>
            <CardHeader className="p-4">
              <CardTitle className="text-xl text-primary">購買股票</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col justify-center gap-4 p-4">
              <FormSelect
                name="buyer"
                label="購買帳戶"
                selectProps={{
                  items:
                    accounts?.accounts.map((account, index) => ({
                      text: `帳戶 ${index + 1}: ${account.address}`,
                      value: account.address,
                    })) ?? [],
                  placeholder: "請選擇",
                }}
              />
              <div className="bg-blue-100 border-l-4 border-blue-600 rounded-sm p-2 text-sm flex flex-col justify-center gap-1">
                <p>地址： {buyerAccount?.address ?? "--"}</p>
                <p>持有股票： {buyerAccount?.stockBalance ?? "--"}</p>
                <p>持有以太幣： {buyerAccount?.ethBalance ?? "--"}</p>
              </div>
              <FormInput
                name="amounts"
                label="購買張數"
                inputProps={{ type: "number" }}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full hover:bg-blue-400">購買</Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>

      <Card className="max-w-screen-md w-full">
        <FormProvider {...transferStockForm}>
          <form onSubmit={transferHandleSubmit(transferStock)}>
            <CardHeader className="p-4">
              <CardTitle className="text-xl text-primary">轉移股票</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col justify-center gap-4 p-4">
              <FormSelect
                name="from_account"
                label="轉出帳戶"
                selectProps={{
                  items:
                    accounts?.accounts.map((account, index) => ({
                      text: `帳戶 ${index + 1}: ${account.address}`,
                      value: account.address,
                    })) ?? [],
                  placeholder: "請選擇",
                }}
              />
              <div className="bg-blue-100 border-l-4 border-blue-600 rounded-sm p-2 text-sm flex flex-col justify-center gap-1">
                <p>地址： {transferFromAccount?.address ?? "--"}</p>
                <p>持有股票： {transferFromAccount?.stockBalance ?? "--"}</p>
                <p>持有以太幣： {transferFromAccount?.ethBalance ?? "--"}</p>
              </div>
              <FormSelect
                name="to_account"
                label="轉入帳戶"
                selectProps={{
                  items:
                    accounts?.accounts.map((account, index) => ({
                      text: `帳戶 ${index + 1}: ${account.address}`,
                      value: account.address,
                    })) ?? [],
                  placeholder: "請選擇",
                }}
              />
              <div className="bg-blue-100 border-l-4 border-blue-600 rounded-sm p-2 text-sm flex flex-col justify-center gap-1">
                <p>地址： {transferToAccount?.address ?? "--"}</p>
                <p>持有股票： {transferToAccount?.stockBalance ?? "--"}</p>
                <p>持有以太幣： {transferToAccount?.ethBalance ?? "--"}</p>
              </div>
              <FormInput
                name="amounts"
                label="轉移張數"
                inputProps={{ type: "number" }}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full hover:bg-blue-400">購買</Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default Stocks;
