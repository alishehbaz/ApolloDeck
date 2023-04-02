import { Credentials, Error, ExecutionContext, ExtractPDF, FileRef } from '@adobe/pdfservices-node-sdk'
import { parse } from 'path'
import * as dotenv from "dotenv"
dotenv.config({ path: '../../.env' })

export async function extractPDF(fp: string) {
  try {
    // Credential setup
    const credentials: Credentials = Credentials
      .serviceAccountCredentialsBuilder()
      .withClientId(process.env.ADOBE_CLIENT_ID)
      .withClientSecret(process.env.ADOBE_CLIENT_SECRET)
      .withOrganizationId(process.env.ADOBE_ORGANIZATION_ID)
      .withAccountId(process.env.ADOBE_ACCOUNT_ID)
      .withPrivateKey(process.env.ADOBE_PRIVATE_KEY)
      .build()

    // .fromFile("../adobe-credentials.json")
    // .build()

    // Execution context
    const executionContext: ExecutionContext = ExecutionContext.create(credentials)

    // * Set options here
    const options: ExtractPDF.options.ExtractPdfOptions = new ExtractPDF.options.ExtractPdfOptions.Builder()
      .addElementsToExtract(ExtractPDF.options.ExtractElementType.TEXT)
      .addElementsToExtract(ExtractPDF.options.ExtractElementType.TABLES)
      .addElementsToExtractRenditions(ExtractPDF.options.ExtractRenditionsElementType.FIGURES)
      .addElementsToExtractRenditions(ExtractPDF.options.ExtractRenditionsElementType.TABLES)
      .build()

    // Create operation
    const extractPDFOperation: ExtractPDF.Operation = ExtractPDF.Operation.createNew()

    // Set input from PDF file
    const input: FileRef = FileRef.createFromLocalFile(
      fp,
      ExtractPDF.SupportedSourceFormat.pdf
    )

    // Set operation input from a source file.
    extractPDFOperation.setInput(input)

    // Set options
    extractPDFOperation.setOptions(options)

    //Generating a file name
    let outputFilePath: string = createOutputFilePath()

    extractPDFOperation.execute(executionContext)
      .then(result => result.saveAsFile(outputFilePath))
      .catch(err => {
        if (err instanceof Error.ServiceApiError
          || err instanceof Error.ServiceUsageError) {
          console.log('Exception encountered while executing operation', err)
        } else {
          console.log('Exception encountered while executing operation', err)
        }
      })

    //Generates a string containing a directory structure and file name for the output file.
    function createOutputFilePath(): string {
      let date: Date = new Date()
      let dateString: string = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + "-" +
        ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2)
      return ("output/" + dateString + "_" + parse(fp).name + ".zip")
    }

  } catch (err) {
    console.log('Exception encountered while executing operation', err)
  }
}
