# import uvicorn

from fastapi import FastAPI
from pydantic import BaseModel

from app.image_preprocessing import preprocess_image
from app.neural_network import make_prediction

app = FastAPI()


class Image(BaseModel):
    image: str = ""


@app.get('/')
def index():
    return {'message': 'Hello, World'}


@app.post("/predict/img")
async def predict(image: Image):
    image = image.image
    image = preprocess_image(image)
    return make_prediction(image)


@app.post("/predict/url")
async def predict(image: Image):
    image = image.image
    if image == "":
        return {"message": "No image link provided"}

    image = preprocess_image(image)
    return make_prediction(image)


# if __name__ == '__main__':
#     uvicorn.run(app,
#                 host='127.0.0.1',
#                 port=5000
#                 )
