import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Image,
  Avatar,
} from "@mantine/core";
import React, { useState } from "react";
import { Router } from "../routes/Router";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import views from "../routes/views";
import { NavLink } from "react-router-dom";

export const AppTemplate = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, setOpened] = useState(false);

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
  };

  const useStyles = createStyles((theme) => ({
    navLink: {
      display: "block",
      width: "100%",
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      textDecoration: "none",

      "&:hover": {
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
      },
    },
    navLinkActive: {
      backgroundColor:
        colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
    },
  }));

  const { colors } = useMantineTheme();

  const { classes } = useStyles();

  return (
    <AppShell
      header={{ height: 150 }}
      layout="default"
      navbar={{
        width: 300,
        zIndex: 1,

        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="xl"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
          <div className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center border-white border-4">
            <Image src="./fam-logo4.jpg" fit="cover" h={80} w={100} />
          </div>

          <div style={{ marginLeft: "auto" }}>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={40}
            >
              {colorScheme === "dark" ? (
                <SunIcon width={20} height={20} />
              ) : (
                <MoonIcon width={20} height={20} />
              )}
            </ActionIcon>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {views?.map((view, index) => (
          <NavLink
            align="left"
            to={view.path}
            key={index}
            onClick={() => setOpened(false)}
            className={({ isActive }) =>
              classes.navLink + " " + (isActive ? classes.navLinkActive : "")
            }
          >
            <Group>
              <Text>{view.name}</Text>
            </Group>
          </NavLink>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
};
