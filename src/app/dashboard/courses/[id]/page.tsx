"use client";

import { useState, use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2, FileText, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourseViewer({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const courseId = unwrappedParams.id;
  
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  
  const queryClient = useQueryClient();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await api.get(`/courses/${courseId}`);
      return res.data;
    }
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", courseId],
    queryFn: async () => {
      const res = await api.get(`/courses/${courseId}/progress`);
      return res.data.completed_lessons || [];
    }
  });

  const markCompletedMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      const res = await api.post(`/courses/${courseId}/progress`, { lesson_id: lessonId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", courseId] });
    }
  });

  if (courseLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  const activeModule = course.modules?.[activeModuleIndex];
  const activeLesson = activeModule?.lessons?.[activeLessonIndex];
  const isCompleted = progress?.includes(activeLesson?.id);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <div>
          <Link href="/dashboard/courses" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
            &larr; Back to Courses
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        </div>

        {activeLesson ? (
          <motion.div
            key={activeLesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Video Player Placeholder */}
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative border border-border shadow-xl">
              {activeLesson.video_url ? (
                <iframe 
                  src={activeLesson.video_url} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/20">
                  <PlayCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground font-medium">Video content will appear here</p>
                </div>
              )}
            </div>

            <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
                {activeLesson.description && (
                  <p className="text-muted-foreground mt-2">{activeLesson.description}</p>
                )}
              </div>
              <Button 
                onClick={() => markCompletedMutation.mutate(activeLesson.id)}
                disabled={isCompleted || markCompletedMutation.isPending}
                className={`rounded-xl shrink-0 ${isCompleted ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
              >
                {isCompleted ? (
                  <><Check className="mr-2 h-4 w-4" /> Completed</>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            </div>

            {activeLesson.pdf_url && (
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primary">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Resource Download</h4>
                    <p className="text-sm text-muted-foreground">Download the supplementary PDF guide for this lesson.</p>
                  </div>
                  <a href={activeLesson.pdf_url} target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <Button variant="outline" className="rounded-xl">Download PDF</Button>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="glass-card p-12 text-center rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Select a lesson</h3>
            <p className="text-muted-foreground">Choose a lesson from the syllabus to begin learning.</p>
          </div>
        )}
      </div>

      {/* Sidebar Syllabus */}
      <div className="w-full lg:w-96 space-y-4">
        <div className="glass-card p-6 rounded-2xl sticky top-24">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            Course Syllabus
          </h3>
          
          <div className="space-y-6">
            {course.modules?.map((module: any, mIndex: number) => (
              <div key={module.id} className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="bg-secondary/80 w-6 h-6 rounded flex items-center justify-center text-xs text-foreground">
                    {mIndex + 1}
                  </span>
                  {module.title}
                </h4>
                <div className="space-y-1">
                  {module.lessons?.map((lesson: any, lIndex: number) => {
                    const isActive = mIndex === activeModuleIndex && lIndex === activeLessonIndex;
                    const isLessonCompleted = progress?.includes(lesson.id);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveModuleIndex(mIndex);
                          setActiveLessonIndex(lIndex);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                            : 'hover:bg-secondary/50 border border-transparent'
                        }`}
                      >
                        <div className={`shrink-0 ${isLessonCompleted ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {isLessonCompleted ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                        </div>
                        <span className={`font-medium text-sm truncate flex-1 ${isActive ? 'text-primary' : ''}`}>
                          {lesson.title}
                        </span>
                        {isActive && <ChevronRight size={16} className="shrink-0 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {(!course.modules || course.modules.length === 0) && (
              <p className="text-sm text-muted-foreground">No content available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
