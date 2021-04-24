import { Box, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ITrademark } from "../interfaces";
export interface ISearchItemProps {
  item: ITrademark; //must be changed
}

export const SearchItem = ({ item }: ISearchItemProps) => {
  const src =
    item?.image_url || item?.image || item?.image_path.includes("https")
      ? item?.image_path
      : `
                https://statsnet.co/static/trademarks/${item?.image_path}
              `;
  return (
    <Link href={`/trademarks/${item.id}`}>
      <a>
        <Box
          height={40}
          width={40}
          borderWidth="1px"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          overflow="hidden"
          mb={4}
        >
          <Image
            src={
              //@ts-ignore
              src
            }
            fallbackSrc="https://via.placeholder.com/160"
            alt={item.title}
            objectFit="contain"
          />
        </Box>
        <Flex
          direction="column"
          justify="flex-end"
          h="40%"
          alignItems="start"
          textAlign="left"
        >
          <Box maxW={40} fontSize="md" color="blue.500">
            {item.title}
          </Box>
          <Box maxW={40} fontSize="sm">
            {item.holder}
          </Box>
          <Box w="100%" fontSize="sm" color="gray.600">
            {item.holder_country && item.holder_country + "-"}
            {item.trademark_number ||
              item.registration_number ||
              item.application_number}{" "}
            · {item.source}
          </Box>
        </Flex>
      </a>
    </Link>
  );
};
