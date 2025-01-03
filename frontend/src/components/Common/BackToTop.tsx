import React from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { Affix, Button, rem, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

export const BackToTop: React.FC = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Transition transition="slide-up" mounted={scroll.y > 300}>
        {(transitionStyles) => (
          <Button
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            variant="filled"
            color="blue"
          >
            <IconArrowUp size={20} />
            &nbsp; Back to Top
          </Button>
        )}
      </Transition>
    </Affix>
  );
};
