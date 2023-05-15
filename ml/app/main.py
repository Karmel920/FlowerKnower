from fastapi import FastAPI, status, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from urllib.error import URLError

from image_preprocessing import preprocess_image_url, preprocess_image_img
from neural_network import make_prediction

app = FastAPI(
    title="Flower Classification",
    description="This API was built with FastAPI and exists to classify flowers sent by the user.",
    version="1.0.0",
    servers=[
        {
            "url": "http://localhost:5000",
            "description": "Development Server"
        }
    ],
)

origins = [
    "http://localhost:8080",  # backend
    "http://localhost:80", # frontend
    "http://localhost:9090",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:9090",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:80",
    "https://flowerknower-client.onrender.com",
    "https://flowerknower-server.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str


class Image(BaseModel):
    image: str = ""


speciesResponse = {200: {
    "description": "Species of the flower from image url",
    "content": {
        "application/json": {
            "example": {
                "species": "tulip"
            }
        }
    },
}}


@app.get('/', status_code=status.HTTP_200_OK, name="Index", summary="Returns the name of the API and info about routes",
         tags=["Routes"])
def index():
    return {
        'message': "ML model API",
        'routes': ['POST /predict/img',
                   'POST /predict/url']
    }


@app.post("/predict/img", name="PredictionImg", summary="Returns the species of the flower from image",
          responses={**speciesResponse,
                     422: {"model": Message, "description": "No image provided"},
                     415: {"model": Message, "description": "File has unsupported extension type"}
                     },
          tags=["Routes"])
async def predict(image: UploadFile):
    if image is None or image.file is None:
        return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            content={"message": "No image provided"})

    extension = image.filename.split(".")[-1] in ("jpg", "jpeg", "png", "JPG")
    if not extension:
        return JSONResponse(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                            content={"message": f"File {image.filename} has unsupported extension type"})

    image = image.file
    image = preprocess_image_img(image)

    return make_prediction(image)


@app.post("/predict/url", name="PredictionUrl", summary="Returns the species of the flower from image url",
          responses={**speciesResponse,
                     400: {"model": Message, "description": "Empty url"},
                     422: {"model": Message, "description": "Incorrect url"}
                     },
          tags=["Routes"])
async def predict(image: Image):
    image = image.image

    if image == "":
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "Empty url"})

    try:
        image = preprocess_image_url(image)
    except URLError as e:
        return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"message": "Incorrect url"})

    return make_prediction(image)
