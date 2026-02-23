import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Quote,
  Code,
  Minus,
  ImagePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}

const MenuButton = ({
  onClick,
  isActive,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={cn(
      "h-8 w-8 rounded-sm",
      isActive && "bg-muted text-foreground"
    )}
    onClick={onClick}
    title={title}
  >
    {children}
  </Button>
);

export const RichTextEditor = ({
  content,
  onChange,
  placeholder,
  dir = "rtl",
}: RichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      editor.chain().focus().setImage({ src: url }).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[200px] p-3 focus:outline-none text-right",
        dir,
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  if (!editor) return null;

  return (
    <div className="rounded-md border border-input bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 p-1">
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          title="تراجع"
        >
          <Undo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          title="إعادة"
        >
          <Redo className="h-4 w-4" />
        </MenuButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="عنوان 1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="عنوان 2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="عنوان 3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="غامق"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="مائل"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="تسطير"
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="يتوسطه خط"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="محاذاة يمين"
        >
          <AlignRight className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="توسيط"
        >
          <AlignCenter className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="محاذاة يسار"
        >
          <AlignLeft className="h-4 w-4" />
        </MenuButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="قائمة نقطية"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="قائمة مرقمة"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="اقتباس"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="كود"
        >
          <Code className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="خط فاصل"
        >
          <Minus className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => fileInputRef.current?.click()}
          title="إدراج صورة"
        >
          <ImagePlus className="h-4 w-4" />
        </MenuButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};
