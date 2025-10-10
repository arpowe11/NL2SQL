import React from "react";

const chatWindowStyles: { [key: string]: React.CSSProperties} = {
    container: {
        width: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#fafafa",
    },
    header: {
        backgroundColor: "#000000",
        width: "100%",   // full width of container
        height: "50px",  // set a height
        margin: "-10px -10px 0 -10px", // negate container padding
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "0 10px", // internal padding if needed
    },
    chatBox: {
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "10px",
    },
    form: {
        display: "flex",
        gap: "8px",
    },
    input: {
        flex: 1,
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    submitButton: {
        padding: "8px 12px",
        backgroundColor: "#095cbd",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    userMsg: {
        alignSelf: "flex-end",
        backgroundColor: "#3c86d8",
        padding: "8px",
        borderRadius: "6px",
    },
    aiMsg: {
        alignSelf: "flex-start",
        backgroundColor: "#8a7d7d",
        padding: "8px",
        borderRadius: "6px",
    },
};

export default chatWindowStyles;
