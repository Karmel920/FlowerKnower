import numpy as np
import urllib

from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from io import BytesIO


def preprocess_image(image_url):
    with urllib.request.urlopen(image_url) as url:
        image_pred = load_img(BytesIO(url.read()), target_size=(224, 224))

    image_pred = img_to_array(image_pred)
    image_pred = np.expand_dims(image_pred, axis=0)

    return image_pred
