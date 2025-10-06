# TODO: Once you get the AI architecture into a class (and working), delete this file

from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory

# Global vars
load_dotenv(find_dotenv())
store = {}

try:
    with open("./prompts/prompt.txt", "r") as prompt_file:
        print("[INFO] File loaded successfully.")
        prompt = prompt_file.read()
except FileNotFoundError as e:
    print("[ERROR] Could not find file...", e)


def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]


def luna_ai(user_input: str, session_id: str) -> None:
    prompt_t = prompt
    llm = ChatOpenAI()

    prompt_template = ChatPromptTemplate.from_messages([
        ("system", prompt_t),
        MessagesPlaceholder("history"),
        ("human", "{input}")
    ])

    chain = prompt_template | llm

    conversational_chain = RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )

    response = conversational_chain.invoke(
        {"input": user_input},
        config={"configurable": {"session_id": session_id}}
    )
    print("Luna:", response.content)


def main() -> None:
    session_id = "user-1"

    print("Chat with Luna! Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit"]:
            break

        luna_ai(user_input=user_input, session_id=session_id)

if __name__ == "__main__":
    main()

