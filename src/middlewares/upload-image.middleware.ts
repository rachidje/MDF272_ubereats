import multer from "multer";
import { v4 } from "uuid";

const updloadImage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "images")
    },
    filename(req, file, callback) {
        callback(null, `${v4()}_${file.originalname}`)
    },
})

export const updloadOneImageMiddleware = multer({storage: updloadImage}).single("image");
export const updloadImagesMiddleware = multer({storage: updloadImage}).array("images", 10);