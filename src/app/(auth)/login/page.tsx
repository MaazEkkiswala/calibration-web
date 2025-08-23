import useFormState from '@/hooks/useFormState';
import z from 'zod';

const formSchema = z.object({
  emailAddress: z.email('Email address must be valid.'),
  password: z.string()
    .min(8, {
      message: 'Password mus be contained at least 8 characters.',
    }),
})

export default function Login() {
  const { form, formValues, resetForm, setServerErrors } = useFormState({
    schema: formSchema
  });

  // always component from components/form -> it has number of components that can be enough
  // always use ssButton in that you can find loader, disable, icons(left or right), just you need to pass props

  return (
    <>UI</>
  )
}
