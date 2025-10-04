import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ConfirmEmailProps {
  confirmLink?: string;
}

// Make sure to upload your logo to the `public/images` folder
// and update the path here if needed.
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://apostolicstudy.org";
const logoUrl = `${baseUrl}/images/logo-mark.svg`;

export const ConfirmSignUpEmail = ({
  confirmLink = "https://apostolicstudy.org", // Default link for previewing
}: ConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your sign-up to ApostolicStudy</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={logoUrl}
          width="48"
          height="48"
          alt="ApostolicStudy Logo"
          style={logo}
        />
        <Text style={paragraph}>Welcome to ApostolicStudy,</Text>
        <Text style={paragraph}>
          We're excited to have you on board. Please click the button below to
          confirm your email address and complete your registration.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="{{ .ConfirmationURL }}">
            Confirm Email
          </Button>
        </Section>
        <Text style={paragraph}>
          If you did not sign up for this account, you can safely ignore this
          email.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          ApostolicStudy - Bible study you can trust.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ConfirmSignUpEmail;

// --- Styles for the email ---
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: "#ededed",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#cccccc", // A slightly softer white for text
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#10b981", // Emerald-500 from your theme
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  fontWeight: "bold",
};

const hr = {
  borderColor: "#333333",
  margin: "20px 0",
};

const footer = {
  color: "#888888",
  fontSize: "12px",
};