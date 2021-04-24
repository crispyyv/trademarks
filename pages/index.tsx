import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Collapse,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { SearchItem } from "../components/SearchItem";
import { ITrademark } from "../interfaces";
import { classifications } from "../utils/sample-data";
import { useTM } from "../utils/TrademarksContext";
const removeUndefined = (o: Record<any, any>) =>
  Object.entries(o)
    .filter(([, val]) => val !== undefined)
    .reduce((result, [key, val]) => {
      //@ts-ignore
      result[key] = val;
      return result;
    }, {});

const IndexPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onToggle } = useDisclosure();
  const [selected, setSelected] = useState<Record<any, any>>({});
  const { trademark, fetchTM } = useTM();
  const [result, setResult] = useState<ITrademark[] | null | string>(trademark);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);
    const query = inputRef.current?.value || "";
    setIsLoading(true);
    const filters = Object.entries(selected).map(([key, val]) => val && key);
    const response: { data: ITrademark[] | null } = await fetchTM(
      query,
      filters
    );
    setIsLoading(false);

    setResult(response.data);
  };
  const router = useRouter();
  useEffect(() => {
    if (router && router.query.filters && isFirst) {
      setIsFirst(false);
      const toRender: Record<any, any> = {};
      (router.query.filters as string)
        .split(",")
        .map((el) => (toRender[el] = true));
      setSelected((prev) => ({
        ...prev,
        ...toRender,
      }));
      onToggle();
    }
  }, [router]);

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
          <FormControl
            as="form"
            onSubmit={(e: any) => searchHandler(e)}
            borderWidth={1}
            rounded="xl"
            shadow="sm"
          >
            <Flex
              h={70}
              display={{ sm: "flex", lg: "none" }}
              direction="row"
              alignItems="center"
              justify="center"
              // shadow="md"
              // borderWidth={1}
              rounded="xl"
              mb={2}
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
                onClick={() => {
                  if (isOpen === true) {
                    router.push({
                      pathname: router.pathname,
                    });
                    setSelected({});
                  }
                  onToggle();
                }}
              >
                Расширеный поиск
              </Button>
            </Flex>
            <InputGroup h={70} border={0} borderColor="transparent">
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
                      onClick={() => {
                        if (isOpen === true) {
                          router.push({
                            pathname: router.pathname,
                          });
                          setSelected({});
                        }
                        onToggle();
                      }}
                      transition="all ease-in"
                      transitionDuration="500ms"
                    >
                      {" "}
                      Расширеный поиск
                    </Button>
                  </HStack>
                }
                h="100%"
              />
            </InputGroup>
            <Collapse in={isOpen} animateOpacity>
              <Text p={3}>Выберите классы МКТУ для уточнения поиска</Text>

              <Flex h="auto" flexWrap="wrap">
                {classifications.map((e) => (
                  <Tag
                    m={2}
                    size="lg"
                    cursor="pointer"
                    borderRadius="full"
                    colorScheme={selected[e.id] ? "purple" : "gray"}
                    onClick={() => {
                      router.push({
                        pathname: router.pathname,
                        query: removeUndefined({
                          ...router.query,
                          filters: router.query.filters
                            ? router.query.filters + "," + e.id
                            : e.id,
                        }),
                      });
                      // console.log(router.query);
                      setSelected((prev) => ({ ...prev, [e.id]: !prev[e.id] }));
                    }}
                  >
                    <TagLabel>{e.id}</TagLabel>
                    {selected[e.id] && <TagCloseButton />}
                  </Tag>
                ))}
              </Flex>
            </Collapse>
          </FormControl>
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
              alignItems="start"
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
