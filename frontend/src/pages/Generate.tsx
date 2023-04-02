import { Box } from "@chakra-ui/react";
import Upload from "../components/Upload";
import Centered from "../layouts/Centered";
import { useState } from "react";

const Generate = () => {
  const [file, setFile] = useState("");
  return (
    <Centered padding="25%" heading="@ Generate - create your lecture slides!">
      <Upload value={file} setValue={setFile} />
    </Centered>
  );
};

export default Generate;
