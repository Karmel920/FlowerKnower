# import uvicorn

from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.image_preprocessing import preprocess_image_url, preprocess_image_img
from app.neural_network import make_prediction

app = FastAPI()

origins = [
    "http://localhost:8080", # backend
    "http://localhost:80", # frontend
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:80"
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Image(BaseModel):
    image: str = ""


@app.get('/')
def index():
    return {
        'message': "ML model API",
        'routes': ['POST /predict/img',
                   'POST /predict/url']
    }


@app.post("/predict/img")
async def predict(image: UploadFile):
    if image is None or image.file is None:
        return {"message": "No image provided"}
    
    extension = image.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return {"message": "Please provide an jpg or png image"}
    
    image = image.file
    image = preprocess_image_img(image)

    return make_prediction(image)


@app.post("/predict/url")
async def predict(image: Image):
    image = image.image

    if image == "":
        return {"message": "No image link provided"}
    
    image = preprocess_image_url(image)

    return make_prediction(image)


# if __name__ == '__main__':
#     uvicorn.run(app,
#                 host='127.0.0.1',
#                 port=5000
#                 )
