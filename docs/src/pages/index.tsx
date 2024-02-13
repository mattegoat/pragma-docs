import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import "./styles.module.css";
import styled from "@emotion/styled";

import Discord from "@site/static/img/discord.svg";
import Twitter from "@site/static/img/twitter.svg";

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import SearchBar from "@theme-original/SearchBar";
import ecosystem from "./assets/ecosystem.svg";
import ecosystemSmall from "./assets/ecosystemSmall.svg";

import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatIcon,
  CodeIcon,
} from "@heroicons/react/outline";
import BasicHero from "../components/BasicHero";
import BoxContainer from "../components/BoxContainer";
import GettingStarted from "../components/GettingStarted";
import DeveloperLink from "../components/DeveloperLink";
import Help from "../components/Help";
import SocialWrapper from "../components/SocialWrapper";
import Footer from "../components/Footer";
import LatestNews from "../components/LatestNews";

export const actions = [
  {
    title: "What is Pragma",
    href: "#",
    icon: InformationCircleIcon,
    to: "./introduction",
    text: `Learn about the Pragma protocol. Core concepts, vision and next developments.`,
  },
  {
    title: "Use Pragma",
    href: "#",
    icon: BookOpenIcon,
    to: "./Resources/Cairo%201/data-feeds/consuming-data",
    text: `Get started using Pragma. Integrate Price feeds, VRF and more in your smart-contracts.`,
  },
  {
    title: "Quickstart",
    href: "#",
    icon: QuestionMarkCircleIcon,
    to: "./howItWorks/architecture",
    text: `New to Validity Rollups? Get started right now and explore the key concepts using high computation.`,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1500px;
`;

export default function Home() {
  return (
    <Layout
      title={`Pragma Documentation`}
      description="Technical Documentation For The Pragma Protocol"
      image={useBaseUrl("/img/background.jpg")}
    >
      <Container>
        <BasicHero
          title={"Welcome to the"}
          greenTitle={"Pragma Documentation"}
          description={
            "Get started with the Pragma smart-contracts, the leading oracle on Starknet and zk-Rollups. Use our architecture to unlock access to composable and verifiable data."
          }
        />
        <BoxContainer>
          <GettingStarted />
        </BoxContainer>
        <BoxContainer>
          <DeveloperLink />
        </BoxContainer>
        <Help />
        <BoxContainer>
          <SocialWrapper />
        </BoxContainer>
        <BoxContainer>
          <LatestNews />
        </BoxContainer>
        <Footer />
      </Container>
    </Layout>
  );
}
