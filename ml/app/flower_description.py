import wikipediaapi

# initialize Wikipedia object in english
wiki_wiki = wikipediaapi.Wikipedia('en')


def get_description(flower_name):
    # Calling the Wikipedia api to return the description of the flower
    description = ''
    page_pred = wiki_wiki.page(flower_name)
    if page_pred.exists():
        description = page_pred.summary

    return description
