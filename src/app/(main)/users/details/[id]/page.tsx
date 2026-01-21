"use client";
import SsFormInput from "@/components/form/ssFormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import AppUtils from "@/helper/appUtils";
import ApiService, { ApiUrls } from "@/services/apiClient";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import useFormState from "@/hooks/useFormState";
import { SsSelector } from "@/components/ssSelector";
import enums from "@/lib/enums";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.string().email("Email address must be valid."),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters.",
  }),
  userType: z.enum([enums.userType.tenant, enums.userType.company], {
    message: "User Type cannot be empty.",
  }),
});

export default function UserDetails() {
  const router = useRouter();
  const { id: userId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});

  const userTypeEnum = [
    { id: 1, name: "tenant", tag: "Tenant" },
    { id: 2, name: "company", tag: "Company" },
  ];

  const { form, formValues, resetForm, setServerErrors } = useFormState({
    schema: formSchema,
  });

  const isEdit = userId !== "new";
  const isSubmitting = form.formState.isSubmitting;

  const getUserById = async () => {
    setIsLoading(true);

    // uncomment once API is ready
    // const { data } = await ApiService.get(
    //   AppUtils.formatString(ApiUrls.getUserById, userId)
    // );
    // if (data) {
    //   setUser(data.user);
    //   resetForm(data.user);
    // }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isEdit) {
      getUserById();
    } else {
      resetForm({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
      });
      setIsLoading(false);
    }
  }, [userId]);

  const onBack = () => router.back();

  const onSubmit = async (values: any) => {
    // try {
    //   if (isEdit) {
    //     await ApiService.put(
    //       AppUtils.formatString(ApiUrls.updateUser, userId),
    //       values
    //     );
    //   } else {
    //     await ApiService.post(ApiUrls.createUser, values);
    //   }
    //   router.push("/users");
    // } catch (err: any) {
    //   setServerErrors(err);
    // }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Card className="w-full max-w-5xl m-0 p-0">
        <CardContent className="flex flex-col p-0 m-0">
          <div className="flex flex-row px-4 py-4 border-b">
            <Label>{isEdit ? "Edit" : "Create"} User</Label>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 px-4 py-4 h-full overflow-auto"
            >
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-2">
                <SsFormInput
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  control={form.control}
                  required
                />
                <SsFormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  control={form.control}
                />
              </div>

              {/* Email + Password */}
              <div className="grid grid-cols-2 gap-2">
                <SsFormInput
                  name="emailAddress"
                  label="Email Address"
                  placeholder="Enter email address"
                  control={form.control}
                  required
                />
                <SsFormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  control={form.control}
                  required
                />
              </div>

              {/* User Type Dropdown */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1">
                  <SsSelector
                    label="User Type"
                    optionLabel="User Type"
                    placeholder="User Type"
                    options={AppUtils.convertObjectsToLabelValue(
                      userTypeEnum as any,
                      "name",
                      "tag"
                    )}
                    errorMessage={form.formState.errors?.userType?.message}
                    defaultValue={form.getValues("userType")}
                    onValueChange={(val: string) => {
                      form.setValue("userType", val);
                      form.setError("userType", { message: "" });
                    }}
                    selectorClass="flex w-full"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row justify-between items-center">
                <Button
                  onClick={onBack}
                  disabled={isSubmitting}
                  variant="outline"
                >
                  Back
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
