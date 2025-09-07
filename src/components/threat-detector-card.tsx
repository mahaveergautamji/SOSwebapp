"use client";

import { useState, useRef, useEffect } from 'react';
import { Mic, AlertTriangle, ShieldCheck, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { analyzeSurroundingSoundsForThreats, type AnalyzeSurroundingSoundsForThreatsOutput } from '@/ai/flows/analyze-surrounding-sounds-for-threats';
import { Progress } from "@/components/ui/progress";

type Status = 'idle' | 'recording' | 'analyzing' | 'result' | 'error';

export function ThreatDetectorCard() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<AnalyzeSurroundingSoundsForThreatsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
    };
  }, []);

  const stopRecordingAndReset = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop(); // This will trigger the onstop event
    }
    // Clean up stream tracks
    mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
     if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    reset();
  };

  const startRecording = async () => {
    if (status === 'recording') return;
    reset();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // if the stop was manually triggered, we might not want to analyze.
        if (status !== 'recording') return; 

        if (audioChunksRef.current.length === 0) {
           setError("Could not record audio. Please check microphone permissions.");
           setStatus('error');
           return;
        }

        setStatus('analyzing');
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current.mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          if (base64Audio) {
            try {
              const analysisResult = await analyzeSurroundingSoundsForThreats({ audioDataUri: base64Audio });
              setResult(analysisResult);
              setStatus('result');
            } catch (e) {
              console.error(e);
              setError("Failed to analyze audio. The AI model might be unavailable.");
              setStatus('error');
            }
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setStatus('recording');
      setProgress(0);
      
      const recordingDuration = 5000;
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if(intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return p + 1;
        });
      }, recordingDuration / 100);

      recordingTimeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
      }, recordingDuration);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        variant: "destructive",
        title: "Microphone Access Denied",
        description: "Please allow microphone access in your browser settings to use this feature.",
      });
      setStatus('idle');
    }
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setError(null);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
    }
  };
  
  const renderContent = () => {
    switch (status) {
      case 'recording':
        return (
          <div className="text-center space-y-4 w-full">
            <p className="text-muted-foreground animate-pulse">Recording for 5 seconds...</p>
            <div className="flex items-center gap-4">
              <Mic className="h-6 w-6 text-destructive animate-pulse" />
              <Progress value={progress} className="w-full" />
            </div>
            <Button onClick={stopRecordingAndReset} variant="outline" size="sm">
              <X className="mr-2 h-4 w-4" />
              Stop Scan
            </Button>
          </div>
        );
      case 'analyzing':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground">Analyzing sounds...</p>
          </div>
        );
      case 'result':
      case 'error':
        const isThreat = status === 'result' && result?.isThreat;
        return (
          <div className="text-center space-y-4">
             <div className={`flex items-center justify-center gap-2 font-bold text-lg ${isThreat ? 'text-destructive' : 'text-green-500'}`}>
              {isThreat ? <AlertTriangle /> : <ShieldCheck />}
              <span>{isThreat ? "Potential Threat Detected" : "All Clear"}</span>
            </div>
            <p className="text-muted-foreground text-sm px-4">
              {error || result?.threatDescription}
            </p>
            <Button onClick={reset} variant="outline">Scan Again</Button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground px-4">The AI will listen to your surroundings for 5 seconds to detect any potential threats.</p>
            <Button onClick={startRecording} size="lg">
              <Mic className="mr-2 h-5 w-5" />
              Start Scan
            </Button>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Threat Detection</CardTitle>
        <CardDescription>Analyze surrounding sounds for keywords or unusual noises.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[150px] flex items-center justify-center">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
