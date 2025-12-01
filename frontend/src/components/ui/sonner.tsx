import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0a0a0a] group-[.toaster]:text-white group-[.toaster]:border-white/20 group-[.toaster]:shadow-2xl group-[.toaster]:p-6 group-[.toaster]:gap-4 group-[.toaster]:rounded-2xl",
          description: "group-[.toast]:text-white/60 group-[.toast]:text-base",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          title: "group-[.toast]:text-lg group-[.toast]:font-bold",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
