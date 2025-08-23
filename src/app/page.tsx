'use client'

import { AutoComplete } from "@/components/ssAutocomplete";
import SsButton from "@/components/ssButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from 'zod';

export default function Home() {
  const [value, setValue] = useState<any>({})

  const FRAMEWORKS = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
    {
      value: "wordpress",
      label: "WordPress",
    },
    {
      value: "express.js",
      label: "Express.js",
    },
    {
      value: "nest.js",
      label: "Nest.js",
    },
  ];

  const FormSchema = z.object({
    password: z.string({ error: 'Error Of the year' }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {

  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <AutoComplete
        options={FRAMEWORKS}
        emptyMessage="No results."
        placeholder="Find something"
        onValueChange={setValue}
        value={value} />

      <SsButton
        label="Sonner"
        onClick={() => toast("Event has been created.")}
      />
    </div>
  );
}
