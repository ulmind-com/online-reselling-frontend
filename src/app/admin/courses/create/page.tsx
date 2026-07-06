"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/api/axios";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_published: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCourse() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_published: false,
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await api.post("/courses/", data);
      toast.success("Course created successfully!");
      router.push(`/admin/courses/${res.data._id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to create course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Digital Product</h1>
          <p className="text-muted-foreground mt-1">Set up the foundation for your new course or digital download.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Title</label>
            <input
              {...register("title")}
              className="w-full p-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="e.g. Masterclass: Advanced Analytics"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Describe what your students will learn..."
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium block mb-2">Product Thumbnail</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                <UploadCloud size={24} />
              </div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Thumbnail uploading will be available after creating the draft.</p>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <input
              type="checkbox"
              id="is_published"
              {...register("is_published")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="is_published" className="text-sm font-medium">
              Publish immediately (make visible to users)
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Create Draft & Continue
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
