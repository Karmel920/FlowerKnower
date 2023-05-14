import os
import numpy as np

from tensorflow.keras.models import load_model
from definitions import MODELS_PATH
from flower_description import get_description

flower_categories = ['crocus', 'bellis', 'dandelion', 'pansy', 'rose', 'snowdrop', 'sunflower', 'tulip']


def load_model_pred():
    path = os.path.join(MODELS_PATH, 'flowers_8_small_data_hq.h5')
    path = path.replace(os.sep, '/')
    load = load_model(path)
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
