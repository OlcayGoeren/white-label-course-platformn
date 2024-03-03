"use client"
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { ColumnId } from "./KanbanBoard";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { courseTableStatuses } from "@/types/courses";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
  order: number;
  organization: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {

  const params = useParams<{ id: string }>();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}

      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardContent className="p-1 px-2 font-semibold border-b-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-1 text-secondary-foreground/50  cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical />
          </Button>
          <Link className="hover:underline" href={"/admin/courses/" + params.id + "/" + task.id}>{task.content}</Link>

        </div>
        <div className="">
          <Select value={task.status}>
            <SelectTrigger className="w-[120px]" >
              <SelectValue placeholder={task.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseTableStatuses.map((status) => <SelectItem value={status}>{status}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>
      </CardContent>
    </Card>
  );
}
