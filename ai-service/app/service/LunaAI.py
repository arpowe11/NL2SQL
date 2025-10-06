from typing import Any

from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory, BaseChatMessageHistory

import app.config as config


class LunaAI:
    def __init__(self, model: str=None, temp: float=0.5):
        load_dotenv(find_dotenv())

        if model is None:
            model = config.AI_MODEL

        self.llm = ChatOpenAI(model=model, temperature=temp)  # NOQA
        self.template_dir = config.TEMPLATES_PATH
        self.store = {}
        self.prompt = None
        self._load()

    def _load(self) -> None:
        try:
            with open(self.template_dir, "r") as prompt_file:
                print("[INFO] Templated loaded successfully.")
                self.prompt = prompt_file.read()
        except FileNotFoundError as e:
            print("[ERROR] Could not find template...", e)

    def _get_session_history(self, session_id: str) -> BaseChatMessageHistory:
        if session_id not in self.store:
            self.store[session_id] = InMemoryChatMessageHistory()
        return self.store[session_id]

    def executor(self, user_input: str, session_id: str) -> dict[str, Any]:

        prompt_template = ChatPromptTemplate.from_messages([
            ("system", self.prompt),
            MessagesPlaceholder("history"),
            ("human", "{input}")
        ])

        chain = prompt_template | self.llm

        conversational_chain = RunnableWithMessageHistory(
            chain,
            self._get_session_history,
            input_messages_key="input",
            history_messages_key="history",
        )

        response = conversational_chain.invoke(
            {"input": user_input},
            config={"configurable": {"session_id": session_id}}
        )

        return {"luna": response.content}
