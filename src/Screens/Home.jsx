import { Button, Text, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { renterApiService } from "../services/renterApiService";

function Home() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <div>
      <Text>Home</Text>
    </div>
  );
}

export default Home;
