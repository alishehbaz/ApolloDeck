import * as React from "react";
import {
  Grid,
  GridItem,
  SimpleGrid,
  Box,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import TutorImg from "../assets/tutor.jpg";
import getHighlightStyle, { toVar } from "../utils/highlight";
import LinkBtn from "../components/LinkBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faIndustry, faGlobe } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const highlightStyle = getHighlightStyle();
  const highlightStyleWide = getHighlightStyle("90%");
  return (
    <SimpleGrid columns={2} spacing={10} padding={10}>
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap="10"
        padding="10%"
        paddingTop="20%"
        textAlign="center"
      >
        <GridItem rowSpan={1} colSpan={3}>
          <Heading>
            <FontAwesomeIcon color={toVar("primary.100")} icon={faGlobe} />
            Lectures of the future
          </Heading>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} fontSize="2rem">
          <LinkBtn to="/generate" content="Get Started" icon={faPlay} />
          <LinkBtn to="/courses" content="My Courses" icon={faIndustry} />
        </GridItem>
      </Grid>
      <Box>
        <img width="80%" src={TutorImg} />
        <Box paddingRight="20%" textAlign="right">
          <Link {...highlightStyleWide(true)} fontSize={32}>
            ProfessorPrep
          </Link>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default Home;
