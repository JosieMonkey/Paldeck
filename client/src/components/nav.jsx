import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Stack, Button, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Nav = (props) => {
  const { title } = props;
  return (
    <header>
      <ThemeProvider theme={darkTheme}>
        <nav className="nav">
          <div className="left">
            <Stack direction="row" spacing={2}>
              <Button
                component={RouterLink}
                underline="none"
                variant="contained"
                href="#"
                to="/"
              >
                Paldeck
              </Button>
              <br />
              <Button
                component={RouterLink}
                underline="none"
                variant="contained"
                href="#"
                to="/addpal"
              >
                Add Pal
              </Button>
            </Stack>
          </div>
          <div className="right">
            <h1 style={{ fontSize: "36px" }}>{title}</h1>
          </div>
        </nav>
      </ThemeProvider>
    </header>
  );
};

export default Nav;
