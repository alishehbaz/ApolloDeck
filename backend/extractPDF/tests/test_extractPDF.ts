import { extractPDF } from '../src/extractPDF'

const tests = [
  "compettitve_programerrs_handbook.pdf",
  "relevant-formulae.pdf",
  "se10.pdf",
  "sicp.pdf",
]

tests.forEach((path) => {
  console.log("Testing " + path)
  extractPDF(path)
})
