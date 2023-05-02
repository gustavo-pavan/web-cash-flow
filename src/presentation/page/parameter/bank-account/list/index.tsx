import { Edit, Delete } from "@mui/icons-material";
import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha, Box } from "@mui/system";
import React, { useEffect } from "react";
import { bankAccountsStates } from "../../components/atom/atom";
import { useRecoilState } from "recoil";
import { makeGetBankAccountFactory } from "@/main/factory/bank-account/get-bank-account.factory";

export const ListBankAccount: React.FC = () => {
  const theme = useTheme();

  const [bankAccountsState, setBankAccounts] =
    useRecoilState(bankAccountsStates);

  return (
    <Paper
      sx={{
        background:
          theme.palette.mode == "dark"
            ? theme.palette.background.paper
            : theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
        "&:hover": {
          boxShadow: `0px 2px 14px 1px  ${alpha(
            theme.palette.primary.main,
            0.2
          )}`,
        },
      }}
    >
      <Box>
        <Paper
          sx={{
            boxShadow: "none",
            background:
              theme.palette.mode == "dark"
                ? alpha(theme.palette.background.default, 0.4)
                : alpha(theme.palette.background.paper, 0.4),
            padding: 2,
            border: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="caption" component="span">
            Registers
          </Typography>
        </Paper>
        <List>
          {bankAccountsState?.bankAccounts?.map((bankAccount) => {
            return (
              <React.Fragment key={bankAccount.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{
                          marginRight: 2,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={bankAccount.name}  secondary={
                    <Box>
                        <Typography variant="caption" component="span" >
                          R${bankAccount.balance.toFixed(2)}
                        </Typography>
                      </Box>

                  }/>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};
