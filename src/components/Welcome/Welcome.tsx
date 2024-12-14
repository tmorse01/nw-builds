import { Anchor, Text, Title } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text inherit variant="gradient" component="span" gradient={{ from: "pink", to: "yellow" }}>
          NW Builds
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        A collection of builds for{" "}
        <Anchor href="https://www.newworld.com/en-us" size="lg">
          New World
        </Anchor>
        , a massively multiplayer online role-playing game by Amazon Game Studios.
      </Text>
    </>
  );
}
