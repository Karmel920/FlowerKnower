import os

import tensorflow_hub as hub
import numpy as np

from tensorflow.keras.models import load_model

from app.definitions import MODELS_PATH
from .flower_description import get_description

# large dataset(1000 photots per class) - 5 species
# flower_categories = ['bellis', 'dandelion', 'rose', 'sunflower', 'tulip']

# Small dataset(200 photos per flower class) - 15 species
# flower_categories = ['ivy', 'dracaena_(plant)' , 'viola_(plant)', 'crocus' , 'poppy', 'dandelion', 'forget-me-not', 'fern', 'snowdrop', 'rose', 'sunflower', 'bellis', 'orchid', 'tulip', 'cherry']

# Small dataset(200 photos per flower class) - 20 species
flower_categories = ['knapweed', 'dahlia', 'viola_(plant)', 'echinacea', 'clover', 'crocus', 'daylily', 'poppy', 'sword lily', 'dandelion', 'calendula', 'forget-me-not', 'fern', 'snowdrop', 'rose', 'sunflower', 'bellis', 'orchid', 'muscari', 'tulip']


def load_model_pred():
    path = os.path.join(MODELS_PATH, 'flowers_20_small_data.h5')
    path = path.replace(os.sep, '/')
    load = load_model(path, custom_objects={"KerasLayer": hub.KerasLayer})
    return load


model = load_model_pred()


def make_prediction(image):
    global model

    if model is None:
        model = load_model_pred()

    predicted = model.predict(image).tolist()[0]
    predicted_label = np.argmax(predicted)

    pred_class = flower_categories[predicted_label]

    description = get_description(pred_class)

    data = {"predicted_class": pred_class, "description": description}

    return data
