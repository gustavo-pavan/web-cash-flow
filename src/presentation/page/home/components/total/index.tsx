import {
  Paper,
  Box,
  alpha,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { flowStates } from "../atom/atom";
import { BankAccount } from "@/domain/entity/bank-account";
import { EFlowType } from "@/domain/entity/flow-parameter";
import { makeGetBankAccountFactory } from "@/main/factory/bank-account/get-bank-account.factory";

interface State {
  account: number;
  debit: number;
  credit: number;
  total: number;
}

export const TableTotal: React.FC = () => {
  const theme = useTheme();

  const getAccounts = makeGetBankAccountFactory();

  const [flows, setFlows] = useRecoilState(flowStates);

  const [state, setState] = React.useState<State>();
  const [accounts, setAccounts] = React.useState<BankAccount[]>();

  useEffect(() => {
    getAccounts.request().then((data) => setAccounts(data));
  }, []);

  useEffect(() => {
    let credit = 0;
    let debit = 0;
    let accountBalance = 0;

    flows?.flowStates?.map((flow) => {
      if (flow.flowType == EFlowType.Credit) credit += flow.value;
      else debit += flow.value;
    });

    accounts?.map((x) => accountBalance += x.balance);

    let total = (credit + accountBalance) - debit;
    setState({
        account: accountBalance,
        credit : credit,
        debit: debit,
        total: total
    })
  }, [flows, accounts]);

  return (
    <Paper
      sx={{
        padding: 2,
        background:
          theme.palette.mode == "dark"
            ? theme.palette.background.paper
            : theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          backgroundImage: "none",
          border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
          backgroundColor: 
          theme.palette.mode == "dark"
          ?  alpha(theme.palette.background.default, 0.2)
          :  alpha(theme.palette.background.paper, 0.2),

          padding: 2,
          borderRadius: "8px",
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "25%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                  }}
                >
                  Balance Account
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                  }}
                >
                  ${state?.account.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                  }}
                >
                  Debit
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.error.main, 0.7),
                  }}
                >
                 -  ${state?.debit.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                  }}
                >
                  Credit
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: alpha(theme.palette.success.main, 0.7),
                  }}
                >
                  ${state?.credit.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ width: "100%", mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  ${state?.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
