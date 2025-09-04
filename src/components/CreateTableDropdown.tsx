import { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import CreateTableFormComponent from './CreateTableForm';

const CreateTableDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetForm, setResetForm] = useState<(() => void) | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        resetForm?.();
      }
    },
    [resetForm]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleClose = () => {
    setIsOpen(false);
    resetForm?.();
  };

  return (
    <div className="relative">
      <button
        type="button"
        ref={buttonRef}
        className="flex items-center gap-2 bg-blue-500 text-white rounded-md py-2 px-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Create table
        <FaPlus />
      </button>
      <dialog
        open={isOpen}
        ref={dialogRef}
        className="absolute left-0 w-64 top-full mt-1 bg-white rounded-md shadow-md border border-gray-200"
      >
        <CreateTableFormComponent
          setIsOpen={handleClose}
          setResetForm={setResetForm}
        />
      </dialog>
    </div>
  );
};

export default CreateTableDropdown;
