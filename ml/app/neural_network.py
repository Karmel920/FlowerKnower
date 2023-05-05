import os

import wikipediaapi
import tensorflow_hub as hub
import numpy as np

from tensorflow.keras.models import load_model

from app.definitions import MODELS_PATH

flower_categories = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip']


def load_model_pred():
    path = os.path.join(MODELS_PATH, 'flowers_second_model.h5')
    path = path.replace(os.sep, '/')
    load = load_model(path, custom_objects={"KerasLayer": hub.KerasLayer})
    return load


model = load_model_pred()

# initialize Wikipedia object in english
wiki_wiki = wikipediaapi.Wikipedia('en')


def make_prediction(image):
    global model

    if model is None:
        model = load_model_pred()

    predicted = model.predict(image).tolist()[0]
    predicted_label = np.argmax(predicted)

    pred_class = flower_categories[predicted_label]

    # Calling the Wikipedia api to return the description of the flower
    description = ''
    page_pred = wiki_wiki.page(pred_class)
    if page_pred.exists():
        description = page_pred.summary

    data = {"predicted_class": pred_class, "description": description}

    return data
