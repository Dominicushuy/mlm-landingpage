import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal component based on Headless UI Dialog
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Modal Title</ModalTitle>
 *       <ModalDescription>Modal Description</ModalDescription>
 *     </ModalHeader>
 *     <ModalBody>
 *       Modal content goes here...
 *     </ModalBody>
 *     <ModalFooter>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 */

const Modal = ({
  children,
  open,
  onClose,
  initialFocus,
  size = "default",
  className,
  overlayClassName,
  ...props
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    default: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full",
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={initialFocus}
        {...props}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={cn(
              "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
              overlayClassName
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "relative transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6",
                  sizeClasses[size],
                  className
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ModalContent = ({ className, ...props }) => {
  return <div className={cn("", className)} {...props} />;
};

const ModalHeader = ({ className, ...props }) => {
  return <div className={cn("mb-4", className)} {...props} />;
};

const ModalTitle = ({ className, ...props }) => {
  return (
    <Dialog.Title
      as="h3"
      className={cn(
        "text-lg font-medium leading-6 text-gray-900 dark:text-white",
        className
      )}
      {...props}
    />
  );
};

const ModalDescription = ({ className, ...props }) => {
  return (
    <Dialog.Description
      className={cn("mt-2 text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
};

const ModalBody = ({ className, ...props }) => {
  return <div className={cn("py-4", className)} {...props} />;
};

const ModalFooter = ({ className, ...props }) => {
  return (
    <div
      className={cn("mt-4 flex flex-row-reverse gap-3 pt-2", className)}
      {...props}
    />
  );
};

const ModalCloseButton = ({ className, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="sr-only">Close</span>
      <X className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
};
