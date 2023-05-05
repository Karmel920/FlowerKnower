import numpy as np
from urllib import request

from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from io import BytesIO


def load_image_from_url(image_url):
    return request.urlopen(image_url)


def decode_image(img):
    return load_img(BytesIO(img.read()))


def preprocess_image(image):
    image = image.resize((224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0

    return image
