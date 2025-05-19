"use client";

// shadcn/ui
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";

import { useEffect } from "react";

function Facet({ facet, onChange }) {
  // handle facet default values
  const defaultValues = facet.results.reduce((acc, result) => {
    acc[result.label] = result.active;
    return acc;
  }, {});
  const form = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      const selectedValues = Object.keys(data).filter(
        (key) => data[key] === true
      );
      onChange(selectedValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  return (
    <Card key={facet.key} className="h-fit gap-0">
      <CardHeader className="mb-4">
        <CardTitle className="text-lg">{facet.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {facet.results.length === 0 ? (
          <p>no filter available</p>
        ) : (
          <Form {...form}>
            {facet.results.map((result) => (
              <FormField
                key={result.key}
                control={form.control}
                name={result.label}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormControl>
                      <Checkbox
                        id={result.key}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor={result.key}
                      className={`flex flex-row justify-between w-full
                    }`}
                    >
                      <span
                        className={`text-sm px-2 py-1 rounded-sm ${
                          field.value
                            ? "bg-blue-100 text-blue-800 "
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {result.label}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-sm ${
                          field.value
                            ? "bg-blue-100 text-blue-800 "
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {result.count}
                      </span>
                    </Label>
                  </FormItem>
                )}
              />
            ))}
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
export default Facet;
