import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTruckRampBox,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Text } from "@chakra-ui/react";
import { toVar } from "../utils/highlight";

const Info = (text: string, color = "primary.100") => (
  <Box display="inline-block" paddingLeft="4px" color={color}>
    Status:
    <Text display="inline-block" paddingLeft="2px" textDecoration="underline">
      {text}
    </Text>
  </Box>
);

const Uploading = () => (
  <>
    <FontAwesomeIcon icon={faUpload} color={toVar("highlight.300")} />
    {Info("Uploading", toVar("primary.100"))}
  </>
);

const Parsing = () => (
  <>
    <FontAwesomeIcon icon={faTruckRampBox} color={toVar("highlight.300")} />
    {Info("Parsing", toVar("primary.100"))}
  </>
);

const Summarizing = () => (
  <>
    <FontAwesomeIcon icon={faPenToSquare} color={toVar("highlight.300")} />
    {Info("Summarizing", toVar("primary.100"))}
  </>
);

const Ready = () => (
  <>
    <FontAwesomeIcon icon={faCheck} color={toVar("highlight.200")} />
    {Info("Ready", toVar("primary.100"))}
  </>
);

const statusDisplayMap = {
  uploading: <Uploading />,
  parsing: <Parsing />,
  summarizing: <Summarizing />,
  ready: <Ready />,
};

export type LectureStatus = keyof typeof statusDisplayMap;

const StatusDisplay = ({ status }: { status: LectureStatus }) =>
  statusDisplayMap[status];

export default StatusDisplay;
