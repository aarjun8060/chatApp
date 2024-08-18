import { generateUploadURL } from "../../../services/fileupload.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

/**
 * @description:"Upload url at aws s3 bucket"
 */

const getFileUploadUrl = asyncHandler(async (req, res) => {
  try {
    const url = await generateUploadURL();
    console.log("url", url);

    if (!url) {
      return res.internalServerError({
        message: "file Upload having some issue",
      });
    }

    return res.success({
      message: "file Upload Successfully",
      data: url,
    });
  } catch (error) {
    console.log("error in fileUpload", error);
    return res.internalServerError({
      message: "file Upload is not done successfully",
    });
  }
});
export { getFileUploadUrl };
