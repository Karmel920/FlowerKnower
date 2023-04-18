import uvicorn

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel

from app.image_preprocessing import preprocess_image, load_image_from_url, decode_image
from app.neural_network import make_prediction

app = FastAPI()


class ImageURL(BaseModel):
    image: str = ""


@app.get('/')
def index():
    return {'message': 'Hello, World'}


@app.post("/predict/img")
async def predict(image: UploadFile = File(...)):
    if image is None or image.file is None:
        return {"message": "No image provided"}

    extension = image.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return {"message": "Please provide an jpg or png image"}

    image_pred = decode_image(image.file)
    image_pred = preprocess_image(image_pred)
    return make_prediction(image_pred)


@app.post("/predict/url")
async def predict(image: ImageURL):
    image = image.image
    if image == "":
        return {"message": "No image link provided"}

    image = load_image_from_url(image)
    image = preprocess_image(image)
    return make_prediction(image)


if __name__ == '__main__':
    uvicorn.run(app,
                host='127.0.0.1',
                port=5000
                )
