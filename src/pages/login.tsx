/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";
import { yariga } from '../assets';

// Todo: Update your Google Client ID here

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: import.meta.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
        sx={{
            backgroundColor: '#fcfcfc'
        }}
    >
        <Container
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
            >

            <Box
                display="flex"
                gap="36px"
                justifyContent="center"
                flexDirection="column"
                >
                <div>
                    <img src={yariga} alt="Yariga Logo" />
                </div>
                <Box>
                    <GoogleButton />
                </Box>
            </Box>
        </Container>
    </Box>
  );
};
