import { useMedia } from "react-use";

import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const ResponsiveModal = ({
  open,
  onOpenChange,
  children,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="overflow-y-auto p-0 w-full border-none sm:max-w-lg hide-scrollbar max-h-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
