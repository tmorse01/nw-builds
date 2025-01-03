import React from "react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

const AboutPage: React.FC = () => {
  return (
    <Container size="md" py="xl">
      <Box mb="lg">
        <Title order={1} mb="sm">
          About Me
        </Title>
        <Divider size="md" mb="sm" />
        <Text size="lg" c="dimmed">
          Hello! My name is Grimz. I'm a passionate web developer with a love for New World and
          exploring all different types of builds. I created this site to share some of my favorite
          builds and connect with like-minded adventurers.
        </Text>
      </Box>

      <Title order={2} mt="xl" mb="sm">
        Connect with me
      </Title>
      <Divider size="sm" mb="sm" />
      <List spacing="sm" size="md">
        <List.Item>
          <Group>
            <ThemeIcon size={24} radius="xl">
              <IconBrandTwitter size={16} />
            </ThemeIcon>
            <Anchor href="https://twitter.com/51grimz" target="_blank" rel="noopener noreferrer">
              Twitter
            </Anchor>
          </Group>
        </List.Item>
        <List.Item>
          <Group>
            <ThemeIcon size={24} radius="xl">
              <IconBrandGithub size={16} />
            </ThemeIcon>
            <Anchor href="https://github.com/tmorse01" target="_blank" rel="noopener noreferrer">
              GitHub
            </Anchor>
          </Group>
        </List.Item>
      </List>
    </Container>
  );
};

export default AboutPage;
