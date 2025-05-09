# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
# --------------------------------------------------------------------------

"""
FILE: sample_analyze_sentiment.py

DESCRIPTION:
    This sample demonstrates how to analyze sentiment in documents.
    An overall and per-sentence sentiment is returned.

    In this sample we will be a skydiving company going through reviews people have left for our company.
    We will extract the reviews that we are certain have a positive sentiment and post them onto our
    website to attract more divers.

USAGE:
    python sample_analyze_sentiment.py

    Set the environment variables with your own values before running the sample:
    1) AZURE_LANGUAGE_ENDPOINT - the endpoint to your Language resource.
    2) AZURE_LANGUAGE_KEY - your Language subscription key
"""


def sample_analyze_sentiment() -> None:

    # [START analyze_sentiment]
    import os
    from azure.core.credentials import AzureKeyCredential
    from azure.ai.textanalytics import TextAnalyticsClient

    endpoint = os.environ["AZURE_LANGUAGE_ENDPOINT"]
    key = os.environ["AZURE_LANGUAGE_KEY"]

    text_analytics_client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))

    documents = [
        "Estou achando o bootcamp da XP Inc. na plataforma DIO muito bom",
        "Aquele restaurante que fomos na semana passada era horrível",
        "Estão dizendo que o novo filme em cartaz é incrível, estou ansioso para assistir"
    ]


    result = text_analytics_client.analyze_sentiment(documents, show_opinion_mining=True)
    docs = [doc for doc in result if not doc.is_error]

    print("Let's visualize the sentiment of each of these documents")
    for idx, doc in enumerate(docs):
        print(f"Document text: {documents[idx]}")
        print(f"Overall sentiment: {doc.sentiment}")
    # [END analyze_sentiment]

    print("Now, let us extract all of the positive reviews")
    positive_reviews = [doc for doc in docs if doc.sentiment == 'positive']

    positive_reviews = [
        review for review in positive_reviews
        if review.confidence_scores.positive >= 0.9
    ]

    positive_reviews_final = []
    for idx, review in enumerate(positive_reviews):
        print(f"Looking at positive review #{idx + 1}")
        any_sentence_not_positive = False
        for sentence in review.sentences:
            print("...Sentence '{}' has sentiment '{}' with confidence scores '{}'".format(
                sentence.text,
                sentence.sentiment,
                sentence.confidence_scores
                )
            )
            if sentence.sentiment != 'positive':
                any_sentence_not_positive = True
        if not any_sentence_not_positive:
            positive_reviews_final.append(review)

    print("We now have the final list of positive reviews we are going to display on our website!")


if __name__ == '__main__':
    sample_analyze_sentiment()