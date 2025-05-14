"use client";
import { useState } from 'react';
import { StyleAdvisorForm } from '@/components/style-advisor/StyleAdvisorForm';
import { StyleRecommendation } from '@/components/style-advisor/StyleRecommendation';
import { getStyleRecommendation } from '@/ai/flows/style-advisor';
import type { StyleAdvisorInput, StyleAdvisorOutput } from '@/ai/flows/style-advisor';
import { useToast } from "@/hooks/use-toast";
// import type { Metadata } from 'next'; // Cannot export metadata from client component

// export const metadata: Metadata = { // Cannot export metadata from client component
//   title: 'AI Style Advisor',
//   description: 'Get personalized combat dress recommendations from our AI Style Advisor at Urban Armor Outfitters.',
// };


export default function StyleAdvisorPage() {
  const [recommendation, setRecommendation] = useState<StyleAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: StyleAdvisorInput) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getStyleRecommendation(data);
      setRecommendation(result);
      toast({
        title: "Recommendations Ready!",
        description: "Your personalized style advice has been generated.",
      });
    } catch (error) {
      console.error("Error getting style recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          AI-Powered Style Advisor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unsure what gear suits you best? Provide your style preferences and body measurements, 
          and our intelligent advisor will suggest the optimal combat dress configuration.
        </p>
      </header>
      
      <StyleAdvisorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading recommendations...
            </span>
          </div>
          <p className="mt-4 text-muted-foreground">Generating your personalized advice...</p>
        </div>
      )}

      {recommendation && <StyleRecommendation recommendation={recommendation} />}
    </div>
  );
}
