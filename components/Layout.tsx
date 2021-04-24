import { Box, Container } from "@chakra-ui/layout";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Trademarks" }: Props) => (
  <Flex minH="100vh" w="100%" direction="column">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Box w="100%" mb="auto">
      <Container maxW="container.md" w="100%" p={3}>
        <Heading as="h1" size="md" px={3}>
          <Link href="/">
            <a>Товарные знаки</a>
          </Link>
        </Heading>
      </Container>
    </Box>
    <Box w="100%" flex={1} my={6} p={3}>
      <Container maxW="container.md" centerContent w="100%">
        {children}
      </Container>
    </Box>
  </Flex>
);

export default Layout;
