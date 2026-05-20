package com.example.main.dto;

import java.util.List;

public class AnalysisResponse {

    private int score;

    private List<String> missingSkills;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

    private List<String> recommendedKeywords;

    private String summary;

    public AnalysisResponse(
            int score,
            List<String> missingSkills,
            List<String> strengths,
            List<String> weaknesses,
            List<String> suggestions,
            List<String> recommendedKeywords,
            String summary
    ) {
        this.score = score;
        this.missingSkills = missingSkills;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.suggestions = suggestions;
        this.recommendedKeywords = recommendedKeywords;
        this.summary = summary;
    }

    public int getScore() {
        return score;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public List<String> getRecommendedKeywords() {
        return recommendedKeywords;
    }

    public String getSummary() {
        return summary;
    }
}