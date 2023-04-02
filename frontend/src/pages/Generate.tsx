import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Upload from "../components/Upload";
import Centered from "../layouts/Centered";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postLecture } from "../services/lectures";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const { handleSubmit, register, watch } = useForm();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const pdfFile = watch("pdfFile");
  const pdfFileBytes = watch("pdfFileBytes");
  // const [file, setFile] = useState("");
  const onSubmit = (values: any) => {
    setPending(true);
    console.log("submitting", values);
    postLecture(values).then((data) => {
      setTimeout(() => {
        setPending(false);
        console.log(`redirecting to /lectures/${data.courseID}`);
        navigate(`/lectures/${data.courseID}`);
      }, 1000);
    });
  };

  return (
    <Centered padding="25%" heading="@ Generate - create your lecture slides!">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Upload Textbook</FormLabel>
          <Upload
            register={register}
            pdfFile={pdfFile}
            pdfFileBytes={pdfFileBytes}
          />
        </FormControl>
        <Input {...register("pdfFile")} placeholder="pdf URL" />
        <FormControl>
          <FormLabel>Course</FormLabel>
          <Input {...register("course")} placeholder="The name of the course" />
        </FormControl>
        <FormControl>
          <FormLabel>Tone</FormLabel>
          <Input
            {...register("tone")}
            placeholder="Explain the topics to college students"
          />
        </FormControl>
        <Checkbox {...register("generateNFT")} type="checkbox" marginTop="1rem">
          Generate NFT from slides
        </Checkbox>
        <Button
          isLoading={pending}
          marginTop={5}
          type="submit"
          display="block"
          bg="primary.100"
          color="white"
        >
          Generate Slides
        </Button>
      </form>
    </Centered>
  );
};

export default Generate;
