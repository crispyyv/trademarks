import { Image } from "@chakra-ui/image";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ITrademark } from "../../interfaces";
import { headers } from "../../utils/fetch-helpers";
import { classifications } from "../../utils/sample-data";

export interface ITMProps {
  id: number;
  tm: ITrademark;
}
const mockData: ITrademark = {
  registration_number: "",
  application_number: "",
  application_date: "2000-12-14T00:00:00Z",
  classifications: "38",
  created_at: "2021-01-08T20:22:44.568584Z",
  deleted_at: null,
  exp_date: "2009-11-16T00:00:00Z",
  holder: "Акционерное общество «Казпочта»(KZ)",
  holder_country: "KZ",
  id: 28787,
  image: "http://gosreestr.kazpatent.kz/Trademark/Details?docNumber=56817",
  image_url: "",
  image_path: "",
  origin: "",
  registration_date: "2000-12-14T00:00:00Z",
  source: "Казпатент",
  status: "Действует",
  title: "ЕМS КАZРОSТ",
  trademark_number: "11086",
  updated_at: "2021-01-08T20:22:44.568584Z",
};
const TM = ({ tm }: ITMProps) => {
  const [data, setData] = useState<ITrademark | null>();
  useEffect(() => {
    if (!tm) {
      setData(mockData);
    } else {
      setData(tm);
    }
    return () => {
      setData(null);
    };
  }, []);

  return (
    <Layout title={`Торговые марки - ${data?.title}`}>
      <Grid w="full" templateColumns="repeat(4,1fr)">
        <GridItem colSpan={2}>
          <VStack spacing={4} alignItems="start" mb={8}>
            <Text color="gray.500">
              Товарный знак №{data?.trademark_number}
            </Text>
            <Heading size="lg">{data?.title}</Heading>
            <Text color="blue.500">{data?.status}</Text>
          </VStack>

          <VStack spacing={2} alignItems="start">
            <Text fontWeight="bold">Заявка подана</Text>
            <Text>
              {new Date(data?.application_date || "").toLocaleDateString(
                "ru-RU",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
            <Text fontWeight="bold">Номер регистрации</Text>
            <Text>{data?.trademark_number}</Text>{" "}
            <Text fontWeight="bold">Статус</Text>
            <Text>{data?.status}</Text>
            <Text fontWeight="bold">Правообладатель</Text>
            <Text>{data?.holder}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={1} />
        <GridItem colSpan={1}>
          <Box boxSize="104px" mb={8} display="flex" justifyContent="center">
            <Image
              src={
                //@ts-ignore
                data?.image_url ||
                data?.image ||
                data?.image_path.includes("https")
                  ? data?.image_path
                  : `
                    https://statsnet.co/static/trademarks/${data?.image_path}
                  `
              }
              fallbackSrc="https://via.placeholder.com/160"
              alt={data?.title}
              objectFit="contain"
            />
          </Box>

          <VStack spacing={2} alignItems="start">
            <Text fontWeight="bold">Действует до</Text>
            <Text>
              {new Date(data?.exp_date || "").toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Text fontWeight="bold">Свидетельство</Text>
            <Text>{data?.classifications}</Text>{" "}
            <Text fontWeight="bold">Источник</Text>
            <Text>{data?.source}</Text>
          </VStack>
        </GridItem>
        <GridItem mt={8} colSpan={2}>
          <Heading size="md">Классы МКТУ</Heading>
          {data?.classifications.split(",").map((elem) =>
            classifications.map(
              (e) =>
                e.id === elem.trim() && (
                  <HStack alignItems="start" my={2} spacing={2}>
                    <Text>{e.id}</Text>
                    <Text>{e.text}</Text>
                  </HStack>
                )
            )
          )}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const { id } = context.query;
  try {
    const response = await fetch(
      "https://api.statsnet.co/api/dynamic/global/trademarks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers("drRN54UheELrwsNr2KjyAjBQKaU34RBc"),
        },
        body: JSON.stringify({ id_: parseInt(id as string) }),
      }
    );
    const result = await response.json();
    return { props: { id, tm: result.data } };
  } catch (err) {
    console.log(err);
  }
  return { props: { id } };
};
export default TM;
