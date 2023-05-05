import numpy as np
import urllib
from PIL import Image as PILImage

from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from io import BytesIO


def preprocess_image_url(image_url):
    with urllib.request.urlopen(image_url) as url:
        image_pred = load_img(BytesIO(url.read()), target_size=(224, 224))

    image_pred = img_to_array(image_pred)
    image_pred = np.expand_dims(image_pred, axis=0)

    return image_pred


def preprocess_image_img(image):
    image_data = image.read()
    image_pred = PILImage.open(BytesIO(image_data))
    image_pred = image_pred.resize((224, 224))
    image_pred = np.array(image_pred)
    image_pred = np.expand_dims(image_pred, axis=0)
    return image_pred
