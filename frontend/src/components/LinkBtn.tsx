import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Box, Link as CLink } from "@chakra-ui/react";
import getHighlightStyle, { toVar } from "../utils/highlight";

const LinkBtn = ({
  to,
  content,
  icon,
}: {
  to: string;
  content: string;
  icon: IconProp;
}) => {
  const highlightStyle = getHighlightStyle("90%");
  return (
    <Box>
      <CLink as={Link} to={to} {...highlightStyle(true)}>
        <FontAwesomeIcon color={toVar("primary.100")} icon={icon} /> {content}
      </CLink>
    </Box>
  );
};

export default LinkBtn;
