"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, Plus, Edit2, Trash2, GripVertical, FileVideo, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const courseId = params.id as string;

  const [isAddingModule, setIsAddingModule] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const { data: course, isLoading } = useQuery({
    queryKey: ["admin_course", courseId],
    queryFn: async () => {
      const res = await api.get(`/courses/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });

  const addModuleMutation = useMutation({
    mutationFn: async (data: { title: string; order: number }) => {
      const res = await api.post(`/courses/${courseId}/modules`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_course", courseId] });
      setIsAddingModule(false);
      toast.success("Module added successfully");
    },
  });

  const addLessonMutation = useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: string; data: any }) => {
      const res = await api.post(`/courses/${courseId}/modules/${moduleId}/lessons`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_course", courseId] });
      setActiveModuleId(null);
      toast.success("Lesson added successfully");
    },
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{course?.title}</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              course?.is_published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {course?.is_published ? "Published" : "Draft"}
            </span>
            <span>Last updated {new Date(course?.updated_at || "").toLocaleDateString()}</span>
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit2 size={16} /> Edit Details
        </Button>
      </div>

      {/* Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Curriculum</h2>
          <Button onClick={() => setIsAddingModule(true)} className="bg-primary text-primary-foreground gap-2">
            <Plus size={16} /> Add Module
          </Button>
        </div>

        {isAddingModule && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 rounded-xl border-l-4 border-l-primary">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addModuleMutation.mutate({
                title: formData.get("title") as string,
                order: course?.modules?.length || 0
              });
            }} className="flex items-end gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Module Title</label>
                <input required name="title" className="w-full p-2 rounded-lg bg-background border focus:ring-2 focus:ring-primary/50" placeholder="e.g. Getting Started" autoFocus />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsAddingModule(false)}>Cancel</Button>
                <Button type="submit" disabled={addModuleMutation.isPending}>
                  {addModuleMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-6">
          {course?.modules?.map((module: any, mIdx: number) => (
            <div key={module.id || mIdx} className="glass-card rounded-2xl overflow-hidden border border-border">
              {/* Module Header */}
              <div className="bg-secondary/50 p-4 border-b border-border flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="cursor-grab text-muted-foreground hover:text-foreground">
                    <GripVertical size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Module {mIdx + 1}: {module.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-muted-foreground hover:text-primary"><Edit2 size={16}/></button>
                  <button className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16}/></button>
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-4 space-y-3">
                {module.lessons?.map((lesson: any, lIdx: number) => (
                  <div key={lesson.id || lIdx} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab text-muted-foreground hover:text-foreground">
                        <GripVertical size={16} />
                      </div>
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        {lesson.video_url ? <FileVideo size={16} /> : <FileText size={16} />}
                      </div>
                      <span className="font-medium text-sm">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      {lesson.duration_minutes && <span>{lesson.duration_minutes} min</span>}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"><Edit2 size={14}/></button>
                    </div>
                  </div>
                ))}

                {/* Add Lesson Form or Button */}
                {activeModuleId === (module.id || String(mIdx)) ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    addLessonMutation.mutate({
                      moduleId: module.id,
                      data: {
                        title: formData.get("title"),
                        order: module.lessons?.length || 0,
                        video_url: formData.get("video_url") || null,
                      }
                    });
                  }} className="p-4 rounded-xl border border-dashed border-primary/50 bg-primary/5 space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Lesson Title</label>
                      <input required name="title" className="w-full p-2 rounded-lg bg-background border focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Lesson title" autoFocus />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Video URL (Optional)</label>
                      <input name="video_url" className="w-full p-2 rounded-lg bg-background border focus:ring-2 focus:ring-primary/50 text-sm" placeholder="https://..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setActiveModuleId(null)}>Cancel</Button>
                      <Button type="submit" size="sm" disabled={addLessonMutation.isPending}>
                        {addLessonMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Lesson"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setActiveModuleId(module.id || String(mIdx))}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 w-full justify-center border border-dashed border-border rounded-xl hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Plus size={16} /> Add Lesson / File
                  </button>
                )}
              </div>
            </div>
          ))}

          {course?.modules?.length === 0 && !isAddingModule && (
            <div className="text-center py-12 glass-card rounded-2xl border-dashed border-2">
              <h3 className="font-semibold mb-2">No modules yet</h3>
              <p className="text-muted-foreground text-sm mb-4">Start building your curriculum by adding the first module.</p>
              <Button onClick={() => setIsAddingModule(true)} className="bg-primary text-primary-foreground">
                <Plus size={16} className="mr-2" /> Add Module
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
