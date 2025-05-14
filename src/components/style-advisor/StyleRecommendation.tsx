"use client";
import type { StyleAdvisorOutput } from '@/ai/flows/style-advisor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, CheckSquare } from 'lucide-react';
import { Separator } from '../ui/separator';

interface StyleRecommendationProps {
  recommendation: StyleAdvisorOutput | null;
}

export function StyleRecommendation({ recommendation }: StyleRecommendationProps) {
  if (!recommendation) {
    return null;
  }

  // Simple parser for recommendation text. Assumes items start with "- " or "* "
  // and reasoning is after a line like "Reasoning:"
  const recommendationItems = recommendation.recommendations
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('- ') || line.startsWith('* '))
    .map(line => line.substring(2).trim());


  return (
    <Card className="mt-8 w-full max-w-2xl mx-auto shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Lightbulb className="mr-2 h-6 w-6 text-yellow-400" />
          Your AI Style Recommendations
        </CardTitle>
        <CardDescription>
          Based on your preferences, here are some tailored suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <CheckSquare className="mr-2 h-5 w-5 text-green-500" />
            Recommended Items:
          </h3>
          {recommendationItems.length > 0 ? (
            <ul className="list-none space-y-2 pl-0">
              {recommendationItems.map((item, index) => (
                <li key={index} className="p-3 bg-muted/50 rounded-md shadow-sm hover:bg-muted transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{recommendation.recommendations}</p> // Fallback if parsing fails
          )}
        </div>
        
        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Reasoning:</h3>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {recommendation.reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
