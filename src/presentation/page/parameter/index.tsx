import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  alpha,
} from "@mui/material";
import { AccountBalance, Payments, Schema } from "@mui/icons-material";
import { Input } from "@/presentation/components/input";
import { Add, Delete, Edit } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
interface State {
  numberformat: string;
}

export const Parameter: React.FC = () => {
  const theme = useTheme();
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
    <React.Fragment>
      <Paper
        sx={{
          height: 70,
          background: theme.palette.background.default,
          padding: 2,
          paddingLeft: 4,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          component="span"
          sx={{ color: theme.palette.text.secondary }}
        >
          Parameters
        </Typography>
      </Paper>

      <Box>
        <Paper
          sx={{
            borderRadius: 2,
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
                <Tab
                  label="Bank Account"
                  {...a11yProps(0)}
                  iconPosition="start"
                  icon={<AccountBalance />}
                />
                <Tab
                  label="Flow Parameter"
                  {...a11yProps(1)}
                  iconPosition="start"
                  icon={<Schema />}
                />
                <Tab
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.text.secondary,
                        0.1
                      )}`,
                      "&:hover": {
                        boxShadow: `0px 2px 14px 1px  ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Input name="Name *" placeholder="Name *" type="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          name="Description *"
                          placeholder="Description *"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          name="Balance *"
                          placeholder="Balance *"
                          type="text"
                          value={values.numberformat}
                          onChange={handleChangeInput}
                        />
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        disabled
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<Delete />}
                        sx={{
                          margin: 2,
                        }}
                      >
                        Del Account
                      </Button>

                      <Button
                        size="medium"
                        color="secondary"
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                          margin: 2,
                        }}
                      >
                        Add Account
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.text.secondary,
                        0.1
                      )}`,
                      "&:hover": {
                        boxShadow: `0px 2px 14px 1px  ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                      },
                    }}
                  >
                    <Box>
                      <Paper sx={{
                        boxShadow: "none",
                        background: alpha(theme.palette.background.default, 0.4),
                        padding: 2,
                        border: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
                        borderRadius: 2
                      }}>
                        <Typography variant="caption" component="span">Bank Account</Typography>
                      </Paper>
                      <List>
                        <ListItem
                          secondaryAction={
                            <Box>
                              <IconButton edge="end" aria-label="delete"  sx={{
                                marginRight: 2,
                                color: theme.palette.text.secondary
                              }}>
                                <Edit />
                              </IconButton>
                              <IconButton edge="end" aria-label="delete"  color="error">
                                <Delete  />
                              </IconButton>
                            </Box>
                          }
                        >
                          <ListItemText primary="Single-line item" />
                        </ListItem>
                      </List>
                      <Divider />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </Box>
    </React.Fragment>
  );
};
