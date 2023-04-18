import shutil

import numpy as np
import urllib

from PIL import Image
from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from tensorflow.image import resize
from io import BytesIO


def load_image_from_url(image_url):
    with urllib.request.urlopen(image_url) as url:
        image_pred = load_img(BytesIO(url.read()), target_size=(224, 224))
    return image_pred


# ERROR -> PIL.UnidentifiedImageError: cannot identify image file <_io.BytesIO object at ...>
def decode_image(img):
    byte_img_io = BytesIO()
    shutil.copyfileobj(img, byte_img_io)
    byte_img_io.seek(0)
    img = byte_img_io.read()
    img_dec = Image.open(BytesIO(img))
    img_dec = resize(img_dec, (224, 224))

    return img_dec


def preprocess_image(image):
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image / 255.0

    return image
