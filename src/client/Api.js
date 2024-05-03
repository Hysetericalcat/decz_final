import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3002", {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:3000 http://localhost:57886"
    }
});
const Api_key = 'AIzaSyC8YEfer5oDX-CfEzXijU9_JX2-pJMMFwQ';
const genAI = new GoogleGenerativeAI(Api_key);

const Api = () => {
    const [fields_, setFields] = useState(null);
    const [instructions_, setInstructions] = useState([]);
    const [input_, setInput] = useState(null);
    
    useEffect(() => {
        const run = async () => {
            try {
                if (fields_ && instructions_ && input_) {
                    const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
                    const promptData = {
                        rule: "check the field and instructions and check whether input is in the correct format if yes send response No error else send ERROR with instruction",
                        field: fields_,
                        instructions: instructions_,
                        inputs: input_
                    };
                    const promptString = `${promptData.rule}\nfield: ${promptData.field}\ninstructions: ${promptData.instructions}\ninput: ${promptData.inputs}`;
                    const result = await model.generateContent(promptString);
                    console.log("Result:", result);
                    if (result && result.response) {
                        const response = result.response;
                        if (response && response.text) {
                            const text = await response.text();
                            console.log("Generated text:", text);
                        } else {
                            throw new Error("Invalid response from the model.");
                        }
                    } else {
                        throw new Error("Invalid result returned from the model.");
                    }
                } else {
                    console.log("Not all required data is available yet.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        run();
    }, [fields_, instructions_, input_]);

    return (
        <div>
            {/* Any UI components can be added here if necessary */}
        </div>
    );
}

export default Api;
