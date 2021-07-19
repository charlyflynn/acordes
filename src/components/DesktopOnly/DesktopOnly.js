import { Text, VerticalStack } from "components";

const DesktopOnly = () => (
  <VerticalStack>
    <Text as="p" textAlign="center">
      this app currently only works on desktop
    </Text>
    <Text as="p" textAlign="center">
      apologies!
    </Text>
  </VerticalStack>
);

export default DesktopOnly;
