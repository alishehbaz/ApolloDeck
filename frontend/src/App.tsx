import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import WithNavBar from "./layouts/WithNavBar";
import Lectures from "./pages/Lectures";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<WithNavBar />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lecture/:lectureId" element={<Lectures />} />
            <Route path="lectures/:courseId" element={<Lectures />} />
            <Route path="generate" element={<Home />} />
            <Route path="login" element={<Home />} />
            <Route path="*" element={<Navigate to="home" />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
