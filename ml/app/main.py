import uvicorn

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from app.flower_description import get_description
from app.image_preprocessing import preprocess_image, load_image_from_url, decode_image
from app.neural_network import make_prediction

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:9090"
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageURL(BaseModel):
    image: str = ""


@app.get('/')
def index():
    return {'message': 'Flower prediction'}


@app.post("/predict/img")
async def predict(image: UploadFile = File(...)):
    if image is None or image.file is None:
        return {"message": "No image provided"}

    extension = image.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return {"message": "Please provide an jpg or png image"}

    image_pred = decode_image(image.file)
    image_pred = preprocess_image(image_pred)

    return get_flower_data_from_image(image_pred)


@app.post("/predict/url")
async def predict(image: ImageURL):
    image = image.image
    if image == "":
        return {"message": "No image link provided"}

    image = load_image_from_url(image)
    image = decode_image(image)
    image = preprocess_image(image)

    return get_flower_data_from_image(image)


def get_flower_data_from_image(image):
    flower_name = make_prediction(image)
    flower_description = get_description("rose")
    return {"predicted_class": flower_name, "description": flower_description}


if __name__ == '__main__':
    uvicorn.run(app,
                host='127.0.0.1',
                port=5000
                )
