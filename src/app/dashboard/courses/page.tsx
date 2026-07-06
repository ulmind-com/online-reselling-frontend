"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { motion } from "framer-motion";
import { PlayCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CoursesCatalog() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("/courses/");
      return res.data;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Make Money Online for Editors</h1>
        <p className="text-muted-foreground mt-1">Access your exclusive training materials below.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-4 animate-pulse h-80">
              <div className="w-full h-40 bg-secondary/50 rounded-xl mb-4" />
              <div className="h-6 bg-secondary/50 rounded w-3/4 mb-2" />
              <div className="h-4 bg-secondary/50 rounded w-full mb-6" />
              <div className="h-10 bg-secondary/50 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : courses?.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center justify-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">No courses available</h3>
          <p className="text-muted-foreground">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course: any, i: number) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-video bg-secondary overflow-hidden">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-primary opacity-50" />
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs font-medium text-white flex items-center gap-1">
                  <Clock size={12} />
                  {course.modules?.length || 0} Modules
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
                  {course.description}
                </p>
                
                <Link href={`/dashboard/courses/${course._id}`} className="w-full">
                  <Button className="w-full h-11 rounded-xl">
                    Start Course
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
