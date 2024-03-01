"use client"
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { Task, TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { DrawerDialogDemo } from "@/app/admin/courses/page";
import InputLabel from "../self/InputLabel";
import { useForm } from "react-hook-form";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {


  const { register, handleSubmit, formState: { errors } } = useForm<{ title: string }>();

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "w-[55vw] bg-white flex flex-col flex-shrink-0 snap-center border-2 border-lightGray",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  function createSubModule(data: { title: string }) {
    alert(data.title);
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 flex flex-row items-center  ">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button>
        <span className=""> {column.title}</span>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col gap-2 p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>

      <CardFooter className="pb-2 flex justify-center">
        <DrawerDialogDemo
          trigger={<Button>Inhalt hinzufügen</Button>}
          title="Inhalt hinzufügen"
          subTitle="Den Titel können Sie im nachinein jederzeit ändern"
        >
          <form
            className="grid items-start gap-4"
            onSubmit={handleSubmit(createSubModule)}>
            <InputLabel
              label="Titel"
              register={register}
              id="title"
              type="text"
              errors={errors} />
            <Button type="submit">Jetzt erstellen</Button>
          </form>
        </DrawerDialogDemo>

      </CardFooter>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10  flex-col">
      {children}
    </div>
  );
}