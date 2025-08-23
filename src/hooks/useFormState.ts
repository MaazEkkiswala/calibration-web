import { zodResolver } from '@hookform/resolvers/zod';
import { map } from 'lodash';
import { DefaultValues, useForm, useWatch } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface IServerError {
  param: string;
  msg: string;
}

interface IFormState<T extends ZodType<any, any>> {
  schema: T;
  defaultValues?: DefaultValues<z.infer<T>>;
}

export default function useFormState<T extends ZodType<any, any>>({
  schema,
  defaultValues,
}: IFormState<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  const formValues = useWatch({ control: form.control });

  const setServerErrors = (errors: IServerError[]) => {
    map(errors, (err) => {
      form.setError(err.param as any, {
        message: err.msg,
      });
    });
  };

  const resetForm = (values: DefaultValues<z.infer<T>>) => form.reset(values);

  return { form, formValues, setServerErrors, resetForm };
}