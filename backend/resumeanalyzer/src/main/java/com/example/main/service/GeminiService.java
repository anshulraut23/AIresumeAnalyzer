//package com.example.main.service;
//
//import com.example.main.dto.AnalysisResponse;
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.nio.charset.StandardCharsets;
//import java.util.List;
//
//@Service
//public class GeminiService {
//
//    private final String API_KEY = "APIKEY";
//
//    public AnalysisResponse analyzeResume(String resumeText, String jobDescription) throws Exception {
//
//        String prompt = """
//Analyze this resume against the provided job description.
//
//Return ONLY valid JSON.
//
//Format:
//{
//  "score": 85,
//  "missingSkills": [],
//  "strengths": [],
//  "weaknesses": [],
//  "suggestions": [],
//  "recommendedKeywords": [],
//  "summary": ""
//}
//
//Resume:
//""" + resumeText + """
//
//Job Description:
//""" + jobDescription;
//
//        URL url = new URL(
//        	    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
//        	    + API_KEY);
//
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//        conn.setRequestMethod("POST");
//        conn.setRequestProperty("Content-Type", "application/json");
//        conn.setDoOutput(true);
//
//        JSONObject body = new JSONObject();
//
//        JSONArray contents = new JSONArray();
//
//        JSONObject content = new JSONObject();
//
//        JSONArray parts = new JSONArray();
//
//        JSONObject part = new JSONObject();
//
//        part.put("text", prompt);
//
//        parts.put(part);
//
//        content.put("parts", parts);
//
//        contents.put(content);
//
//        body.put("contents", contents);
//
//        try (OutputStream os = conn.getOutputStream()) {
//            byte[] input = body.toString().getBytes(StandardCharsets.UTF_8);
//            os.write(input, 0, input.length);
//        }
//
//        int responseCode = conn.getResponseCode();
//
//        InputStream stream;
//
//        if (responseCode >= 400) {
//            stream = conn.getErrorStream();
//        } else {
//            stream = conn.getInputStream();
//        }
//
//        BufferedReader br = new BufferedReader(
//                new InputStreamReader(stream, StandardCharsets.UTF_8));
//
//        StringBuilder response = new StringBuilder();
//
//        String responseLine;
//
//        while ((responseLine = br.readLine()) != null) {
//            response.append(responseLine.trim());
//        }
//
//        br.close();
//
//        System.out.println("FULL GEMINI RESPONSE:");
//        System.out.println(response);
//
//        JSONObject jsonResponse = new JSONObject(response.toString());
//
//        // HANDLE API ERRORS
//        if (!jsonResponse.has("candidates")) {
//
//            String errorMessage = "Gemini API Error";
//
//            if (jsonResponse.has("error")) {
//                errorMessage = jsonResponse
//                        .getJSONObject("error")
//                        .getString("message");
//            }
//
//            throw new RuntimeException(errorMessage);
//        }
//
//        String text =
//                jsonResponse
//                        .getJSONArray("candidates")
//                        .getJSONObject(0)
//                        .getJSONObject("content")
//                        .getJSONArray("parts")
//                        .getJSONObject(0)
//                        .getString("text");
//
//        text = text.replace("```json", "")
//                   .replace("```", "")
//                   .trim();
//
//        JSONObject result = new JSONObject(text);
//
//        return new AnalysisResponse(
//                result.getInt("score"),
//                jsonArrayToList(result.getJSONArray("missingSkills")),
//                jsonArrayToList(result.getJSONArray("strengths")),
//                jsonArrayToList(result.getJSONArray("weaknesses")),
//                jsonArrayToList(result.getJSONArray("suggestions")),
//                jsonArrayToList(result.getJSONArray("recommendedKeywords")),
//                result.getString("summary")
//        );
//    }
//
//    private List<String> jsonArrayToList(JSONArray array) {
//        return array.toList()
//                .stream()
//                .map(Object::toString)
//                .toList();
//    }
//}













package com.example.main.service;

import com.example.main.dto.AnalysisResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class GeminiService {

    // PASTE YOUR OPENROUTER API KEY HERE
    private final String API_KEY = "API_KEY_HERE";

    public AnalysisResponse analyzeResume(String resumeText, String jobDescription) throws Exception {

    	String prompt = """
    			You are an expert ATS Resume Analyzer.

    			Analyze the resume against the job description carefully.

    			Return ONLY valid JSON.

    			Rules:
    			- Give realistic ATS score
    			- Provide meaningful strengths
    			- Provide useful weaknesses
    			- Give professional suggestions
    			- Add relevant recommended keywords
    			- Always fill all fields properly
    			- Never leave arrays empty unless absolutely necessary

    			JSON Format:
    			{
    			  "score": 85,
    			  "missingSkills": [],
    			  "strengths": [],
    			  "weaknesses": [],
    			  "suggestions": [],
    			  "recommendedKeywords": [],
    			  "summary": ""
    			}

    			Resume:
    			""" + resumeText + """

    			Job Description:
    			""" + jobDescription;
    	
    	
        // OPENROUTER API URL
        URL url = new URL(
                "https://openrouter.ai/api/v1/chat/completions"
        );

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");

        conn.setRequestProperty("Content-Type", "application/json");

        conn.setRequestProperty(
                "Authorization",
                "Bearer " + API_KEY
        );

        conn.setDoOutput(true);

        // REQUEST BODY
        JSONObject body = new JSONObject();

        body.put("model", "openai/gpt-3.5-turbo");

        JSONArray messages = new JSONArray();

        JSONObject message = new JSONObject();

        message.put("role", "user");

        message.put("content", prompt);

        messages.put(message);

        body.put("messages", messages);

        // SEND REQUEST
        try (OutputStream os = conn.getOutputStream()) {

            byte[] input =
                    body.toString().getBytes(StandardCharsets.UTF_8);

            os.write(input, 0, input.length);
        }

        // READ RESPONSE
        InputStream stream;

        if (conn.getResponseCode() >= 400) {

            stream = conn.getErrorStream();

        } else {

            stream = conn.getInputStream();
        }

        BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        stream,
                        StandardCharsets.UTF_8
                )
        );

        StringBuilder response = new StringBuilder();

        String responseLine;

        while ((responseLine = br.readLine()) != null) {

            response.append(responseLine.trim());
        }

        br.close();

        System.out.println("FULL OPENROUTER RESPONSE:");
        System.out.println(response);

        JSONObject jsonResponse =
                new JSONObject(response.toString());

        // HANDLE API ERRORS
        if (!jsonResponse.has("choices")) {

            throw new RuntimeException(
                    "OpenRouter API Error: " + response
            );
        }

        // EXTRACT AI RESPONSE
        String text =
                jsonResponse
                        .getJSONArray("choices")
                        .getJSONObject(0)
                        .getJSONObject("message")
                        .getString("content");

        // CLEAN JSON RESPONSE
        text = text.replace("```json", "")
                   .replace("```", "")
                   .trim();

        JSONObject result = new JSONObject(text);

        // RETURN RESPONSE DTO
        return new AnalysisResponse(

                result.getInt("score"),

                jsonArrayToList(
                        result.getJSONArray("missingSkills")
                ),

                jsonArrayToList(
                        result.getJSONArray("strengths")
                ),

                jsonArrayToList(
                        result.getJSONArray("weaknesses")
                ),

                jsonArrayToList(
                        result.getJSONArray("suggestions")
                ),

                jsonArrayToList(
                        result.getJSONArray("recommendedKeywords")
                ),

                result.getString("summary")
        );
    }

    private List<String> jsonArrayToList(JSONArray array) {

        return array.toList()
                .stream()
                .map(Object::toString)
                .toList();
    }
}