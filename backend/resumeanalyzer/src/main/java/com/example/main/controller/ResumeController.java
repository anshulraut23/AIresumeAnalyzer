package com.example.main.controller;

import com.example.main.dto.AnalysisResponse;
import com.example.main.service.GeminiService;
import com.example.main.service.PdfService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ResumeController {

    private final PdfService pdfService;

    private final GeminiService geminiService;

    public ResumeController(
            PdfService pdfService,
            GeminiService geminiService
    ) {
        this.pdfService = pdfService;
        this.geminiService = geminiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(

            @RequestParam MultipartFile file,

            @RequestParam String jobDescription

    ) {

        try {

            // FILE VALIDATION
            if (file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Please upload a PDF resume.");
            }

            // PDF VALIDATION
            if (!file.getOriginalFilename()
                    .toLowerCase()
                    .endsWith(".pdf")) {

                return ResponseEntity
                        .badRequest()
                        .body("Only PDF files are allowed.");
            }

            // JOB DESCRIPTION VALIDATION
            if (jobDescription == null ||
                    jobDescription.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Job description is required.");
            }

            // EXTRACT TEXT
            String resumeText =
                    pdfService.extractText(file);

            // EMPTY PDF CHECK
            if (resumeText == null ||
                    resumeText.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Could not read PDF content.");
            }

            // MINIMUM CONTENT CHECK
            if (resumeText.length() < 100) {

                return ResponseEntity
                        .badRequest()
                        .body("Please upload a valid resume PDF.");
            }

            // BASIC RESUME DETECTION
            String lowerText =
                    resumeText.toLowerCase();

            if (
                    !lowerText.contains("experience")
                            &&
                    !lowerText.contains("education")
                            &&
                    !lowerText.contains("skills")
            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Uploaded PDF does not appear to be a resume."
                        );
            }

            // AI ANALYSIS
            AnalysisResponse response =
                    geminiService.analyzeResume(
                            resumeText,
                            jobDescription
                    );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Error analyzing resume: "
                                    + e.getMessage()
                    );
        }
    }
}