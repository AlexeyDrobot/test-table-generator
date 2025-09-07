import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa6';

import { useAppDispatch } from '../config/store';
import { addTable } from '../modules/tables/tables.reducer';
import type { CreateTableForm } from '../modules/tables/tables.types';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  setResetForm: (resetFn: () => void) => void;
};

const CreateTableFormComponent = ({ setIsOpen, setResetForm }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTableForm>();

  useEffect(() => {
    setResetForm(() => reset);
  }, [reset, setResetForm]);

  const onSubmit = useCallback(
    (data: CreateTableForm) => {
      dispatch(addTable(data));
      reset();
      setIsOpen(false);
    },
    [dispatch, reset, setIsOpen]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-4">
      <input
        {...register('column1', { required: 'This column is required' })}
        type="text"
        className="border border-gray-200 rounded-md p-2 h-10"
        placeholder="First Column"
        maxLength={15}
      />
      {errors.column1 && (
        <span className="text-red-500 text-xs">{errors.column1.message}</span>
      )}

      <input
        {...register('column2', { required: 'This column is required' })}
        type="text"
        className="border border-gray-200 rounded-md p-2 h-10"
        placeholder="Second Column"
        maxLength={15}
      />
      {errors.column2 && (
        <span className="text-red-500 text-xs">{errors.column2.message}</span>
      )}

      <input
        {...register('column3', { required: 'This column is required' })}
        type="text"
        className="border border-gray-200 rounded-md p-2 h-10"
        placeholder="Third Column"
        maxLength={15}
      />
      {errors.column3 && (
        <span className="text-red-500 text-xs">{errors.column3.message}</span>
      )}

      <div className="relative">
        <select
          {...register('column4')}
          className="border border-gray-200 rounded-md p-2 h-10 appearance-none w-full"
        >
          <option value={'Country'}>Country</option>
          <option value={'City'}>City</option>
          <option value={'Street'}>Street</option>
          <option value={'Home'}>Home</option>
        </select>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 size-3" />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer uppercase"
      >
        Add
      </button>
    </form>
  );
};

export default CreateTableFormComponent;
