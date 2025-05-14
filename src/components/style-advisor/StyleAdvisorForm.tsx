"use client";
import { useState } from 'react';
import type { StyleAdvisorInput } from '@/ai/flows/style-advisor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';

interface StyleAdvisorFormProps {
  onSubmit: (data: StyleAdvisorInput) => Promise<void>;
  isLoading: boolean;
}

export function StyleAdvisorForm({ onSubmit, isLoading }: StyleAdvisorFormProps) {
  const [stylePreferences, setStylePreferences] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ stylePreferences, bodyMeasurements });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Wand2 className="mr-2 h-6 w-6 text-accent" />
          AI Style Advisor
        </CardTitle>
        <CardDescription>
          Describe your needs, and our AI will suggest the perfect combat dress for you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stylePreferences" className="text-base">Style Preferences</Label>
            <Textarea
              id="stylePreferences"
              value={stylePreferences}
              onChange={(e) => setStylePreferences(e.target.value)}
              placeholder="e.g., Lightweight, breathable materials. Prefer dark, muted colors like black or olive green. Need a modern, athletic fit with plenty of pockets for EDC items. Primarily for urban operations and range training."
              rows={5}
              required
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Include preferred colors, materials, fit, typical use cases, etc.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bodyMeasurements" className="text-base">Body Measurements & Fit Notes</Label>
            <Textarea
              id="bodyMeasurements"
              value={bodyMeasurements}
              onChange={(e) => setBodyMeasurements(e.target.value)}
              placeholder="e.g., Height: 5'11\" (180cm), Weight: 185 lbs (84kg). Chest: 42\" (107cm), Waist: 34\" (86cm), Hip: 40\" (102cm). Usually wear Large in jackets, Medium/34W in pants. Prefer a slightly looser fit for mobility."
              rows={4}
              required
              className="bg-background"
            />
             <p className="text-xs text-muted-foreground">
              Provide details like height, weight, chest, waist, hip size, and any fit preferences.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get Recommendations
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
