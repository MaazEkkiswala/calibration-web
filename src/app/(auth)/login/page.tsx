"use client";
import SsFormInput from "@/components/form/ssFormInput";
import SsInputPasswordField from "@/components/form/ssFormPasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import useFormState from "@/hooks/useFormState";
import { useState } from "react";
import z from "zod";

const formSchema = z.object({
  emailAddress: z.email("Email address must be valid."),
  password: z.string().min(8, {
    message: "Password mus be contained at least 8 characters.",
  }),
});

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, formValues, resetForm, setServerErrors } = useFormState({
    schema: formSchema,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const payload: any = {
      ...values,
    };

    // const { data, errors }: any = await ApiService.post(ApiUrls.login, payload);
    // if (data) {
    //   dispatch(login(data));
    //   if (data.user?.preferenceId) {
    //     dispatch(setUserPreference(data.user.preferenceId));
    //   }

    //   router.push("/home");
    // }
    //   else if (errors) {
    //         setServerErrors(errors);
    //     }
    // }

    setIsSubmitting(false);
  };

  // always component from components/form -> it has number of components that can be enough
  // always use ssButton in that you can find loader, disable, icons(left or right), just you need to pass props

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen overflow-hidden">
      <Card className="md:w-[30%] w-[50%] shadow">
        <CardContent className="px-8 py-6 flex flex-col">
          <div className="flex flex-row justify-center items-center space-x-0">
            {/* <Image
              priority
              src={AppLogo}
              alt="SmartSeizingLogo"
              className="size-14"
            /> */}
            <Label className="text-base font-light font-robot">
              Calibration
            </Label>
          </div>

          <div className="flex flex-col justify-center items-center space-y-1 mt-4">
            <Label className="text-purple-500 text-xl font-robot">
              Hi, Welcome Back
            </Label>
            <Label className="text-sm font-robot text-gray-500 font-light">
              Enter your credentials to continue
            </Label>
          </div>

          <div className="mt-10 mb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <SsFormInput
                  name="emailAddress"
                  label="Email Address"
                  placeholder="Email Address"
                  control={form.control}
                />

                <SsInputPasswordField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  control={form.control}
                />

                <div className="flex py-4 flex-row-reverse justify-between items-center">
                  <Label className="text-sm text-purple-500 font-robot font-normal cursor-pointer">
                    Forgot password?
                  </Label>
                </div>

                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
