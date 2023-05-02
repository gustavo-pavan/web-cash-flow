import { AccountBalance, Schema, Payments } from "@mui/icons-material";
import { Typography, Paper, AppBar, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { BankAccout } from "../../bank-account";
import { useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import {Tab as TabMui}  from "@mui/material";
import { TabPanel } from "../tab-panel";
import { PaymentType } from "../../payment-type";
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  interface State {
    numberformat: string;
  }
  

export const Tab: React.FC = () => {
    const theme = useTheme()
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index: number) => {
      setValue(index);
    };
  
    const [values, setValues] = React.useState<State>({ numberformat: "123444" });
  
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ numberformat: event.target.value });
    };
    
    return (
        <Box>
        <Paper
          sx={{
            borderRadius: 2,
            background:
              theme.palette.mode == "dark"
                ? theme.palette.background.paper
                : theme.palette.background.default,
          }}
        >
          <Box sx={{ padding: 2 }}>
            <AppBar
              position="static"
              sx={{
                background: "none",
                borderRadius: 2,
                boxShadow: "none",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                aria-label="tab-parameter"
              >
                <TabMui
                  label="Bank Account"
                  {...a11yProps(0)}
                  iconPosition="start"
                  icon={<AccountBalance />}
                />
                <TabMui
                  label="Flow Parameter"
                  {...a11yProps(1)}
                  iconPosition="start"
                  icon={<Schema />}
                />
                <TabMui
                  label="Payment Type"
                  {...a11yProps(2)}
                  iconPosition="start"
                  icon={<Payments />}
                />
              </Tabs>
            </AppBar>
            <Divider />
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <BankAccout />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <PaymentType />
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </Box>
    )
}