import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  InputRightElement,
  HStack,
  Button,
  Flex,
  useDisclosure,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import Layout from "../components/Layout";
import { SearchItem } from "../components/SearchItem";
import { ITrademark } from "../interfaces";
import { useTM } from "../utils/TrademarksContext";

const IndexPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onToggle } = useDisclosure();
  const { trademark, fetchTM } = useTM();
  const [result, setResult] = useState<ITrademark[] | null | string>(trademark);
  const [isLoading, setIsLoading] = useState(false);
  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);
    const query = inputRef.current?.value || "";
    setIsLoading(true);
    const response: { data: ITrademark[] | null } = await fetchTM(query);
    setIsLoading(false);

    setResult(response.data);
  };
  console.log(result);
  return (
    <Layout title="Поиск по товарным знакам">
      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(2, auto)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem
          colSpan={6}
          rounded="xl"
          display="flex"
          flexDirection="column"
          gridGap={4}
        >
          <form onSubmit={(e: any) => searchHandler(e)}>
            <Flex
              h={70}
              display={{ sm: "flex", lg: "none" }}
              direction="row"
              alignItems="center"
              justify="center"
              shadow="md"
              borderWidth={1}
              rounded="xl"
            >
              <Button
                bg="purple.600"
                color="white"
                _hover={{ bg: "purple.300" }}
                my="2"
                mx="2"
                type="submit"
              >
                Поиск
              </Button>
              <Button
                variant="outline"
                rightIcon={
                  <SmallCloseIcon display={isOpen ? "block" : "none"} />
                }
                onClick={onToggle}
              >
                Расширеный поиск
              </Button>
            </Flex>
            <InputGroup h={70} rounded="xl" shadow="sm" borderWidth={1}>
              <InputLeftElement
                h="100%"
                pointerEvents="none"
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                ref={inputRef}
                type="text"
                variant="outline"
                placeholder="Введите товарный знак или название..."
                h="100%"
                size={"lg"}
                rounded="xl"
                color="gray.600"
                _focus={{
                  sm: {
                    borderColor: "transparent",
                  },
                  md: {
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px #9F7AEA ",
                  },
                }}
              />
              <InputRightElement
                width={["0%", "55%", "42%"]}
                display={{ sm: "none", lg: "flex" }}
                children={
                  <HStack>
                    <Button
                      bg="purple.600"
                      color="white"
                      _hover={{ bg: "purple.400" }}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Поиск
                    </Button>

                    <Button
                      variant="outline"
                      isLoading={isLoading}
                      rightIcon={
                        <SmallCloseIcon display={isOpen ? "block" : "none"} />
                      }
                      onClick={onToggle}
                      transition="all ease-in"
                      transitionDuration="500ms"
                    >
                      Расширеный поиск
                    </Button>
                  </HStack>
                }
                h="100%"
              />
            </InputGroup>
          </form>
        </GridItem>

        <GridItem colSpan={6}>
          <>
            <Heading size="md" mb="4">
              {result === null
                ? null
                : result !== null && result.length === 0
                ? "Ничего не найдено"
                : `Найдены товарные знаки:`}
            </Heading>
            <Flex
              justify={{ sm: "center", md: "space-between" }}
              alignItems="center"
              flexWrap="wrap"
            >
              {(Array.isArray(result) &&
                result.length > 0 &&
                result.map((item, idx) => (
                  <SearchItem item={item} key={idx} />
                ))) ||
                (isLoading && (
                  <>
                    <Skeleton
                      height={40}
                      width={40}
                      borderWidth="1px"
                      borderRadius="lg"
                    />
                    <Skeleton
                      height={40}
                      width={40}
                      borderWidth="1px"
                      borderRadius="lg"
                    />{" "}
                    <Skeleton
                      height={40}
                      width={40}
                      borderWidth="1px"
                      borderRadius="lg"
                    />{" "}
                    <Skeleton
                      height={40}
                      width={40}
                      borderWidth="1px"
                      borderRadius="lg"
                    />
                  </>
                ))}
            </Flex>
          </>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
