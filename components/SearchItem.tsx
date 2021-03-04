import { Box, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ITrademark } from "../interfaces";

export interface ISearchItemProps {
  item: ITrademark; //must be changed
}

export const SearchItem = ({ item }: ISearchItemProps) => {
  return (
    <Box
      height={40}
      width={40}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={4}
    >
      <Link href={`/trademarks/${item.id}`}>
        <a>
          <Image src={item.image} alt={item.title} w="100%" h="60%" />
          <Flex
            direction="column"
            justify="flex-end"
            h="40%"
            alignItems="end"
            textAlign="left"
          >
            <Box w="100%" fontSize="md">
              {item.title}
            </Box>
            <Box w="100%" fontSize="sm">
              Товарный знак {item.holder_country} № {item.trademark_number}
            </Box>
          </Flex>
        </a>
      </Link>
    </Box>
  );
};
