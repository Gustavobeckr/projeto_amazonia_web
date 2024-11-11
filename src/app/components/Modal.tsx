type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  if (isOpen)
    return (
      <div className="flex justify-center items-center h-full w-full bg-zinc-400 bg-opacity-85 fixed z-50 top-0 left-0 right-0 bottom-0">
        <div className="flex relative flex-col bg-white w-2/3 h-5/6 p-3 rounded-md">
          {children}
        </div>
      </div>
    );
}
